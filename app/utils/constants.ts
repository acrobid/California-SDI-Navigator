import type { SDIRateYear, LTDLimits } from "~/types";

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
    maxWeeklyBenefit: 1681,
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

// LTD Plan Limits
export const LTD_LIMITS: LTDLimits = {
  irs401a17: 350000, // 2026 IRS limit
  maxPercentageYear1_2: 60,
  maxPercentageYear3Plus: 50,
};

// Important Dates
export const KEY_DATES = {
  sb951Passed: "2022-09-01",
  sdiUncapped: "2024-01-01",
  currentYear: new Date().getFullYear(),
};

// Hartford Appeal Deadline
export const HARTFORD_APPEAL_DAYS = 180; // 6 months

// EDD Filing Deadline
export const EDD_FILING_DEADLINE_DAYS = 49;

// Base Period Calculation Quarters
export const BASE_PERIOD_QUARTERS = {
  "jan-mar": { start: -24, end: -12 }, // Oct 2 years prior to Sep 1 year prior
  "apr-jun": { start: -21, end: -9 }, // Jan to Dec 1 year prior
  "jul-sep": { start: -18, end: -6 }, // Apr 1 year prior to Mar current
  "oct-dec": { start: -15, end: -3 }, // Jul 1 year prior to Jun current
} as const;
