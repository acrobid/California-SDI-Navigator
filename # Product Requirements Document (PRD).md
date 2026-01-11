# Product Requirements Document (PRD)

## California SDI Navigator for FedEx Pilots

**Version:** 1.0
**Last Updated:** January 11, 2026
**Status:** Draft

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Goals & Success Metrics](#3-goals--success-metrics)
4. [User Personas](#4-user-personas)
5. [Feature Requirements](#5-feature-requirements)
6. [Technical Specifications](#6-technical-specifications)
7. [Data Models](#7-data-models)
8. [UI/UX Requirements](#8-uiux-requirements)
9. [Content Structure](#9-content-structure)
10. [Security & Privacy](#10-security--privacy)
11. [Deployment](#11-deployment)
12. [Future Considerations](#12-future-considerations)
13. [Appendix](#13-appendix)

---

## 1. Executive Summary

### 1.1 Product Overview

A web application designed to help FedEx pilots based in California navigate the complex process of claiming California State Disability Insurance (CA SDI) benefits while coordinating with their Long-Term Disability (LTD) insurance through The Hartford. The application provides step-by-step process documentation, calculators for estimating benefits, and tools for converting FedEx pay stub data into formats that California's Employment Development Department (EDD) can understand.

### 1.2 Background Context

FedEx operates pilot bases in several locations including Memphis (MEM), Indianapolis (IND), Anchorage (ANC), and Oakland (OAK). Pilots based in California (OAK base) are required by state law to pay into California's State Disability Insurance (SDI) program through payroll deductions.

When a California-based pilot becomes disabled:

1. They are entitled to benefits from CA SDI
2. They are also entitled to Long-Term Disability (LTD) benefits through The Hartford (FedEx's LTD insurance provider)
3. The Hartford **offsets** (reduces) their LTD payments by the amount the pilot is expected to receive from CA SDI
4. This offset occurs regardless of whether the pilot has actually received the CA SDI payment

This creates a situation where:

- California-based pilots effectively pay for a portion of their own LTD coverage (through mandatory SDI taxes)
- Pilots at other bases receive full LTD with no offset
- The CA EDD system is not designed to understand airline pilot pay structures
- Bureaucratic delays can leave pilots without income for extended periods

### 1.3 The Core Problems

1. **Information Asymmetry:** There is no centralized, documented process for FedEx pilots to navigate CA SDI claims
2. **Pay Structure Incompatibility:** CA EDD expects monthly pay at regular intervals; pilots have variable schedules and complex pay (trip pay, per diem, sick time, vacation) that doesn't fit EDD's systems
3. **Documentation Failures:** FedEx's payroll exports to EDD are not helpful—they show "regular pay" even when it represents sick time or vacation
4. **Financial Harm:** The Hartford deducts expected CA SDI amounts before pilots receive them, creating cash flow crises
5. **Repeated Effort:** Each pilot who goes through this process must figure it out from scratch

### 1.4 Key Dates & Regulations

| Date            | Event                                                                    |
| --------------- | ------------------------------------------------------------------------ |
| ~2002           | FedEx LAX base opened; CA SDI issues began but were minor due to tax cap |
| September 2022  | California SB951 passed, removing SDI tax cap                            |
| January 1, 2024 | SDI tax uncapped; rate set at 1.1% of ALL income                         |
| January 1, 2025 | SDI rate increased to 1.2%                                               |
| January 1, 2026 | SDI rate increased to 1.3%                                               |

---

## 2. Problem Statement

### 2.1 Current State

When a FedEx pilot based in California becomes unable to work due to illness or injury:

1. **Short-Term:** They use accrued sick time and Disability Sick Absence (DSA) bank
2. **Transition:** When sick/DSA is exhausted, they transition to Long-Term Disability (LTD)
3. **CA SDI Eligibility:** Throughout this process, they may be eligible for CA SDI benefits
4. **The Conflict:**
   - The Hartford (LTD provider) reduces LTD payments by the CA SDI amount the pilot "should" receive
   - CA EDD has a difficult, paper-based process that doesn't understand pilot pay
   - Pilots may go months without receiving CA SDI while The Hartford has already reduced their LTD

### 2.2 Specific Pain Points

| Pain Point                    | Description                                                                                    |
| ----------------------------- | ---------------------------------------------------------------------------------------------- |
| **EDD Office Visits**         | Can require 4-5+ hours; must arrive before 9:00 AM to get a ticket                             |
| **Pay Interpretation**        | EDD expects regular monthly pay; cannot interpret pilot pay stubs                              |
| **FedEx Data Quality**        | Spreadsheets FedEx sends to EDD show "regular pay" for all pay types                           |
| **Disability Date Confusion** | EDD uses calendar months; FedEx LTD starts based on last day worked                            |
| **Documentation Requests**    | EDD repeatedly requests documents already submitted (doctor's license, medical school diploma) |
| **Snail Mail**                | Out-of-state/overseas pilots must use postal mail; creates massive delays                      |
| **License Verification**      | EDD requires 7-10 business days to verify doctors' licenses                                    |
| **Zero Income Reporting**     | FedEx payroll has reported $0.00 income to EDD for some pilots                                 |
| **Appeal Deadlines**          | Hartford appeals have 6-month limit; pilots may miss this window                               |

### 2.3 Consequences of Inaction

- Pilots receive reduced income (50-60% of pre-disability income, minus CA SDI offset they haven't received)
- Some pilots effectively receive ~25-30% of normal income during claims processing
- Financial hardship during already stressful medical situations
- Institutional knowledge is lost when experienced pilots retire or resolve their claims
- Each pilot wastes dozens of hours figuring out a process others have already solved

---

## 3. Goals & Success Metrics

### 3.1 Primary Goals

| Goal   | Description                                                                            |
| ------ | -------------------------------------------------------------------------------------- |
| **G1** | Reduce average time to receive first CA SDI payment by 50%                             |
| **G2** | Eliminate cases where pilots miss Hartford appeal deadlines due to lack of information |
| **G3** | Provide single source of truth for CA SDI process documentation                        |
| **G4** | Enable pilots to generate EDD-compatible documentation from FedEx pay data             |

### 3.2 Success Metrics

| Metric                     | Target                         | Measurement Method          |
| -------------------------- | ------------------------------ | --------------------------- |
| Time to first SDI payment  | < 45 days from claim           | Self-reported user feedback |
| Documentation completeness | 100% of known steps documented | Content audit               |
| User satisfaction          | > 4.5/5 rating                 | In-app feedback             |
| Calculator accuracy        | Within 5% of actual benefit    | User verification reports   |
| Monthly active users       | 50+ within 6 months            | Analytics                   |

### 3.3 Non-Goals (Out of Scope)

- Directly integrating with CA EDD systems (not possible)
- Automating claim submission (must be done by individual)
- Providing legal advice
- Storing sensitive personal health information
- Replacing ALPA or union support channels
- Advocating for contract changes (informational only)

---

## 4. User Personas

### 4.1 Primary Persona: Active Claimant ("Sarah")

**Demographics:**

- FedEx Captain, OAK base
- 15 years seniority
- Age 52
- Household income ~$400,000/year
- Lives in California

**Situation:**

- Recently had knee surgery
- Has been on sick leave for 6 weeks
- DSA bank running low
- Needs to file CA SDI claim and prepare for potential LTD

**Goals:**

- Understand exactly what to do and when
- Avoid making mistakes that delay payments
- Maximize benefits received
- Not spend entire days at EDD office

**Frustrations:**

- "I don't know what I don't know"
- "Every person I ask gives different advice"
- "I can't afford to wait months for payment"

**Tech Comfort:** Moderate; uses iPhone, can navigate websites, not a programmer

### 4.2 Secondary Persona: Preparing Pilot ("Mike")

**Demographics:**

- FedEx First Officer, OAK base
- 5 years seniority
- Age 38
- Has scheduled surgery in 3 months

**Situation:**

- Elective surgery scheduled
- Has time to prepare and optimize
- Wants to understand process before it begins

**Goals:**

- Start paperwork early where possible
- Understand timeline and financial impact
- Make informed decisions about sick bank management

**Tech Comfort:** High; software background before aviation

### 4.3 Tertiary Persona: Remote/Overseas Claimant ("James")

**Demographics:**

- FedEx Captain, OAK base
- Lives overseas (commutes to base)
- Cannot easily visit EDD office

**Situation:**

- Must handle everything via mail and phone
- Time zone differences make calls difficult
- Postal mail takes weeks

**Goals:**

- Complete process without in-person visit
- Understand exactly what documentation is needed upfront
- Avoid repeated document requests

**Tech Comfort:** Moderate

### 4.4 Quaternary Persona: Subject Matter Expert ("Linda")

**Demographics:**

- FedEx Captain, OAK base
- Successfully navigated CA SDI process
- Has relationships with EDD office contacts
- Helps other pilots informally

**Situation:**

- Frequently gets questions from other pilots
- Wants to document knowledge systematically
- Willing to contribute but time-limited

**Goals:**

- Contribute knowledge to help others
- Reduce repetitive questions
- Create lasting resource

**Tech Comfort:** Low-moderate; prefers simple interfaces

---

## 5. Feature Requirements

### 5.1 Feature Overview

| Feature               | Priority      | Phase |
| --------------------- | ------------- | ----- |
| Process Guide (Wiki)  | P0 - Critical | 1     |
| Interactive Checklist | P0 - Critical | 1     |
| Benefit Calculator    | P1 - High     | 1     |
| Pay Stub Translator   | P1 - High     | 2     |
| Timeline Generator    | P2 - Medium   | 2     |
| Contact Directory     | P2 - Medium   | 1     |
| Document Templates    | P2 - Medium   | 1     |
| Progress Tracker      | P3 - Low      | 3     |
| Community Notes       | P3 - Low      | 3     |

### 5.2 Feature Specifications

#### 5.2.1 Process Guide (Wiki)

**Description:** Comprehensive, searchable documentation of the CA SDI claim process specifically for FedEx pilots.

**Requirements:**

| ID    | Requirement                                                                 | Priority |
| ----- | --------------------------------------------------------------------------- | -------- |
| PG-01 | Content must be organized in logical sections (Before, During, After claim) | P0       |
| PG-02 | Each section must have clear, numbered steps                                | P0       |
| PG-03 | Steps must include estimated time to complete                               | P1       |
| PG-04 | Steps must include common pitfalls/warnings                                 | P0       |
| PG-05 | Content must be full-text searchable                                        | P0       |
| PG-06 | Must support markdown formatting for easy editing                           | P1       |
| PG-07 | Must render code blocks for form field examples                             | P2       |
| PG-08 | Must support embedded images (form screenshots, etc.)                       | P1       |
| PG-09 | Must have table of contents navigation                                      | P0       |
| PG-10 | Must be mobile-responsive                                                   | P0       |
| PG-11 | Must support internal linking between sections                              | P1       |
| PG-12 | Must display "last updated" timestamp                                       | P1       |
| PG-13 | Must support versioning/revision history                                    | P2       |

**Content Sections Required:**

```
1. Overview
   1.1 How CA SDI Works
   1.2 How FedEx LTD Works
   1.3 The Offset Problem Explained
   1.4 Why This Guide Exists

2. Before You Need It (Preparation)
   2.1 Understanding Your Pay Structure
   2.2 Documenting Your Income History
   2.3 Sick Bank Strategy
   2.4 What to Save/Collect Now

3. Filing Your Claim
   3.1 When to File
   3.2 Online vs. Paper vs. In-Person
   3.3 Step-by-Step Filing Instructions
   3.4 Required Documentation
   3.5 Common Form Field Questions
   3.6 What Dates to Use (The Pilot Date Problem)

4. After Filing
   4.1 Expected Timeline
   4.2 Tracking Your Claim
   4.3 Responding to Document Requests
   4.4 What If You're Denied
   4.5 Coordinating with The Hartford

5. The Hartford (LTD) Process
   5.1 When LTD Begins
   5.2 How Offset is Calculated
   5.3 Appealing Offset Decisions
   5.4 PBRB Process (ALPA)
   5.5 Six-Month Appeal Deadline

6. In-Person EDD Office Visits
   6.1 When You Must Go In Person
   6.2 Which Office to Visit
   6.3 What Time to Arrive
   6.4 What to Bring
   6.5 What to Expect
   6.6 Building Relationships with Staff

7. Special Situations
   7.1 Living Outside California
   7.2 Living Overseas
   7.3 VA Disability Interaction
   7.4 Multiple Disability Events
   7.5 Returning to Work

8. Reference
   8.1 Glossary of Terms
   8.2 Contact Directory
   8.3 Document Templates
   8.4 Useful Links
   8.5 FAQ
```

#### 5.2.2 Interactive Checklist

**Description:** A dynamic checklist that guides users through the process step-by-step, tracking progress and providing contextual information.

**Requirements:**

| ID    | Requirement                                                        | Priority |
| ----- | ------------------------------------------------------------------ | -------- |
| CL-01 | Display checklist items with checkbox toggle                       | P0       |
| CL-02 | Checklist state must persist in browser (localStorage)             | P0       |
| CL-03 | Items must be grouped by phase (Before/During/After)               | P0       |
| CL-04 | Each item must have expandable details                             | P1       |
| CL-05 | Items must show estimated time                                     | P1       |
| CL-06 | Items must link to relevant guide sections                         | P1       |
| CL-07 | Must show overall progress percentage                              | P1       |
| CL-08 | Must support multiple checklists (e.g., for different claim types) | P2       |
| CL-09 | Must be printable as PDF                                           | P2       |
| CL-10 | Must allow reset/clear progress                                    | P1       |
| CL-11 | Should highlight current/next action                               | P2       |
| CL-12 | No account required; purely local storage                          | P0       |

**Checklist Data Structure:**

```typescript
interface ChecklistItem {
  id: string;
  phase: "preparation" | "filing" | "post-filing" | "hartford" | "in-person";
  title: string;
  description: string;
  estimatedMinutes: number;
  guideLink?: string;
  dependencies?: string[]; // IDs of items that must be completed first
  warnings?: string[];
  tips?: string[];
}

interface ChecklistState {
  items: Record<string, boolean>; // itemId -> completed
  startedAt?: string; // ISO date
  claimType: "short-term" | "long-term" | "both";
}
```

#### 5.2.3 Benefit Calculator

**Description:** Calculator to estimate CA SDI benefits, FedEx LTD benefits, and the offset impact.

**Requirements:**

| ID    | Requirement                                               | Priority |
| ----- | --------------------------------------------------------- | -------- |
| BC-01 | Calculate estimated CA SDI weekly/monthly benefit         | P0       |
| BC-02 | Calculate estimated FedEx LTD monthly benefit             | P0       |
| BC-03 | Calculate estimated Hartford offset amount                | P0       |
| BC-04 | Show net expected income during disability                | P0       |
| BC-05 | All calculations must happen client-side (no server)      | P0       |
| BC-06 | Must explain calculation methodology                      | P1       |
| BC-07 | Must show work/formula used                               | P1       |
| BC-08 | Must handle different LTD percentages (50% vs 60%)        | P0       |
| BC-09 | Must account for IRS 401(a)(17) limit ($350,000 for 2026) | P1       |
| BC-10 | Must allow input of custom quarterly income               | P1       |
| BC-11 | Results must be printable                                 | P2       |
| BC-12 | Must include disclaimer that this is an estimate          | P0       |
| BC-13 | Must update when CA SDI rates change                      | P1       |

**Calculator Inputs:**

```typescript
interface CalculatorInputs {
  // Income Information
  annualBaseSalary: number;
  averageMonthlyIncome: number; // Last 12 months
  highestQuarterlyIncome: number; // For CA SDI base period

  // Employment Details
  rank: "captain" | "first-officer";
  yearsOfService: number;

  // Disability Details
  expectedDisabilityWeeks: number;
  hasExhaustedSickBank: boolean;

  // LTD Plan Details
  ltdPercentage: 50 | 60;

  // Other Income
  vaDisabilityMonthly?: number;
  otherDisabilityIncome?: number;
}
```

**Calculator Outputs:**

```typescript
interface CalculatorOutputs {
  // CA SDI
  caSDIWeeklyBenefit: number;
  caSDIMaxWeeks: number;
  caSDITotalBenefit: number;

  // FedEx LTD
  ltdMonthlyBeforeOffset: number;
  ltdAnnualCap: number;

  // Offset & Net
  expectedMonthlyOffset: number;
  netMonthlyDuringSDI: number;
  netMonthlyAfterSDI: number;

  // Tax Impact
  annualSDITaxPaid: number;

  // Comparison
  comparisonToNonCABase: {
    monthlyDifference: number;
    sdiBureaucracyCost: "Low" | "Medium" | "High";
  };
}
```

**CA SDI Calculation Rules (2026):**

```
Weekly Benefit = (Highest Quarterly Earnings in Base Period / 13) × 0.70
Maximum Weekly Benefit (2026) = $1,681
Maximum Duration = Up to 52 weeks (varies by condition)

Base Period = 12 months, determined by claim effective date:
- Claims Jan-Mar: Use wages from Oct (2 years prior) - Sep (1 year prior)
- Claims Apr-Jun: Use wages from Jan - Dec (1 year prior)
- Claims Jul-Sep: Use wages from Apr (1 year prior) - Mar (current year)
- Claims Oct-Dec: Use wages from Jul (1 year prior) - Jun (current year)
```

**FedEx LTD Calculation Rules:**

```
Monthly Benefit = (Highest 12 consecutive months in prior 36 months / 12) × LTD%
Subject to IRS 401(a)(17) limit: $350,000 for 2026
LTD% = 60% for first 2 years, then 50%
```

#### 5.2.4 Pay Stub Translator

**Description:** Tool to convert FedEx pay stub data into a format that CA EDD staff can understand, generating a clear summary document.

**Requirements:**

| ID    | Requirement                                        | Priority |
| ----- | -------------------------------------------------- | -------- |
| PT-01 | Accept manual input of pay stub line items         | P0       |
| PT-02 | Categorize pay into EDD-understandable categories  | P0       |
| PT-03 | Generate printable summary document                | P0       |
| PT-04 | Explain pilot pay structure in EDD terms           | P1       |
| PT-05 | Calculate monthly equivalent from semi-monthly pay | P0       |
| PT-06 | Distinguish sick pay from regular pay              | P0       |
| PT-07 | All processing must be client-side                 | P0       |
| PT-08 | Support PDF upload with AI extraction (Phase 2)    | P2       |
| PT-09 | No data stored on server                           | P0       |
| PT-10 | Include explanatory notes for EDD staff            | P1       |

**Pay Categories to Handle:**

```typescript
interface PayStubEntry {
  payPeriodStart: string;
  payPeriodEnd: string;

  // Regular Compensation
  flightPay: number;
  perDiem: number;
  premiumPay: number;
  overridePay: number;

  // Time Off Pay
  vacationPay: number;
  sickPay: number;
  dsaPay: number; // Disability Sick Absence
  holidayPay: number;

  // Other
  trainingPay: number;
  miscPay: number;

  // Deductions (for reference)
  caSDIWithheld: number;
  federalTax: number;
  stateTax: number;
}
```

**Generated Output Document:**

The tool should generate a PDF or printable HTML document formatted like this:

```
═══════════════════════════════════════════════════════════════════
           FEDEX PILOT PAY SUMMARY FOR CA EDD
           [Employee Name: ________________]
           [Employee ID: ________________]
           Pay Period: [Date] to [Date]
═══════════════════════════════════════════════════════════════════

IMPORTANT NOTE FOR EDD STAFF:
Airline pilots are paid differently than traditional employees:
• We are paid per flight hour, not hourly wages
• We receive per diem for meals while traveling
• Our "regular" schedule varies month to month
• A full month of work for us is approximately 75-85 flight hours

───────────────────────────────────────────────────────────────────
PAY BREAKDOWN (This Pay Period)
───────────────────────────────────────────────────────────────────

WORK-RELATED PAY (Active Duty):
  Flight Pay:                    $XX,XXX.XX
  Per Diem (Meals/Expenses):     $X,XXX.XX
  Premium/Override Pay:          $X,XXX.XX
  ─────────────────────────────────────────
  Subtotal Work Pay:             $XX,XXX.XX

TIME-OFF PAY (Not Working):
  Vacation Pay:                  $X,XXX.XX
  Sick Pay:                      $X,XXX.XX
  Holiday Pay:                   $XXX.XX
  ─────────────────────────────────────────
  Subtotal Time-Off Pay:         $X,XXX.XX

GROSS PAY THIS PERIOD:           $XX,XXX.XX

───────────────────────────────────────────────────────────────────
MONTHLY EQUIVALENT CALCULATION
───────────────────────────────────────────────────────────────────

FedEx pilots are paid semi-monthly (twice per month).
This period represents [15/16] days of a [30/31] day month.

  This Period Gross:             $XX,XXX.XX
  × Monthly Factor:              × 2.0
  ─────────────────────────────────────────
  MONTHLY EQUIVALENT:            $XX,XXX.XX

───────────────────────────────────────────────────────────────────
QUARTERLY EARNINGS (For Base Period Calculation)
───────────────────────────────────────────────────────────────────

If you need quarterly earnings for the base period calculation,
the employee's highest quarter was:

  Q[X] 20XX:                     $XXX,XXX.XX

───────────────────────────────────────────────────────────────────
CA SDI TAX PAID (Year to Date)
───────────────────────────────────────────────────────────────────

  CA SDI Tax Rate (2026):        1.3%
  YTD CA SDI Paid:               $X,XXX.XX

═══════════════════════════════════════════════════════════════════
This summary was generated to help EDD staff understand airline
pilot compensation. For questions, contact: [HR/Payroll contact]
═══════════════════════════════════════════════════════════════════
```

#### 5.2.5 Timeline Generator

**Description:** Visual timeline showing expected dates and durations for each phase of the process based on user's specific situation.

**Requirements:**

| ID    | Requirement                                                     | Priority |
| ----- | --------------------------------------------------------------- | -------- |
| TL-01 | Generate visual timeline based on claim start date              | P1       |
| TL-02 | Show expected durations for each phase                          | P1       |
| TL-03 | Highlight critical deadlines (e.g., Hartford appeal)            | P0       |
| TL-04 | Allow adjustment based on filing method (online/mail/in-person) | P2       |
| TL-05 | Show parallel Hartford/EDD processes                            | P1       |
| TL-06 | Be printable                                                    | P2       |
| TL-07 | Include buffer time for delays                                  | P1       |

**Timeline Phases:**

```typescript
interface TimelinePhase {
  name: string;
  startOffset: number; // Days from claim start
  durationDays: number;
  varianceDays: number; // +/- uncertainty
  type: "edd" | "hartford" | "personal" | "deadline";
  isCritical: boolean;
  description: string;
}

const defaultPhases: TimelinePhase[] = [
  {
    name: "Last Day Worked",
    startOffset: 0,
    durationDays: 0,
    varianceDays: 0,
    type: "personal",
    isCritical: true,
    description: "Your disability start date for most purposes",
  },
  {
    name: "File CA SDI Claim",
    startOffset: 1,
    durationDays: 1,
    varianceDays: 7,
    type: "edd",
    isCritical: false,
    description: "Should file within 49 days of disability start",
  },
  {
    name: "EDD Processing",
    startOffset: 8,
    durationDays: 14,
    varianceDays: 21,
    type: "edd",
    isCritical: false,
    description: "EDD reviews claim and may request documents",
  },
  {
    name: "Doctor License Verification",
    startOffset: 22,
    durationDays: 10,
    varianceDays: 5,
    type: "edd",
    isCritical: false,
    description: "EDD verifies your doctor's medical license",
  },
  {
    name: "First EDD Payment",
    startOffset: 32,
    durationDays: 0,
    varianceDays: 30,
    type: "edd",
    isCritical: true,
    description: "Expected date of first CA SDI payment",
  },
  {
    name: "Hartford Offset Applied",
    startOffset: 30,
    durationDays: 0,
    varianceDays: 15,
    type: "hartford",
    isCritical: true,
    description: "Hartford begins reducing LTD by expected SDI amount",
  },
  {
    name: "Hartford Appeal Deadline",
    startOffset: 180,
    durationDays: 0,
    varianceDays: 0,
    type: "deadline",
    isCritical: true,
    description: "6 months to appeal Hartford offset decision",
  },
];
```

#### 5.2.6 Contact Directory

**Description:** Curated list of useful contacts including EDD offices, Hartford representatives, ALPA resources, and FedEx HR contacts.

**Requirements:**

| ID    | Requirement                                   | Priority |
| ----- | --------------------------------------------- | -------- |
| CD-01 | List relevant EDD office locations with hours | P1       |
| CD-02 | Include Hartford contact information          | P1       |
| CD-03 | Include ALPA resources (R&I committee, PBRB)  | P1       |
| CD-04 | Include FedEx HR/Payroll contacts             | P2       |
| CD-05 | Allow community-contributed notes (moderated) | P3       |
| CD-06 | Show best times to call                       | P2       |
| CD-07 | Include phone numbers as clickable tel: links | P1       |

**Contact Data Structure:**

```typescript
interface Contact {
  id: string;
  name: string;
  organization: "edd" | "hartford" | "alpa" | "fedex" | "other";
  type: "office" | "phone" | "person" | "website";

  // Location (for offices)
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  googleMapsUrl?: string;

  // Contact methods
  phone?: string;
  fax?: string;
  email?: string;
  website?: string;

  // Hours
  hours?: string;
  bestTimeToCall?: string;

  // Metadata
  notes?: string;
  lastVerified?: string;

  // For EDD offices
  nearestAirport?: string;
  parkingInfo?: string;
  waitTimeEstimate?: string;
}
```

#### 5.2.7 Document Templates

**Description:** Downloadable/fillable templates for common documents needed in the process.

**Requirements:**

| ID    | Requirement                                    | Priority |
| ----- | ---------------------------------------------- | -------- |
| DT-01 | Provide letter templates for common situations | P1       |
| DT-02 | Templates must be downloadable as Word/PDF     | P1       |
| DT-03 | Include fill-in-the-blank fields               | P1       |
| DT-04 | Provide Hartford appeal letter template        | P0       |
| DT-05 | Provide EDD response letter template           | P1       |
| DT-06 | Include checklists of required attachments     | P1       |

**Templates Needed:**

1. **Hartford Offset Appeal Letter**
2. **EDD Document Submission Cover Letter**
3. **EDD Missing Payment Inquiry Letter**
4. **Doctor's Certification Request (to give your doctor)**
5. **FedEx Payroll Verification Request**
6. **PBRB Request Template**

#### 5.2.8 Progress Tracker (Phase 3)

**Description:** Optional personal tracker for managing claim progress across both EDD and Hartford processes.

**Requirements:**

| ID    | Requirement                        | Priority |
| ----- | ---------------------------------- | -------- |
| PR-01 | Track claim status with EDD        | P2       |
| PR-02 | Track claim status with Hartford   | P2       |
| PR-03 | Log submitted documents with dates | P2       |
| PR-04 | Set reminders for follow-ups       | P3       |
| PR-05 | Store locally only (no server)     | P0       |
| PR-06 | Export data as JSON/CSV            | P3       |
| PR-07 | Import previously exported data    | P3       |

#### 5.2.9 Community Notes (Phase 3)

**Description:** Moderated area for pilots to share tips, updates, and experiences.

**Requirements:**

| ID    | Requirement                                          | Priority |
| ----- | ---------------------------------------------------- | -------- |
| CN-01 | Allow submission of tips/notes                       | P3       |
| CN-02 | Require moderation before publishing                 | P0       |
| CN-03 | Attribute notes anonymously or by name (user choice) | P3       |
| CN-04 | Tag notes by topic                                   | P3       |
| CN-05 | Show submission date                                 | P3       |
| CN-06 | Allow flagging outdated information                  | P3       |

---

## 6. Technical Specifications

### 6.1 Technology Stack

| Layer                | Technology                      | Rationale                                                       |
| -------------------- | ------------------------------- | --------------------------------------------------------------- |
| **Framework**        | Nuxt 3                          | Vue-based, excellent DX, supports SSG/SSR, good content support |
| **Content**          | Nuxt Content v2                 | Markdown-based content management, full-text search             |
| **UI Components**    | Nuxt UI                         | Beautiful defaults, accessible, Tailwind-based                  |
| **Styling**          | Tailwind CSS                    | Utility-first, consistent, tree-shakeable                       |
| **Icons**            | Lucide Vue                      | Consistent, comprehensive, tree-shakeable                       |
| **PDF Generation**   | jsPDF + html2canvas             | Client-side PDF creation                                        |
| **State Management** | Pinia                           | Vue 3 native, localStorage plugin available                     |
| **Hosting**          | Cloudflare Pages                | Free tier, fast, edge deployment, supports Nuxt SSR             |
| **Analytics**        | Plausible (self-hosted) or none | Privacy-respecting                                              |

### 6.2 Project Structure

```
fedex-ca-sdi-navigator/
├── .nuxt/                    # Generated Nuxt files
├── app/
│   ├── components/
│   │   ├── calculator/
│   │   │   ├── BenefitCalculator.vue
│   │   │   ├── CalculatorInput.vue
│   │   │   ├── CalculatorResults.vue
│   │   │   └── CalculatorDisclaimer.vue
│   │   ├── checklist/
│   │   │   ├── ChecklistContainer.vue
│   │   │   ├── ChecklistItem.vue
│   │   │   ├── ChecklistProgress.vue
│   │   │   └── ChecklistPhase.vue
│   │   ├── contacts/
│   │   │   ├── ContactCard.vue
│   │   │   ├── ContactDirectory.vue
│   │   │   └── ContactMap.vue
│   │   ├── guide/
│   │   │   ├── GuideNav.vue
│   │   │   ├── GuideToc.vue
│   │   │   ├── GuideSearch.vue
│   │   │   └── GuideCallout.vue
│   │   ├── paystub/
│   │   │   ├── PayStubForm.vue
│   │   │   ├── PayStubPreview.vue
│   │   │   └── PayStubExport.vue
│   │   ├── timeline/
│   │   │   ├── TimelineView.vue
│   │   │   ├── TimelineEvent.vue
│   │   │   └── TimelineForm.vue
│   │   ├── layout/
│   │   │   ├── AppHeader.vue
│   │   │   ├── AppFooter.vue
│   │   │   ├── AppSidebar.vue
│   │   │   └── AppMobileNav.vue
│   │   └── common/
│   │       ├── Disclaimer.vue
│   │       ├── LastUpdated.vue
│   │       ├── PrintButton.vue
│   │       └── FeedbackWidget.vue
│   ├── composables/
│   │   ├── useCalculator.ts
│   │   ├── useChecklist.ts
│   │   ├── useLocalStorage.ts
│   │   ├── usePdfExport.ts
│   │   └── useSearch.ts
│   ├── layouts/
│   │   ├── default.vue
│   │   ├── guide.vue
│   │   └── tool.vue
│   ├── pages/
│   │   ├── index.vue                 # Landing page
│   │   ├── guide/
│   │   │   └── [...slug].vue         # Dynamic guide pages
│   │   ├── calculator.vue            # Benefit calculator
│   │   ├── checklist.vue             # Interactive checklist
│   │   ├── paystub.vue               # Pay stub translator
│   │   ├── timeline.vue              # Timeline generator
│   │   ├── contacts.vue              # Contact directory
│   │   ├── templates.vue             # Document templates
│   │   └── about.vue                 # About/disclaimer page
│   └── utils/
│       ├── calculations.ts           # Benefit calculation logic
│       ├── constants.ts              # Tax rates, limits, etc.
│       ├── formatters.ts             # Currency, date formatting
│       └── validators.ts             # Input validation
├── content/
│   └── guide/
│       ├── 1.overview/
│       │   ├── 1.how-ca-sdi-works.md
│       │   ├── 2.how-fedex-ltd-works.md
│       │   ├── 3.offset-problem.md
│       │   └── 4.why-this-guide.md
│       ├── 2.preparation/
│       │   ├── 1.understanding-pay.md
│       │   ├── 2.documenting-income.md
│       │   ├── 3.sick-bank-strategy.md
│       │   └── 4.what-to-save.md
│       ├── 3.filing/
│       │   └── ...
│       ├── 4.post-filing/
│       │   └── ...
│       ├── 5.hartford/
│       │   └── ...
│       ├── 6.in-person/
│       │   └── ...
│       ├── 7.special-situations/
│       │   └── ...
│       └── 8.reference/
│           ├── glossary.md
│           ├── faq.md
│           └── links.md
├── data/
│   ├── checklist-items.json
│   ├── contacts.json
│   ├── timeline-defaults.json
│   └── tax-rates.json
├── public/
│   ├── favicon.ico
│   ├── og-image.png
│   └── templates/
│       ├── hartford-appeal.docx
│       ├── edd-cover-letter.docx
│       └── ...
├── nuxt.config.ts
├── tailwind.config.ts
├── package.json
└── README.md
```

### 6.3 Key Configuration Files

**nuxt.config.ts:**

```typescript
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxt/content",
    "@nuxt/ui",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/plausible", // Optional analytics
  ],

  content: {
    highlight: {
      theme: "github-dark",
      langs: ["typescript", "javascript", "json", "bash", "markdown"],
    },
    navigation: {
      fields: ["title", "description", "icon"],
    },
  },

  ui: {
    icons: ["lucide"],
  },

  app: {
    head: {
      title: "CA SDI Navigator - FedEx Pilots",
      meta: [
        {
          name: "description",
          content:
            "Guide for FedEx pilots navigating California State Disability Insurance claims",
        },
        { name: "robots", content: "noindex, nofollow" }, // Keep private initially
      ],
    },
  },

  routeRules: {
    "/": { prerender: true },
    "/guide/**": { prerender: true },
    "/calculator": { prerender: true },
    "/checklist": { prerender: true },
    "/contacts": { prerender: true },
  },

  nitro: {
    preset: "cloudflare-pages",
  },

  typescript: {
    strict: true,
  },
});
```

**tailwind.config.ts:**

```typescript
import type { Config } from "tailwindcss";

export default {
  content: [],
  theme: {
    extend: {
      colors: {
        // FedEx brand colors (optional, use subtly)
        "fedex-purple": "#4D148C",
        "fedex-orange": "#FF6600",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
```

### 6.4 Key Composables

**composables/useCalculator.ts:**

```typescript
import { ref, computed } from "vue";
import type { CalculatorInputs, CalculatorOutputs } from "~/types";
import { CA_SDI_RATES, LTD_LIMITS } from "~/utils/constants";

export function useCalculator() {
  const inputs = ref<CalculatorInputs>({
    annualBaseSalary: 0,
    averageMonthlyIncome: 0,
    highestQuarterlyIncome: 0,
    rank: "captain",
    yearsOfService: 0,
    expectedDisabilityWeeks: 12,
    hasExhaustedSickBank: false,
    ltdPercentage: 60,
    vaDisabilityMonthly: 0,
    otherDisabilityIncome: 0,
  });

  const outputs = computed<CalculatorOutputs>(() => {
    const i = inputs.value;
    const currentYear = new Date().getFullYear();
    const rate = CA_SDI_RATES[currentYear] || CA_SDI_RATES[2026];

    // CA SDI Calculation
    // Weekly benefit = (Highest quarter / 13) × 0.70, capped at max
    const weeklyBenefit = Math.min(
      (i.highestQuarterlyIncome / 13) * 0.7,
      rate.maxWeeklyBenefit,
    );
    const caSDIWeeklyBenefit = Math.round(weeklyBenefit * 100) / 100;
    const caSDIMaxWeeks = 52; // Varies by condition, use max
    const caSDIMonthlyBenefit = caSDIWeeklyBenefit * 4.33;

    // FedEx LTD Calculation
    // Highest 12 consecutive months in prior 36, divided by 12, times percentage
    // Capped at IRS 401(a)(17) limit
    const cappedAnnual = Math.min(
      i.averageMonthlyIncome * 12,
      LTD_LIMITS.irs401a17,
    );
    const ltdMonthlyBeforeOffset =
      (cappedAnnual / 12) * (i.ltdPercentage / 100);

    // Offset calculation
    const expectedMonthlyOffset = i.hasExhaustedSickBank
      ? caSDIMonthlyBenefit
      : 0;

    // Net calculations
    const netMonthlyDuringSDI =
      ltdMonthlyBeforeOffset - expectedMonthlyOffset + caSDIMonthlyBenefit;
    const netMonthlyAfterSDI = ltdMonthlyBeforeOffset;

    // Tax paid
    const annualSDITaxPaid = i.annualBaseSalary * rate.rate;

    // Comparison to non-CA base
    const monthlyDifference =
      expectedMonthlyOffset > 0 ? 0 : -annualSDITaxPaid / 12;

    return {
      caSDIWeeklyBenefit,
      caSDIMaxWeeks,
      caSDITotalBenefit:
        caSDIWeeklyBenefit * Math.min(i.expectedDisabilityWeeks, caSDIMaxWeeks),
      ltdMonthlyBeforeOffset,
      ltdAnnualCap: LTD_LIMITS.irs401a17,
      expectedMonthlyOffset,
      netMonthlyDuringSDI,
      netMonthlyAfterSDI,
      annualSDITaxPaid,
      comparisonToNonCABase: {
        monthlyDifference,
        sdiBureaucracyCost: "High" as const,
      },
    };
  });

  return {
    inputs,
    outputs,
  };
}
```

**composables/useChecklist.ts:**

```typescript
import { ref, computed, watch } from "vue";
import { useLocalStorage } from "@vueuse/core";
import checklistData from "~/data/checklist-items.json";
import type { ChecklistItem, ChecklistState } from "~/types";

export function useChecklist() {
  const items = ref<ChecklistItem[]>(checklistData);

  const state = useLocalStorage<ChecklistState>("sdi-checklist-state", {
    items: {},
    startedAt: undefined,
    claimType: "both",
  });

  const toggleItem = (id: string) => {
    state.value.items[id] = !state.value.items[id];

    if (
      !state.value.startedAt &&
      Object.values(state.value.items).some(Boolean)
    ) {
      state.value.startedAt = new Date().toISOString();
    }
  };

  const isComplete = (id: string) => !!state.value.items[id];

  const progress = computed(() => {
    const total = items.value.length;
    const completed = Object.values(state.value.items).filter(Boolean).length;
    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  });

  const itemsByPhase = computed(() => {
    const phases = [
      "preparation",
      "filing",
      "post-filing",
      "hartford",
      "in-person",
    ] as const;
    return phases.reduce(
      (acc, phase) => {
        acc[phase] = items.value.filter((item) => item.phase === phase);
        return acc;
      },
      {} as Record<string, ChecklistItem[]>,
    );
  });

  const resetChecklist = () => {
    state.value = {
      items: {},
      startedAt: undefined,
      claimType: "both",
    };
  };

  return {
    items,
    state,
    toggleItem,
    isComplete,
    progress,
    itemsByPhase,
    resetChecklist,
  };
}
```

### 6.5 Data Files

**data/tax-rates.json:**

```json
{
  "2023": {
    "rate": 0.009,
    "maxTaxableWage": 165000,
    "maxWeeklyBenefit": 1620,
    "capped": true
  },
  "2024": {
    "rate": 0.011,
    "maxTaxableWage": null,
    "maxWeeklyBenefit": 1681,
    "capped": false
  },
  "2025": {
    "rate": 0.012,
    "maxTaxableWage": null,
    "maxWeeklyBenefit": 1681,
    "capped": false
  },
  "2026": {
    "rate": 0.013,
    "maxTaxableWage": null,
    "maxWeeklyBenefit": 1681,
    "capped": false
  }
}
```

**data/checklist-items.json:**

```json
[
  {
    "id": "prep-01",
    "phase": "preparation",
    "title": "Gather last 18 months of pay stubs",
    "description": "You'll need these to document your income history for both EDD and Hartford. Digital copies are fine.",
    "estimatedMinutes": 30,
    "guideLink": "/guide/preparation/documenting-income",
    "dependencies": [],
    "warnings": [
      "FedEx pay stubs don't clearly distinguish sick pay from regular pay"
    ],
    "tips": [
      "Download from Workday before your access changes",
      "Save as PDF with dates in filename"
    ]
  },
  {
    "id": "prep-02",
    "phase": "preparation",
    "title": "Calculate your highest quarterly income",
    "description": "CA SDI benefits are based on your highest quarter of earnings in your base period.",
    "estimatedMinutes": 15,
    "guideLink": "/guide/preparation/understanding-pay",
    "dependencies": ["prep-01"],
    "warnings": [],
    "tips": ["Use the calculator tool to help with this"]
  },
  {
    "id": "filing-01",
    "phase": "filing",
    "title": "Determine your claim effective date",
    "description": "This is typically your last day worked, but can be complicated for pilots.",
    "estimatedMinutes": 10,
    "guideLink": "/guide/filing/when-to-file",
    "dependencies": [],
    "warnings": [
      "EDD uses calendar months; FedEx uses last day worked",
      "If you didn't fly in a month, EDD may consider disability starting on the 1st"
    ],
    "tips": []
  }
]
```

### 6.6 API Routes (If Needed)

For Phase 2 PDF processing with AI, add a Nitro server route:

**server/api/parse-paystub.post.ts:**

```typescript
import Anthropic from "@anthropic-ai/sdk";

export default defineEventHandler(async (event) => {
  // This would only be needed for AI-powered PDF parsing
  // All other features should be client-side only

  const config = useRuntimeConfig();
  const body = await readBody(event);

  if (!body.pdfBase64) {
    throw createError({
      statusCode: 400,
      message: "PDF data required",
    });
  }

  const anthropic = new Anthropic({
    apiKey: config.anthropicApiKey,
  });

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "document",
            source: {
              type: "base64",
              media_type: "application/pdf",
              data: body.pdfBase64,
            },
          },
          {
            type: "text",
            text: `Extract the following information from this FedEx pilot pay stub:
          - Pay period start and end dates
          - Flight pay amount
          - Per diem amount
          - Vacation pay (if any)
          - Sick pay (if any)
          - Total gross pay
          - CA SDI tax withheld
          
          Return as JSON only, no explanation.`,
          },
        ],
      },
    ],
  });

  // Parse and return structured data
  const textContent = response.content.find((c) => c.type === "text");
  if (textContent && textContent.type === "text") {
    return JSON.parse(textContent.text);
  }

  throw createError({
    statusCode: 500,
    message: "Failed to parse pay stub",
  });
});
```

---

## 7. Data Models

### 7.1 TypeScript Types

**types/index.ts:**

```typescript
// ============================================
// Calculator Types
// ============================================

export interface CalculatorInputs {
  annualBaseSalary: number;
  averageMonthlyIncome: number;
  highestQuarterlyIncome: number;
  rank: "captain" | "first-officer";
  yearsOfService: number;
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
```

---

## 8. UI/UX Requirements

### 8.1 Design Principles

| Principle           | Description                                  |
| ------------------- | -------------------------------------------- |
| **Clarity First**   | Complex information must be presented simply |
| **Trust Building**  | Professional design that inspires confidence |
| **Mobile Friendly** | Many users will access on phones             |
| **Accessible**      | WCAG 2.1 AA compliance                       |
| **Printable**       | Key pages must print cleanly                 |
| **Fast**            | < 3s initial load, instant navigation        |

### 8.2 Color Palette

Use Nuxt UI's default neutral palette with these accent considerations:

| Usage            | Color                          | Notes                       |
| ---------------- | ------------------------------ | --------------------------- |
| Primary actions  | Nuxt UI primary (customizable) | Blue or green recommended   |
| Warnings         | Amber/Yellow                   | For deadlines, pitfalls     |
| Errors/Critical  | Red                            | For critical deadlines only |
| Success          | Green                          | For completed items         |
| EDD-related      | Blue tint                      | Visual distinction          |
| Hartford-related | Purple tint                    | Visual distinction          |
| Information      | Gray                           | Neutral informational       |

### 8.3 Typography

| Element           | Specification                          |
| ----------------- | -------------------------------------- |
| Font Family       | Inter (via Fontsource or Google Fonts) |
| Body Size         | 16px base                              |
| Line Height       | 1.6 for body, 1.3 for headings         |
| Max Content Width | 768px for prose, 1200px for tools      |

### 8.4 Page Layouts

**Landing Page (index.vue):**

```
┌─────────────────────────────────────────────────────────────┐
│  Header: Logo, Nav (Guide, Calculator, Checklist, etc.)    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Hero Section                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  "Navigate CA SDI as a FedEx Pilot"                 │   │
│  │  Brief description of the problem and solution      │   │
│  │  [Get Started] [View Guide]                         │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Quick Links Cards (3-4 across)                            │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │ 📚 Guide │ │ 🧮 Calc  │ │ ✅ Check │ │ 📄 Docs  │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│                                                             │
│  Key Information Cards                                      │
│  ┌─────────────────────┐ ┌─────────────────────┐          │
│  │ Current SDI Rate    │ │ Hartford Appeal     │          │
│  │ 1.3% (2026)         │ │ 6 Month Deadline    │          │
│  └─────────────────────┘ └─────────────────────┘          │
│                                                             │
│  Recent Updates / Announcements                            │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  Footer: Disclaimer, Last Updated, Feedback Link           │
└─────────────────────────────────────────────────────────────┘
```

**Guide Page (guide/[...slug].vue):**

```
┌─────────────────────────────────────────────────────────────┐
│  Header                                                     │
├──────────────┬──────────────────────────────────────────────┤
│              │                                              │
│  Sidebar     │  Content Area                                │
│  ┌────────┐  │  ┌────────────────────────────────────────┐ │
│  │ Search │  │  │ Breadcrumbs: Guide > Filing > Step 3   │ │
│  ├────────┤  │  ├────────────────────────────────────────┤ │
│  │ 1. Ovw │  │  │                                        │ │
│  │ 2. Prep│  │  │  # Page Title                          │ │
│  │ 3. File│◄─┤  │                                        │ │
│  │ 4. Post│  │  │  Last Updated: Jan 2026                │ │
│  │ 5. Hart│  │  │                                        │ │
│  │ 6. Offi│  │  │  Content in Markdown...                │ │
│  │ 7. Spec│  │  │                                        │ │
│  │ 8. Ref │  │  │  [Callout boxes for warnings/tips]     │ │
│  └────────┘  │  │                                        │ │
│              │  │  ← Previous | Next →                   │ │
│              │  └────────────────────────────────────────┘ │
│              │                                              │
│              │  On This Page (Right TOC on desktop)        │
│              │  - Section 1                                │
│              │  - Section 2                                │
│              │  - Section 3                                │
├──────────────┴──────────────────────────────────────────────┤
│  Footer                                                     │
└─────────────────────────────────────────────────────────────┘
```

**Calculator Page (calculator.vue):**

```
┌─────────────────────────────────────────────────────────────┐
│  Header                                                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  # Benefit Calculator                                       │
│  Estimate your CA SDI and LTD benefits                     │
│                                                             │
│  ┌─────────────────────────┬───────────────────────────┐   │
│  │                         │                           │   │
│  │  Input Form             │  Results                  │   │
│  │  ─────────────          │  ───────                  │   │
│  │                         │                           │   │
│  │  Annual Income          │  CA SDI Benefit           │   │
│  │  [__________]           │  $1,234/week              │   │
│  │                         │                           │   │
│  │  Highest Quarter        │  FedEx LTD Benefit        │   │
│  │  [__________]           │  $12,345/month            │   │
│  │                         │                           │   │
│  │  Rank                   │  Expected Offset          │   │
│  │  (•) Captain            │  -$5,123/month            │   │
│  │  ( ) First Officer      │                           │   │
│  │                         │  Net During SDI           │   │
│  │  LTD Percentage         │  $12,345/month            │   │
│  │  (•) 60%  ( ) 50%       │                           │   │
│  │                         │  SDI Tax Paid (Annual)    │   │
│  │  [Calculate]            │  $6,500                   │   │
│  │                         │                           │   │
│  └─────────────────────────┴───────────────────────────┘   │
│                                                             │
│  ⚠️ Disclaimer: This is an estimate only...                │
│                                                             │
│  [Show Calculation Details]                                │
│  [Print Results]                                           │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  Footer                                                     │
└─────────────────────────────────────────────────────────────┘
```

**Checklist Page (checklist.vue):**

```
┌─────────────────────────────────────────────────────────────┐
│  Header                                                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  # Your SDI Claim Checklist                                │
│  Progress: ████████░░░░░░░░ 45% (9/20 complete)            │
│                                                             │
│  [Reset Checklist]                                         │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 📋 PREPARATION                                      │   │
│  │ ─────────────────────────────────────────────────── │   │
│  │ ☑️ Gather last 18 months of pay stubs    [30 min]  │   │
│  │    └─ ✓ Completed                                   │   │
│  │ ☑️ Calculate highest quarterly income    [15 min]  │   │
│  │    └─ ✓ Completed                                   │   │
│  │ ☐ Document your sick bank balance        [10 min]  │   │
│  │    └─ Click to expand details...                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 📝 FILING YOUR CLAIM                                │   │
│  │ ─────────────────────────────────────────────────── │   │
│  │ ☐ Determine your claim effective date    [10 min]  │   │
│  │    └─ ⚠️ Warning: EDD uses calendar months...      │   │
│  │ ☐ Gather doctor's information            [15 min]  │   │
│  │ ☐ File claim online/mail/in-person       [45 min]  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [Print Checklist]                                         │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  Footer                                                     │
└─────────────────────────────────────────────────────────────┘
```

### 8.5 Component Specifications

**Callout Component (for guide content):**

```vue
<!-- components/guide/GuideCallout.vue -->
<template>
  <div :class="['my-4 p-4 rounded-lg border-l-4', variantClasses[variant]]">
    <div class="flex items-start gap-3">
      <UIcon :name="iconMap[variant]" class="w-5 h-5 mt-0.5 flex-shrink-0" />
      <div>
        <p v-if="title" class="font-semibold mb-1">{{ title }}</p>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Variant = "info" | "warning" | "danger" | "tip" | "important";

defineProps<{
  variant: Variant;
  title?: string;
}>();

const variantClasses: Record<Variant, string> = {
  info: "bg-blue-50 border-blue-500 text-blue-900 dark:bg-blue-950 dark:text-blue-100",
  warning:
    "bg-amber-50 border-amber-500 text-amber-900 dark:bg-amber-950 dark:text-amber-100",
  danger:
    "bg-red-50 border-red-500 text-red-900 dark:bg-red-950 dark:text-red-100",
  tip: "bg-green-50 border-green-500 text-green-900 dark:bg-green-950 dark:text-green-100",
  important:
    "bg-purple-50 border-purple-500 text-purple-900 dark:bg-purple-950 dark:text-purple-100",
};

const iconMap: Record<Variant, string> = {
  info: "i-lucide-info",
  warning: "i-lucide-alert-triangle",
  danger: "i-lucide-alert-octagon",
  tip: "i-lucide-lightbulb",
  important: "i-lucide-star",
};
</script>
```

### 8.6 Responsive Breakpoints

| Breakpoint | Width          | Layout Changes                                     |
| ---------- | -------------- | -------------------------------------------------- |
| Mobile     | < 640px        | Single column, collapsed nav, stacked cards        |
| Tablet     | 640px - 1024px | Two columns where appropriate, visible nav         |
| Desktop    | > 1024px       | Full sidebar navigation, three-column guide layout |

### 8.7 Accessibility Requirements

| Requirement         | Implementation                                        |
| ------------------- | ----------------------------------------------------- |
| Keyboard Navigation | All interactive elements focusable, logical tab order |
| Screen Reader       | Proper ARIA labels, semantic HTML, skip links         |
| Color Contrast      | Minimum 4.5:1 for normal text, 3:1 for large text     |
| Focus Indicators    | Visible focus rings on all interactive elements       |
| Motion              | Respect prefers-reduced-motion                        |
| Text Scaling        | Support up to 200% zoom without horizontal scroll     |

---

## 9. Content Structure

### 9.1 Markdown Content Guidelines

All guide content should follow this front matter format:

```markdown
---
title: "How to File Your CA SDI Claim"
description: "Step-by-step instructions for filing a CA SDI claim as a FedEx pilot"
icon: "i-lucide-file-text"
lastUpdated: "2026-01-15"
tags: ["filing", "edd", "forms"]
---

# How to File Your CA SDI Claim

Brief introduction paragraph explaining what this page covers.

## When to File

Content here...

::callout{type="warning" title="Important Deadline"}
You must file within 49 days of your disability start date.
::

## Step-by-Step Instructions

### Step 1: Gather Your Information

Content...

### Step 2: Access the EDD Portal

Content...

## Common Questions

### What date should I use?

Answer...
```

### 9.2 Content Components (MDC Syntax)

Define custom components for use in Markdown:

**Callout:**

```markdown
::callout{type="warning" title="Deadline Alert"}
Content here
::
```

**Steps:**

```markdown
::steps

### Step 1

First step content

### Step 2

Second step content
::
```

**FAQ Item:**

```markdown
::faq{question="What is the offset?"}
Answer content here
::
```

### 9.3 Content Placeholders

The following content sections require input from subject matter experts (to be filled in later):

```
[PLACEHOLDER: EDD_ONLINE_PORTAL_STEPS]
- Need step-by-step screenshots of EDD online filing process
- Need exact form field recommendations for pilots

[PLACEHOLDER: EDD_OFFICE_LOCATIONS]
- Need verified addresses and hours for relevant EDD offices
- Need parking and wait time information

[PLACEHOLDER: HARTFORD_CONTACT_INFO]
- Need current Hartford claims phone numbers
- Need recommended contact strategy

[PLACEHOLDER: FEDEX_PAYROLL_CONTACT]
- Need identity of person/department at FedEx that reports to EDD
- Need contact for resolving payroll data issues

[PLACEHOLDER: ALPA_RESOURCES]
- Need current R&I committee contact information
- Need PBRB process documentation

[PLACEHOLDER: FORM_FIELD_EXAMPLES]
- Need example entries for EDD forms specific to pilots
- Need guidance on date fields for pilot schedules

[PLACEHOLDER: SUCCESS_STORIES]
- Need anonymized examples of successful claims
- Need timeline examples from real cases
```

---

## 10. Security & Privacy

### 10.1 Privacy Principles

| Principle                  | Implementation                                   |
| -------------------------- | ------------------------------------------------ |
| **No PII Storage**         | No personal information stored on servers        |
| **Client-Side Processing** | Calculators and checklists use localStorage only |
| **No Accounts**            | No user registration required                    |
| **No Tracking**            | Minimal analytics, no third-party trackers       |
| **Transparency**           | Clear privacy notice about what's stored locally |

### 10.2 Data Handling

| Data Type          | Storage Location          | Retention             |
| ------------------ | ------------------------- | --------------------- |
| Checklist progress | Browser localStorage      | Until user clears     |
| Calculator inputs  | Not stored (session only) | Cleared on page close |
| Pay stub data      | Not stored (session only) | Cleared on page close |
| Search queries     | Not stored                | N/A                   |

### 10.3 Security Measures

| Measure             | Implementation                 |
| ------------------- | ------------------------------ |
| HTTPS               | Enforced via Cloudflare        |
| CSP Headers         | Strict Content Security Policy |
| No Sensitive APIs   | No backend storing user data   |
| Dependency Auditing | Regular npm audit              |

### 10.4 Legal Disclaimers

The following disclaimers must appear prominently:

**Main Disclaimer (Footer of every page):**

> This website is an unofficial resource created by pilots for pilots. It is not affiliated with, endorsed by, or sponsored by FedEx, ALPA, The Hartford, or California EDD. Information provided is for educational purposes only and should not be construed as legal, financial, or medical advice. Always verify information with official sources and consult appropriate professionals for your specific situation.

**Calculator Disclaimer:**

> These calculations are estimates only based on publicly available formulas. Actual benefits may vary. CA SDI benefits are determined by EDD based on your specific earnings record. LTD benefits are determined by The Hartford based on your plan documents. This calculator cannot account for all variables that may affect your benefits.

**Checklist Disclaimer:**

> This checklist is a general guide based on collective experience. Your situation may require additional steps or different procedures. This is not official EDD or Hartford documentation.

---

## 11. Deployment

### 11.1 Deployment Target

**Primary:** Cloudflare Pages

**Why Cloudflare Pages:**

- Free tier sufficient for this use case
- Global edge deployment for fast loading
- Native Nuxt 3 support
- Automatic HTTPS
- Preview deployments for branches

### 11.2 Environment Configuration

**Environment Variables:**

```bash
# .env (for local development)
NUXT_PUBLIC_SITE_URL=http://localhost:3000

# Production (set in Cloudflare dashboard)
NUXT_PUBLIC_SITE_URL=https://your-domain.pages.dev

# If using AI PDF parsing (Phase 2)
ANTHROPIC_API_KEY=sk-ant-...
```

### 11.3 Build & Deploy Commands

**package.json scripts:**

```json
{
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "lint": "eslint .",
    "typecheck": "nuxt typecheck"
  }
}
```

**Cloudflare Pages Configuration:**

- Build command: `npm run build`
- Build output directory: `.output/public` (for static) or use `dist/` with SSR
- Node version: 18 or 20

### 11.4 Domain Options

1. **Cloudflare Pages subdomain:** `fedex-ca-sdi.pages.dev` (free)
2. **Custom domain:** Register and point to Cloudflare Pages
3. **Consideration:** Keep URL somewhat obscure initially to avoid unwanted attention

### 11.5 Deployment Checklist

```markdown
- [ ] Verify all placeholder content is marked clearly
- [ ] Run `npm run typecheck` - no errors
- [ ] Run `npm run lint` - no errors
- [ ] Test all calculators with edge cases
- [ ] Verify localStorage persistence works
- [ ] Test print stylesheets
- [ ] Test mobile responsiveness
- [ ] Verify all internal links work
- [ ] Check meta tags and OG images
- [ ] Review disclaimers are present
- [ ] Test with screen reader
- [ ] Lighthouse score > 90 all categories
```

---

## 12. Future Considerations

### 12.1 Phase 2 Features

| Feature             | Description                                   | Complexity |
| ------------------- | --------------------------------------------- | ---------- |
| PDF Upload          | AI-powered pay stub parsing                   | Medium     |
| n8n Integration     | Workflow automation for document processing   | Medium     |
| Email Notifications | Optional alerts for deadlines                 | Low        |
| Multi-language      | Spanish translation for some EDD interactions | Medium     |

### 12.2 Phase 3 Features

| Feature                 | Description                           | Complexity |
| ----------------------- | ------------------------------------- | ---------- |
| Community Contributions | Moderated tips and updates            | High       |
| Progress Sync           | Optional cloud sync of checklist      | Medium     |
| Mobile App              | PWA wrapper for offline access        | Low        |
| Document Vault          | Encrypted local storage for documents | High       |

### 12.3 Potential Integrations

| Integration     | Purpose                      | Feasibility         |
| --------------- | ---------------------------- | ------------------- |
| EDD API         | Direct claim status checking | Low (no public API) |
| FedEx Workday   | Auto-import pay data         | Low (no access)     |
| Calendar Export | Deadline reminders           | High                |
| Print-to-PDF    | Better PDF generation        | High                |

### 12.4 Content Expansion

- Video walkthroughs of EDD portal
- Interview transcripts from successful claimants
- Comparison with other airlines' processes
- Updates when regulations change

### 12.5 Maintenance Considerations

| Item                 | Frequency          | Responsibility        |
| -------------------- | ------------------ | --------------------- |
| SDI rate updates     | Annually (January) | Content update        |
| IRS limit updates    | Annually           | Constant update       |
| EDD process changes  | As needed          | Content update        |
| Dependency updates   | Monthly            | Technical maintenance |
| User feedback review | Weekly             | Content/UX updates    |

---

## 13. Appendix

### 13.1 Glossary of Terms

| Term              | Definition                                                                           |
| ----------------- | ------------------------------------------------------------------------------------ |
| **CA SDI**        | California State Disability Insurance - state-mandated short-term disability program |
| **EDD**           | Employment Development Department - California agency administering SDI              |
| **LTD**           | Long-Term Disability - insurance benefit provided through FedEx via The Hartford     |
| **The Hartford**  | Insurance company that administers FedEx's LTD plan                                  |
| **Offset**        | Reduction in LTD payment based on other income sources                               |
| **DSA**           | Disability Sick Absence - FedEx sick bank specifically for disability                |
| **ALPA**          | Air Line Pilots Association - pilots' union                                          |
| **R&I Committee** | Retirement and Insurance Committee within ALPA                                       |
| **PBRB**          | Pilot Benefit Review Board - ALPA process for disputing benefit decisions            |
| **Base Period**   | 12-month period used by EDD to calculate benefits                                    |
| **401(a)(17)**    | IRS code section limiting compensation used for benefit calculations                 |
| **SB951**         | California Senate Bill 951, which removed SDI tax cap in 2024                        |

### 13.2 Reference Links

| Resource              | URL                                                                                                                               |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| CA EDD SDI Homepage   | https://edd.ca.gov/en/disability/                                                                                                 |
| EDD Online Services   | https://edd.ca.gov/en/about_edd/edd-online-services/                                                                              |
| SDI Rate Information  | https://edd.ca.gov/en/payroll_taxes/rates_and_withholding/                                                                        |
| The Hartford          | https://www.thehartford.com/                                                                                                      |
| ALPA                  | https://www.alpa.org/                                                                                                             |
| IRS 401(a)(17) Limits | https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-401k-and-profit-sharing-plan-contribution-limits |

### 13.3 Revision History

| Version | Date       | Author  | Changes              |
| ------- | ---------- | ------- | -------------------- |
| 1.0     | 2026-01-11 | Initial | Initial PRD creation |

---

## Implementation Notes for AI Agents

When implementing this PRD:

1. **Start with Phase 1 features only** - Guide, Checklist, Calculator, Contacts, Templates
2. **Use placeholder content** where [PLACEHOLDER] tags appear - these will be filled by subject matter experts
3. **Prioritize mobile responsiveness** - many pilots will access on phones
4. **Keep all sensitive processing client-side** - no PII should ever reach a server
5. **Include comprehensive disclaimers** - this is not legal/financial advice
6. **Make it beautiful** - this should feel like a premium, trustworthy resource
7. **Test with realistic data** - use the salary ranges mentioned in the context ($350k-$500k)
8. **Ensure printability** - many users will print guides and checklists

The goal is a resource that saves pilots dozens of hours and potentially thousands of dollars in lost benefits due to administrative confusion.
