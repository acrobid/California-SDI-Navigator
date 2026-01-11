import type { CalculatorInputs, CalculatorOutputs } from "~/types";
import { CA_SDI_RATES, LTD_LIMITS } from "./constants";

/**
 * Calculate CA SDI weekly benefit
 * Formula: (Highest Quarter / 13) × 0.70, capped at max weekly benefit
 */
export function calculateSDIWeeklyBenefit(
  highestQuarterlyIncome: number,
  year: number = new Date().getFullYear(),
): number {
  const rate = CA_SDI_RATES[year] ?? CA_SDI_RATES[2026];
  const weeklyBenefit = (highestQuarterlyIncome / 13) * 0.7;
  return Math.min(weeklyBenefit, rate?.maxWeeklyBenefit ?? 1620);
}

/**
 * Calculate FedEx LTD monthly benefit before offset
 * Based on highest 12 consecutive months in prior 36, capped at IRS 401(a)(17) limit
 */
export function calculateLTDMonthlyBenefit(
  averageMonthlyIncome: number,
  ltdPercentage: 50 | 60,
): number {
  const annualIncome = averageMonthlyIncome * 12;
  const cappedAnnual = Math.min(annualIncome, LTD_LIMITS.irs401a17);
  return (cappedAnnual / 12) * (ltdPercentage / 100);
}

/**
 * Calculate annual SDI tax paid
 */
export function calculateAnnualSDITax(
  annualIncome: number,
  year: number = new Date().getFullYear(),
): number {
  const rate = CA_SDI_RATES[year] ?? CA_SDI_RATES[2026];
  const taxRate = rate?.rate ?? 0.013;

  if (rate?.capped && rate?.maxTaxableWage) {
    return Math.min(annualIncome, rate.maxTaxableWage) * taxRate;
  }

  return annualIncome * taxRate;
}

/**
 * Calculate SDI monthly benefit from weekly
 */
export function weeklyToMonthly(weeklyAmount: number): number {
  return weeklyAmount * 4.33; // Average weeks per month
}

/**
 * Full benefit calculation
 */
export function calculateBenefits(inputs: CalculatorInputs): CalculatorOutputs {
  const currentYear = new Date().getFullYear();
  const _rate = CA_SDI_RATES[currentYear] ?? CA_SDI_RATES[2026];

  // CA SDI Calculation
  const caSDIWeeklyBenefit = calculateSDIWeeklyBenefit(
    inputs.highestQuarterlyIncome,
    currentYear,
  );
  const caSDIMaxWeeks = 52;
  const caSDIMonthlyBenefit = weeklyToMonthly(caSDIWeeklyBenefit);

  // FedEx LTD Calculation
  const ltdMonthlyBeforeOffset = calculateLTDMonthlyBenefit(
    inputs.averageMonthlyIncome,
    inputs.ltdPercentage,
  );

  // Offset calculation - only applies when sick bank is exhausted
  const expectedMonthlyOffset = inputs.hasExhaustedSickBank
    ? caSDIMonthlyBenefit
    : 0;

  // Net calculations
  // During SDI: You get LTD minus offset, plus actual SDI payment
  // If SDI is delayed, you only get LTD minus offset (the problem!)
  const netMonthlyDuringSDI =
    ltdMonthlyBeforeOffset - expectedMonthlyOffset + caSDIMonthlyBenefit;

  // After SDI exhausted: Just LTD (no offset since SDI has ended)
  const netMonthlyAfterSDI = ltdMonthlyBeforeOffset;

  // Annual SDI tax paid
  const annualSDITaxPaid = calculateAnnualSDITax(
    inputs.annualBaseSalary,
    currentYear,
  );

  // Comparison to non-CA base pilot
  // Non-CA pilots: Full LTD, no SDI tax
  // CA pilots: LTD minus offset (offset equals SDI), plus SDI
  // Net difference is the SDI tax paid with no additional benefit
  const monthlyDifference = inputs.hasExhaustedSickBank
    ? -(annualSDITaxPaid / 12) // CA pilot pays tax but gets same net benefit
    : 0;

  return {
    caSDIWeeklyBenefit: Math.round(caSDIWeeklyBenefit * 100) / 100,
    caSDIMaxWeeks,
    caSDITotalBenefit:
      caSDIWeeklyBenefit *
      Math.min(inputs.expectedDisabilityWeeks, caSDIMaxWeeks),
    ltdMonthlyBeforeOffset: Math.round(ltdMonthlyBeforeOffset * 100) / 100,
    ltdAnnualCap: LTD_LIMITS.irs401a17,
    expectedMonthlyOffset: Math.round(expectedMonthlyOffset * 100) / 100,
    netMonthlyDuringSDI: Math.round(netMonthlyDuringSDI * 100) / 100,
    netMonthlyAfterSDI: Math.round(netMonthlyAfterSDI * 100) / 100,
    annualSDITaxPaid: Math.round(annualSDITaxPaid * 100) / 100,
    comparisonToNonCABase: {
      monthlyDifference: Math.round(monthlyDifference * 100) / 100,
      sdiBureaucracyCost: "High" as const,
    },
  };
}

/**
 * Determine base period based on claim date
 */
export function getBasePeriod(claimDate: Date): { start: Date; end: Date } {
  const month = claimDate.getMonth() + 1; // 1-12
  const year = claimDate.getFullYear();

  let startYear: number, startMonth: number, endYear: number, endMonth: number;

  if (month >= 1 && month <= 3) {
    // Jan-Mar: Oct 2 years prior to Sep 1 year prior
    startYear = year - 2;
    startMonth = 10;
    endYear = year - 1;
    endMonth = 9;
  } else if (month >= 4 && month <= 6) {
    // Apr-Jun: Jan to Dec 1 year prior
    startYear = year - 1;
    startMonth = 1;
    endYear = year - 1;
    endMonth = 12;
  } else if (month >= 7 && month <= 9) {
    // Jul-Sep: Apr 1 year prior to Mar current
    startYear = year - 1;
    startMonth = 4;
    endYear = year;
    endMonth = 3;
  } else {
    // Oct-Dec: Jul 1 year prior to Jun current
    startYear = year - 1;
    startMonth = 7;
    endYear = year;
    endMonth = 6;
  }

  return {
    start: new Date(startYear, startMonth - 1, 1),
    end: new Date(endYear, endMonth, 0), // Last day of end month
  };
}
