import type { SDIRateYear, LTDLimits } from "~/types";

// ============================================
// CA SDI RATES AND BENEFIT CALCULATION
// ============================================

// CA SDI Tax Rates by Year
export const CA_SDI_RATES: Record<number, SDIRateYear> = {
  2023: {
    rate: 0.009,
    maxTaxableWage: 165000,
    maxWeeklyBenefit: 1620,
    capped: true,
  },
  2024: {
    rate: 0.011,
    maxTaxableWage: null,
    maxWeeklyBenefit: 1620,
    capped: false,
  },
  2025: {
    rate: 0.012,
    maxTaxableWage: null,
    maxWeeklyBenefit: 1681,
    capped: false,
  },
  2026: {
    rate: 0.013,
    maxTaxableWage: null,
    maxWeeklyBenefit: 1681,
    capped: false,
  },
};

export const SDI_BENEFIT_CALCULATION = {
  wageReplacementRate: 0.7,
  waitingPeriodDays: 7,
  maxDurationWeeks: 52,
  weeksPerQuarter: 13,
};

// Base Period Calculation Quarters
export const BASE_PERIOD_QUARTERS = {
  "jan-mar": { start: -24, end: -12 }, // Oct 2 years prior to Sep 1 year prior
  "apr-jun": { start: -21, end: -9 }, // Jan to Dec 1 year prior
  "jul-sep": { start: -18, end: -6 }, // Apr 1 year prior to Mar current
  "oct-dec": { start: -15, end: -3 }, // Jul 1 year prior to Jun current
} as const;

// ============================================
// LTD BENEFIT CALCULATION (CBA 27.J)
// ============================================

// LTD Plan Limits (Legacy - kept for compatibility)
export const LTD_LIMITS: LTDLimits = {
  irs401a17: 350000, // 2026 IRS limit
  maxPercentageYear1_2: 60,
  maxPercentageYear3Plus: 50,
};

// CBA-Based LTD Calculation Constants (Section 27.J.2, 27.J.6, 27.J.7)
export const LTD_CALCULATION = {
  // Benefit percentages (CBA 27.J.2)
  percentageMonths1_24: 0.6, // 60% for first 24 months
  percentageMonths25Plus: 0.5, // 50% after 24 months

  // Monthly earnings definition (CBA 27.J.6)
  // "12 highest consecutive months out of 36 consecutive months preceding disability"
  monthlyEarningsLookbackMonths: 36,
  monthlyEarningsWindowMonths: 12,

  // IRS 401(a)(17) limits (CBA 27.J.7)
  irs401a17Limits: {
    2024: 345000,
    2025: 350000,
    2026: 350000, // Verify with IRS updates
  } as Record<number, number>,
};

// Helper function for max monthly benefit
export function getMaxMonthlyLTDBenefit(
  year: number,
  monthsOnLTD: number,
): number {
  const limit =
    LTD_CALCULATION.irs401a17Limits[year] ||
    LTD_CALCULATION.irs401a17Limits[2026];
  const monthlyLimit = limit / 12;
  const percentage =
    monthsOnLTD <= 24
      ? LTD_CALCULATION.percentageMonths1_24
      : LTD_CALCULATION.percentageMonths25Plus;
  return monthlyLimit * percentage;
}

// Helper function for monthly earnings calculation
export function calculateMonthlyEarnings(monthlyPayHistory: number[]): number {
  // monthlyPayHistory should be last 36 months, most recent first
  if (monthlyPayHistory.length < 12) {
    throw new Error("Need at least 12 months of pay history");
  }

  const months = monthlyPayHistory.slice(0, 36); // Use up to 36 months
  let maxConsecutive12Sum = 0;

  // Find the highest 12 consecutive months
  for (let i = 0; i <= months.length - 12; i++) {
    const sum = months.slice(i, i + 12).reduce((a, b) => a + b, 0);
    if (sum > maxConsecutive12Sum) {
      maxConsecutive12Sum = sum;
    }
  }

  return maxConsecutive12Sum / 12; // Monthly average of best 12 consecutive
}

// ============================================
// SSDI OFFSET (CBA 27.J.15)
// ============================================

export const SSDI_OFFSET = {
  // 70% offset for disabilities after Oct 30, 2006
  currentOffsetPercentage: 0.7,
  // 100% offset for disabilities before Oct 30, 2006
  legacyOffsetPercentage: 1.0,
  legacyCutoffDate: new Date("2006-10-30"),
  // Family benefits excluded from offset
  includesFamilyBenefits: false,
};

// ============================================
// OUTSIDE INCOME OFFSET (CBA 27.J.13)
// ============================================

export const OUTSIDE_INCOME_OFFSET = {
  // Only offset when total > pre-disability total
  // Pre-disability income includes FedEx + outside income
  lookbackMonths: 12,
  // Offset is 50% of excess
  excessOffsetPercentage: 0.5,
};

// ============================================
// LTD DURATION LIMITS (CBA 27.J.2, 27.J.10, 27.J.11)
// ============================================

export const LTD_DURATION_LIMITS = {
  general: {
    maxMonths: null as number | null,
    maxAge: 65,
    description: "Until recovery or age 65, whichever comes first",
  },
  mentalHealth: {
    maxMonths: 60,
    maxAge: 65,
    description: "Maximum 60 months (5 years)",
  },
  substanceAbuse: {
    maxMonths: 18,
    baseMonths: 12,
    recertificationBonusMonths: 6,
    maxAge: 65,
    description:
      "Maximum 18 months (12 + 6 if seeking medical recertification)",
    effectiveDate: new Date("2015-11-02"),
  },
  substanceAbuseLegacy: {
    maxWeeks: 26,
    description: "26 weeks for disabilities before November 2, 2015",
    beforeDate: new Date("2015-11-02"),
  },
};

// ============================================
// LTD ELIGIBILITY TRIGGERS (CBA 27.J.1)
// ============================================

export const LTD_ELIGIBILITY_TRIGGERS = [
  "Exhaustion of regular sick account AND disability sick account (DSA)",
  "Disability-related seat change (e.g., Captain to F/O due to medical)",
  "Move to non-pilot position due to disability",
];

// ============================================
// COOPERATION REQUIREMENTS (CBA 27.J.4)
// ============================================

export const LTD_COOPERATION_REQUIREMENTS = [
  "Fully cooperate with Claims Paying Administrator",
  "Coordinate with Aeromedical Advisor",
  "Diligently seek restoration of FAA medical certificate",
  "Respond to information requests promptly",
  "Attend required medical examinations",
];

// ============================================
// COMPANY ACCESS (CBA 27.J.19)
// ============================================

export const DISABLED_PILOT_SYSTEM_ACCESS = [
  "pilot.fedex.com",
  "PRISM",
  "Company email (@fedex.com)",
];

// ============================================
// CLAIMS ADMINISTRATOR
// ============================================

export const CLAIMS_ADMINISTRATOR = {
  // CBA references Aetna - verify this is current
  name: "Aetna Life Insurance Company",
  note: "CBA Section 27.J references Aetna. Verify current administrator with FedEx Benefits or ALPA.",
  legacyName: "The Hartford", // Some documentation may reference Hartford
};

// ============================================
// IMPORTANT DATES AND DEADLINES
// ============================================

// Important Dates
export const KEY_DATES = {
  sb951Passed: "2022-09-01",
  sdiUncapped: "2024-01-01",
  currentYear: new Date().getFullYear(),
};

// LTD Appeal Deadline
export const LTD_APPEAL_DAYS = 180; // 6 months (CBA reference)

// EDD Filing Deadline
export const EDD_FILING_DEADLINE_DAYS = 49;

export const KEY_DEADLINES = {
  sdiFilingDays: 49,
  physicianCertificationDays: 49,
  ltdAppealMonths: 6,
  ltdAppealDays: 180,
  continuedClaimIntervalDays: 14,
  eddInfoResponseDays: 10,
};
