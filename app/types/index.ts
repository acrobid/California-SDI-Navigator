// ============================================
// Calculator Types
// ============================================

export interface CalculatorInputs {
  annualBaseSalary: number;
  averageMonthlyIncome: number;
  highestQuarterlyIncome: number;
  expectedDisabilityWeeks: number;
  hasExhaustedSickBank: boolean;
  ltdPercentage: 50 | 60;
  vaDisabilityMonthly?: number;
  otherDisabilityIncome?: number;
}

export interface CalculatorOutputs {
  caSDIWeeklyBenefit: number;
  caSDIMaxWeeks: number;
  caSDITotalBenefit: number;
  ltdMonthlyBeforeOffset: number;
  ltdAnnualCap: number;
  expectedMonthlyOffset: number;
  netMonthlyDuringSDI: number;
  netMonthlyAfterSDI: number;
  annualSDITaxPaid: number;
  comparisonToNonCABase: {
    monthlyDifference: number;
    sdiBureaucracyCost: "Low" | "Medium" | "High";
  };
}

// ============================================
// Checklist Types
// ============================================

export type ChecklistPhase =
  | "preparation"
  | "filing"
  | "post-filing"
  | "hartford"
  | "in-person";

export interface ChecklistItem {
  id: string;
  phase: ChecklistPhase;
  title: string;
  description: string;
  estimatedMinutes: number;
  guideLink?: string;
  dependencies?: string[];
  warnings?: string[];
  tips?: string[];
}

export interface ChecklistState {
  items: Record<string, boolean>;
  startedAt?: string;
  claimType: "short-term" | "long-term" | "both";
}

// ============================================
// Pay Stub Types
// ============================================

export interface PayStubEntry {
  payPeriodStart: string;
  payPeriodEnd: string;
  flightPay: number;
  perDiem: number;
  premiumPay: number;
  overridePay: number;
  vacationPay: number;
  sickPay: number;
  dsaPay: number;
  holidayPay: number;
  trainingPay: number;
  miscPay: number;
  caSDIWithheld: number;
  federalTax: number;
  stateTax: number;
}

export interface PayStubSummary {
  period: {
    start: string;
    end: string;
    daysInPeriod: number;
  };
  workPay: {
    flightPay: number;
    perDiem: number;
    premiumPay: number;
    total: number;
  };
  timeOffPay: {
    vacationPay: number;
    sickPay: number;
    holidayPay: number;
    total: number;
  };
  grossPay: number;
  monthlyEquivalent: number;
  ytdSDITax: number;
}

// ============================================
// Timeline Types
// ============================================

export type TimelineEventType = "edd" | "hartford" | "personal" | "deadline";

export interface TimelineEvent {
  id: string;
  name: string;
  startOffset: number;
  durationDays: number;
  varianceDays: number;
  type: TimelineEventType;
  isCritical: boolean;
  description: string;
}

export interface TimelineInputs {
  claimStartDate: string;
  filingMethod: "online" | "mail" | "in-person";
  livesInCalifornia: boolean;
  hasExistingEDDContact: boolean;
}

export interface TimelineOutput {
  events: Array<
    TimelineEvent & {
      expectedDate: string;
      rangeStart: string;
      rangeEnd: string;
    }
  >;
  criticalDeadlines: Array<{
    name: string;
    date: string;
    daysFromNow: number;
  }>;
}

// ============================================
// Contact Types
// ============================================

export type ContactOrganization =
  | "edd"
  | "hartford"
  | "alpa"
  | "fedex"
  | "other";
export type ContactType = "office" | "phone" | "person" | "website";

export interface Contact {
  id: string;
  name: string;
  organization: ContactOrganization;
  type: ContactType;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  googleMapsUrl?: string;
  phone?: string;
  fax?: string;
  email?: string;
  website?: string;
  hours?: string;
  bestTimeToCall?: string;
  notes?: string;
  lastVerified?: string;
  nearestAirport?: string;
  parkingInfo?: string;
  waitTimeEstimate?: string;
}

// ============================================
// Content Types (for Nuxt Content)
// ============================================

export interface GuidePageMeta {
  title: string;
  description: string;
  icon?: string;
  lastUpdated?: string;
  readingTime?: number;
  tags?: string[];
}

// ============================================
// Constants Types
// ============================================

export interface SDIRateYear {
  rate: number;
  maxTaxableWage: number | null;
  maxWeeklyBenefit: number;
  capped: boolean;
}

export interface LTDLimits {
  irs401a17: number;
  maxPercentageYear1_2: number;
  maxPercentageYear3Plus: number;
}
