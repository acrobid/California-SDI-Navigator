# CBA-Based Updates for CA SDI Navigator

**Based on:** FedEx/ALPA CBA Section 27.J (Disability Plan)
**Date:** January 11, 2026

---

## Executive Summary

The CBA provides critical details about the FedEx LTD Plan that differ from or add to the current implementation. Key findings:

1. **Claims Administrator:** CBA references **Aetna Life Insurance Company**, not The Hartford
2. **Benefit calculation:** More specific formula than currently documented
3. **SSDI offset:** Only 70% of pilot's SSDI is offset (not 100%)
4. **Outside income:** Special rules for pilots with side businesses
5. **Duration limits:** Specific caps for mental health and substance abuse

---

## 1. Claims Administrator Correction

### Current Implementation

References "The Hartford" as the LTD claims administrator throughout.

### CBA Says

> "The Company's agreement with the current administrator (Aetna Life Insurance Company) of LTD Plan benefits..."

### Required Changes

| File                                 | Change                                                                       |
| ------------------------------------ | ---------------------------------------------------------------------------- |
| All files referencing "The Hartford" | **Verify current administrator** - CBA says Aetna, but this may have changed |
| `data/contacts.json`                 | Update organization name                                                     |
| `utils/constants.ts`                 | Update `LTD_LIMITS` object name references                                   |
| All guide content                    | Update references                                                            |

### Action Item

> ⚠️ **CRITICAL:** Confirm with pilots whether LTD claims are currently administered by Aetna or The Hartford. The CBA may be outdated, or there may have been a vendor change.

**Suggested approach:** Keep code/data generic (e.g., "LTD Administrator" or "Claims Paying Administrator") until confirmed.

---

## 2. LTD Eligibility Trigger

### Current Implementation

Vague about when LTD begins.

### CBA Says (27.J.1)

> "A pilot shall be eligible for LTD Plan benefits upon exhaustion of his regular and disability sick accounts, as described in Section 14, or upon his experiencing a seat change or upon moving to a non-pilot position because of disability"

### Required Changes

**Add to `content/guide/`:**

```markdown
## When LTD Benefits Begin

LTD eligibility is triggered by ONE of these events:

1. **Exhaustion of sick banks** - Both regular sick and DSA accounts are depleted
2. **Disability-related seat change** - You bid down to a lower seat due to disability
3. **Move to non-pilot position** - You transition to a ground position due to disability

### Important Notes

- LTD does NOT begin automatically after a certain number of days
- LTD begins when your sick banks run out OR you change positions
- You should file for CA SDI early in your disability, not when LTD begins
```

**Update checklist items** to reflect this trigger:

```json
{
  "id": "hartford-01",
  "phase": "hartford",
  "title": "Determine your LTD eligibility date",
  "description": "LTD begins when you exhaust sick banks OR experience a disability-related seat/position change. Calculate when this will occur.",
  "estimatedMinutes": 30,
  "guideLink": "/guide/hartford/eligibility",
  "dependencies": [],
  "warnings": [
    "LTD does not begin on a fixed date—it depends on your sick bank balance",
    "CA SDI should be filed early in disability, regardless of LTD timing"
  ]
}
```

---

## 3. Benefit Calculation Updates

### Current Implementation

```typescript
export const LTD_LIMITS = {
  irs401a17_2024: 345000,
  irs401a17_2025: 350000,
  irs401a17_2026: 350000,
  percentageYear1_2: 60,
  percentageYear3Plus: 50,
};
```

### CBA Says (27.J.2, 27.J.6, 27.J.7)

**Monthly Earnings Definition:**

> "Monthly earnings shall continue to be defined as a pilot's basic monthly compensation, i.e., the 12 highest consecutive months out of the 36 consecutive months preceding the disability period."

**Benefit Percentages:**

> "60% of monthly earnings... for the first 24 months"
> "50% of monthly earnings... thereafter"

**401(a)(17) Cap:**

> "A pilot's monthly LTD Plan benefit during the first 24 months of disability may not exceed 60% of the monthly compensation limit set forth in Code § 401(a)(17)."
> "A pilot's monthly LTD Plan benefit following the first 24 months of disability may not exceed 50% of the monthly compensation limit set forth in Code § 401(a)(17)."

### Required Changes

**Update `utils/constants.ts`:**

```typescript
export const LTD_CALCULATION = {
  // Benefit percentages
  percentageMonths1_24: 0.6, // 60% for first 24 months
  percentageMonths25Plus: 0.5, // 50% after 24 months

  // Monthly earnings calculation
  monthlyEarningsLookback: 36, // Look at last 36 months
  monthlyEarningsWindow: 12, // Use best 12 consecutive months

  // IRS 401(a)(17) limits by year
  irs401a17Limits: {
    2024: 345000,
    2025: 350000,
    2026: 350000, // Verify - may increase with IRS updates
  },

  // Maximum monthly benefit = (401(a)(17) / 12) * percentage
  // Example 2025: ($350,000 / 12) * 60% = $17,500/month max for months 1-24
  //               ($350,000 / 12) * 50% = $14,583/month max for months 25+
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
```

**Add new calculator component or update existing:**

```typescript
interface LTDBenefitCalculation {
  monthlyEarnings: number; // Best 12 of 36 months average
  grossMonthlyBenefit: number; // monthlyEarnings * percentage
  maxMonthlyBenefit: number; // 401(a)(17) cap
  actualMonthlyBenefit: number; // Lesser of gross and max
  expectedCASDIMonthly: number; // CA SDI benefit (weekly * 4.33)
  ssdiOffset: number; // 70% of SSDI (if applicable)
  netMonthlyBenefit: number; // After all offsets
  monthsOnLTD: number; // For percentage determination
}
```

---

## 4. SSDI Offset Correction

### Current Implementation

Not specifically addressed, or may assume 100% offset.

### CBA Says (27.J.15)

> "the amount of a pilot's Social Security Disability Income which shall be offset from his LTD benefits in an amount equal to **70%** (100% with respect to disabilities commencing prior to October 30, 2006) of the Social Security Disability Income payable to the pilot **(excluding any amount payable to the pilot on account of any member of the pilot's family)**."

### Required Changes

**Update `utils/constants.ts`:**

```typescript
export const SSDI_OFFSET = {
  // Current rate for disabilities after Oct 30, 2006
  currentOffsetPercentage: 0.7, // Only 70% of SSDI is offset

  // Legacy rate for disabilities before Oct 30, 2006
  legacyOffsetPercentage: 1.0, // 100% offset

  // Cutoff date
  legacyCutoffDate: "2006-10-30",

  // Note: Family benefits are NOT included in offset
  includesFamilyBenefits: false,
};
```

**Add to guide content:**

```markdown
## SSDI Offset Rules

If you receive Social Security Disability Insurance (SSDI), it will be offset against your LTD benefits, but with important limitations:

### 70% Offset Rule

Only **70%** of your personal SSDI benefit is offset from your LTD payment.

**Example:**

- Your SSDI benefit: $3,000/month
- Amount offset from LTD: $3,000 × 70% = $2,100/month
- You effectively keep: $900/month of SSDI "free and clear"

### Family Benefits Excluded

If SSDI pays additional benefits for your dependents (spouse, children), those amounts are **NOT** offset. You keep 100% of family benefits.

### Legacy Exception

Pilots whose disability began before October 30, 2006 have 100% of their SSDI offset (the old rule).
```

**Update calculator to include SSDI handling:**

```typescript
interface SSDIOffset {
  pilotSSDIBenefit: number; // Monthly SSDI for pilot only
  familySSDIBenefit: number; // Monthly SSDI for dependents
  offsetPercentage: number; // 70% or 100% based on disability date
  offsetAmount: number; // Amount deducted from LTD
  netSSDIRetained: number; // SSDI pilot keeps after offset logic
}

function calculateSSDIOffset(
  pilotSSDI: number,
  familySSDI: number,
  disabilityStartDate: Date,
): SSDIOffset {
  const legacyCutoff = new Date("2006-10-30");
  const isLegacy = disabilityStartDate < legacyCutoff;
  const offsetPercentage = isLegacy ? 1.0 : 0.7;

  const offsetAmount = pilotSSDI * offsetPercentage;
  // Family benefits not offset, and 30% of pilot benefits retained
  const netRetained = pilotSSDI * (1 - offsetPercentage) + familySSDI;

  return {
    pilotSSDIBenefit: pilotSSDI,
    familySSDIBenefit: familySSDI,
    offsetPercentage,
    offsetAmount,
    netSSDIRetained: netRetained,
  };
}
```

---

## 5. CA SDI Offset Clarification

### Current Understanding

CA SDI is offset from LTD benefits.

### CBA Says (27.J.15)

> "LTD benefits shall be reduced by other benefits and income received during the disability period, as described in the LTD Plan except: (i) as provided in Section 27.J.13., and (ii) [SSDI rules]"

### Analysis

The CBA confirms offsets occur but doesn't give specific CA SDI rules—those are in the LTD Plan document itself. However, we can infer:

- CA SDI **is** offset (it's "other benefits received during disability")
- The offset rules are "as described in the LTD Plan"

### Action Item

> Need to obtain the actual LTD Plan document to confirm CA SDI offset mechanics. The CBA references it but doesn't include the details.

---

## 6. Outside Income Rules

### Current Implementation

Not addressed.

### CBA Says (27.J.13)

> "An LTD Plan reduction arising out of other employment or self-employment during the term of a pilot's disability shall be applicable to a pilot only after the disability payments plus the outside income earned by the pilot exceed the pilot's pre-disability income."

With detailed example:

- Pre-disability: $100,000 FedEx + $25,000 side business = $10,416.66/month average
- On disability: $5,000 LTD + $4,000 side business = $9,000/month
- $9,000 < $10,416.66, so **no offset**
- If side business was $7,000: $12,000 total > $10,416.66 by $1,583.34
- Offset = 50% × $1,583.34 = $791.67

### Required Changes

**Add to `utils/constants.ts`:**

```typescript
export const OUTSIDE_INCOME_OFFSET = {
  // Offset only applies when total exceeds pre-disability income
  thresholdType: "pre-disability-total",

  // When offset applies, it's 50% of the excess
  excessOffsetPercentage: 0.5,

  // Pre-disability income includes both FedEx AND outside income
  includesOutsideIncomeInBaseline: true,

  // Lookback period for pre-disability income
  lookbackMonths: 12,
};
```

**Add new calculator section or component:**

```typescript
interface OutsideIncomeCalculation {
  preDisabilityFedExMonthly: number;
  preDisabilityOutsideMonthly: number;
  preDisabilityTotalMonthly: number;
  currentLTDBenefit: number;
  currentOutsideIncome: number;
  currentTotalIncome: number;
  excessOverPreDisability: number;
  outsideIncomeOffset: number;
}

function calculateOutsideIncomeOffset(
  preDisabilityFedEx: number, // Monthly average FedEx pay (12 months)
  preDisabilityOutside: number, // Monthly average outside income (12 months)
  currentLTD: number, // Current monthly LTD benefit
  currentOutsideIncome: number, // Current monthly outside income
): OutsideIncomeCalculation {
  const preDisabilityTotal = preDisabilityFedEx + preDisabilityOutside;
  const currentTotal = currentLTD + currentOutsideIncome;
  const excess = Math.max(0, currentTotal - preDisabilityTotal);
  const offset = excess * 0.5; // 50% of excess is offset

  return {
    preDisabilityFedExMonthly: preDisabilityFedEx,
    preDisabilityOutsideMonthly: preDisabilityOutside,
    preDisabilityTotalMonthly: preDisabilityTotal,
    currentLTDBenefit: currentLTD,
    currentOutsideIncome: currentOutsideIncome,
    currentTotalIncome: currentTotal,
    excessOverPreDisability: excess,
    outsideIncomeOffset: offset,
  };
}
```

**Add guide content:**

```markdown
## Outside Income While on LTD

If you have a side business or other employment while on disability, special rules apply.

### The Basic Rule

Your LTD benefit is only reduced if your **total income** (LTD + outside income) **exceeds** your **pre-disability total income** (FedEx + outside income).

### Key Points

1. Pre-disability income includes BOTH FedEx pay AND any outside income you had
2. The baseline is your average monthly income over the 12 months before disability
3. If total exceeds baseline, the offset is **50% of the excess**—not 100%

### Example

**Before Disability:**

- FedEx income: $100,000/year ($8,333/month)
- Software consulting: $25,000/year ($2,083/month)
- **Total pre-disability: $10,416/month**

**While on LTD:**

- LTD benefit: $5,000/month
- Consulting continues: $4,000/month
- **Current total: $9,000/month**

**Result:** $9,000 < $10,416, so **no offset applies**

**Different Scenario:**

- LTD benefit: $5,000/month
- Consulting grows to: $7,000/month
- **Current total: $12,000/month**

**Calculation:**

- Excess: $12,000 - $10,416 = $1,584
- Offset: $1,584 × 50% = $792
- Net LTD: $5,000 - $792 = $4,208

### Why This Matters

If you had a side business before your disability, don't abandon it assuming it will reduce your LTD. You may be able to continue it without any offset—or with a reduced offset.
```

---

## 7. Duration Limits by Condition Type

### Current Implementation

General 52-week CA SDI limit mentioned; LTD duration not detailed.

### CBA Says

**Mental Disorders (27.J.10):**

> "The duration of the LTD Plan benefits for mental disorders, as currently defined in the LTD Plan, shall remain at a maximum of 60 months."

**Alcohol/Substance Abuse (27.J.11):**

> "the duration of LTD Plan benefits for alcohol and substance abuse shall be at a maximum of 18 months (up to 12 months, plus, for pilots seeking medical recertification, up to an additional 6 months)"

**General (27.J.2):**

> "benefits shall be paid through the earlier of the date on which such pilot (1) ceases to be disabled, or (2) the date on which the pilot attains age 65."

### Required Changes

**Update `utils/constants.ts`:**

```typescript
export const LTD_DURATION_LIMITS = {
  // General disability - until recovery or age 65
  general: {
    maxMonths: null, // No fixed limit
    maxAge: 65,
    description: "Until recovery or age 65, whichever comes first",
  },

  // Mental disorders
  mentalHealth: {
    maxMonths: 60,
    maxAge: 65,
    description: "Maximum 60 months (5 years)",
  },

  // Alcohol and substance abuse (post Nov 2, 2015)
  substanceAbuse: {
    maxMonths: 18, // 12 base + 6 for recertification effort
    baseMonths: 12,
    recertificationBonus: 6,
    maxAge: 65,
    description:
      "Maximum 18 months (12 + 6 if seeking medical recertification)",
    effectiveDate: "2015-11-02",
  },

  // Legacy substance abuse (pre Nov 2, 2015)
  substanceAbuseLegacy: {
    maxMonths: 6.5, // 26 weeks
    description: "26 weeks for disabilities before November 2, 2015",
    effectiveDate: null, // Before Nov 2, 2015
  },
};
```

**Add guide content:**

```markdown
## LTD Duration Limits by Condition

Not all disabilities have the same LTD benefit duration.

### General Physical Disabilities

- **Duration:** Until you recover OR reach age 65
- **No fixed time limit** for most physical conditions

### Mental Health Conditions

- **Maximum:** 60 months (5 years)
- Applies to conditions defined as "mental disorders" in the LTD Plan
- After 60 months, LTD benefits end regardless of continued disability

### Alcohol and Substance Abuse

- **Maximum:** 18 months total
  - 12 months base
  - +6 months if actively seeking FAA medical recertification
- For disabilities that began before November 2, 2015: 26 weeks maximum

### Important Notes

- These limits apply to LTD benefits, not CA SDI
- CA SDI has its own maximum of 52 weeks
- If you have multiple conditions, the most restrictive limit may apply
- Consult with ALPA R&I if you have questions about your specific situation
```

---

## 8. Cooperation Requirements

### CBA Says (27.J.4)

> "In order for a pilot to continue to be eligible for a disability benefit under the LTD Plan, the pilot must fully cooperate with the Claims Paying Administrator, in coordination with the Aeromedical Advisor, and must diligently seek restoration of any required license or medical certificate to allow the pilot to return to work."

### Required Changes

**Add to checklist:**

```json
{
  "id": "ongoing-01",
  "phase": "ongoing",
  "title": "Understand cooperation requirements",
  "description": "Your LTD benefits require ongoing cooperation with the claims administrator and efforts to restore your medical certificate.",
  "estimatedMinutes": 15,
  "guideLink": "/guide/hartford/cooperation",
  "warnings": [
    "Failure to cooperate can result in loss of benefits",
    "You must actively work toward medical recertification when possible"
  ],
  "tips": [
    "Respond promptly to all requests from the claims administrator",
    "Document your efforts to restore your medical certificate",
    "Work with the Aeromedical Advisor as directed"
  ]
}
```

**Add guide content:**

```markdown
## LTD Cooperation Requirements

Your continued eligibility for LTD benefits depends on meeting cooperation requirements.

### What's Required

1. **Cooperate with Claims Administrator**
   - Respond to all information requests promptly
   - Provide medical records as requested
   - Attend required medical examinations
   - Submit to functional capacity evaluations if requested

2. **Work with Aeromedical Advisor**
   - FedEx's Aeromedical Advisor may be involved in your case
   - Coordinate your return-to-work planning with them
   - Follow their guidance on medical certification path

3. **Seek Medical Certificate Restoration**
   - You must "diligently seek restoration" of your FAA medical
   - This means actively working with AMEs and the FAA
   - Document all efforts (HIMS appointments, SI applications, etc.)

### Consequences of Non-Cooperation

Failure to meet these requirements can result in:

- Suspension of LTD benefits
- Denial of continued benefits
- Requirement to repay benefits already received

### Documentation Tips

Keep records of:

- All communications with claims administrator
- Medical appointments related to certificate restoration
- FAA correspondence
- AME visits and recommendations
- HIMS program participation (if applicable)
```

---

## 9. Company System Access

### CBA Says (27.J.19)

> "During the period that a pilot is on disability, the pilot shall have access to Company communications systems including pilot.fedex.com, PRISM and Company email."

### Required Changes

**Add to guide content:**

```markdown
## Maintaining Company Access While Disabled

You retain access to company systems while on disability:

- **pilot.fedex.com** - Company pilot portal
- **PRISM** - Scheduling and bid system
- **Company email** - Your @fedex.com email

### Why This Matters

- Stay informed about company communications
- Access pay stubs and tax documents
- Maintain connection with scheduling for return-to-work planning
- Receive union communications

### If Access Is Lost

If you lose access to any of these systems while on disability:

1. Contact your supervisor or chief pilot
2. Reference CBA Section 27.J.19
3. Escalate to ALPA if not resolved
```

---

## 10. Information Sharing Between Plans

### CBA Says (27.J.20)

If both the FedEx LTD Plan and an ALPA-sponsored disability plan are administered by the same entity (Aetna), you can authorize information sharing between them.

> "each plan shall be administered independently... there shall be no collaboration... in claims payment decisions under each plan"

### Required Changes

**Add guide content:**

```markdown
## ALPA Supplemental Disability Plan

Many pilots carry supplemental disability coverage through ALPA in addition to the FedEx LTD Plan.

### Information Sharing

If both plans are administered by the same company (currently Aetna):

- You can authorize sharing of medical records between plans
- This can reduce duplicate paperwork
- Each plan is still decided independently

### How to Authorize

1. Request the "Authorization to Share Information Form"
2. Must be signed and dated
3. May need to be renewed periodically

### Important

Even with information sharing:

- Each plan makes independent decisions
- Approval on one plan doesn't guarantee approval on the other
- Different criteria and definitions may apply
```

---

## 11. Summary of All File Changes

### Files to Update

| File                                       | Changes Required                                                                      |
| ------------------------------------------ | ------------------------------------------------------------------------------------- |
| `utils/constants.ts`                       | Add LTD calculation details, SSDI offset rules, duration limits, outside income rules |
| `data/contacts.json`                       | Verify claims administrator (Aetna vs Hartford)                                       |
| `data/checklist-items.json`                | Add cooperation requirements, LTD eligibility items                                   |
| `data/timeline-defaults.json`              | Update to reflect sick bank exhaustion trigger                                        |
| `components/calculators/LTDCalculator.vue` | Add monthly earnings formula, 401(a)(17) cap, SSDI/outside income handling            |
| `content/guide/5.hartford/*`               | Major updates with CBA-specific information                                           |

### New Files to Create

| File                                             | Purpose                           |
| ------------------------------------------------ | --------------------------------- |
| `content/guide/5.hartford/1.overview.md`         | LTD plan overview                 |
| `content/guide/5.hartford/2.eligibility.md`      | When LTD begins                   |
| `content/guide/5.hartford/3.calculation.md`      | How benefits are calculated       |
| `content/guide/5.hartford/4.offsets.md`          | CA SDI, SSDI, outside income      |
| `content/guide/5.hartford/5.cooperation.md`      | Requirements to maintain benefits |
| `content/guide/5.hartford/6.duration.md`         | Duration limits by condition      |
| `content/guide/5.hartford/7.appeals.md`          | Appeal process (needs more info)  |
| `content/guide/7.special/4.alpa-supplemental.md` | ALPA disability plan coordination |

### Constants File Update (Complete)

```typescript
// utils/constants.ts - Complete CBA-based update

// ============================================
// LTD BENEFIT CALCULATION
// ============================================

export const LTD_CALCULATION = {
  // Benefit percentages (CBA 27.J.2)
  percentageMonths1_24: 0.6,
  percentageMonths25Plus: 0.5,

  // Monthly earnings definition (CBA 27.J.6)
  // "12 highest consecutive months out of 36 consecutive months preceding disability"
  monthlyEarningsLookbackMonths: 36,
  monthlyEarningsWindowMonths: 12,

  // 401(a)(17) limits (CBA 27.J.7)
  irs401a17Limits: {
    2024: 345000,
    2025: 350000,
    2026: 350000, // TODO: Verify with IRS updates
  } as Record<number, number>,

  // Max benefit = (401(a)(17) / 12) * percentage
  // This cap adjusts with IRS updates (CBA 27.J.7)
};

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
  // Pre-disability includes FedEx + outside income
  lookbackMonths: 12,
  // Offset is 50% of excess
  excessOffsetPercentage: 0.5,
};

// ============================================
// LTD DURATION LIMITS (CBA 27.J.2, 10, 11)
// ============================================

export const LTD_DURATION_LIMITS = {
  general: {
    maxMonths: null as number | null,
    maxAge: 65,
  },
  mentalHealth: {
    maxMonths: 60,
    maxAge: 65,
  },
  substanceAbuse: {
    maxMonths: 18,
    baseMonths: 12,
    recertificationBonusMonths: 6,
    maxAge: 65,
    effectiveDate: new Date("2015-11-02"),
  },
  substanceAbuseLegacy: {
    maxWeeks: 26,
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
  // CBA references Aetna - VERIFY THIS IS CURRENT
  name: "Aetna Life Insurance Company", // TODO: Confirm with pilots
  note: "Verify current administrator - CBA may be outdated",
};

// ============================================
// CA SDI (unchanged from previous)
// ============================================

export const CA_SDI_RATES: Record<
  number,
  {
    rate: number;
    maxTaxableWage: number | null;
    maxWeeklyBenefit: number;
    capped: boolean;
  }
> = {
  2023: {
    rate: 0.009,
    maxTaxableWage: 153164,
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

export const BASE_PERIOD_QUARTERS: Record<string, string> = {
  Q1: "October - September (15-18 months prior)",
  Q2: "January - December (previous calendar year)",
  Q3: "April - March (4-15 months prior)",
  Q4: "July - June (4-15 months prior)",
};

export const KEY_DEADLINES = {
  sdiFilingDays: 49,
  physicianCertificationDays: 49,
  // TODO: Verify Hartford/Aetna appeal deadline
  ltdAppealMonths: 6,
  continuedClaimIntervalDays: 14,
  eddInfoResponseDays: 10,
};
```

---

## 12. Open Questions for Pilots

| Question                                                                                       | Why It Matters                                  |
| ---------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| Is the LTD claims administrator still Aetna, or has it changed to Hartford or another company? | Correct contact info and process details        |
| What is the exact appeal deadline for LTD decisions?                                           | Need to verify 6-month assumption               |
| How does the CA SDI offset actually work in practice?                                          | CBA references "LTD Plan" which we don't have   |
| What is the Aeromedical Advisor's contact information?                                         | For cooperation requirement guidance            |
| Are there specific forms for the Authorization to Share Information?                           | For ALPA supplemental plan coordination         |
| How does DSA (Disability Sick Absence) bank work exactly?                                      | Need Section 14 details for eligibility trigger |

---

This document should give you a comprehensive roadmap for updating your implementation with CBA-accurate information. The biggest immediate action item is confirming the claims administrator identity.
