# Updates from initial PRD

# California SDI Claim Process Research

Based on the official EDD disability claim process, here's comprehensive information to make your implementation more realistic.

---

## 1. Eligibility Requirements

### Basic Eligibility Criteria

| Requirement               | Details                                                                                                         |
| ------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Employment Status**     | Must be employed or actively looking for work at time disability began                                          |
| **Earnings Requirement**  | Must have earned at least $300 in wages during the base period                                                  |
| **Medical Certification** | Must be unable to do regular or customary work for at least 8 consecutive days                                  |
| **Under Care**            | Must be under the care and treatment of a licensed physician/practitioner during the first 8 days of disability |
| **SDI Coverage**          | Must have had SDI deductions withheld from paycheck (or be covered by Elective Coverage)                        |

### Base Period Definition

The base period is a specific 12-month period that determines both eligibility and benefit amount:

| Claim Start Month  | Base Period Used                                  |
| ------------------ | ------------------------------------------------- |
| January - March    | October through September (15-18 months prior)    |
| April - June       | January through December (previous calendar year) |
| July - September   | April through March (4-15 months prior)           |
| October - December | July through June (4-15 months prior)             |

**Example for a pilot filing in January 2026:**

- Base period = October 1, 2024 - September 30, 2025
- EDD looks at wages reported during those quarters

---

## 2. Filing Process

### Methods to File

| Method         | Details                                      | Best For                                   |
| -------------- | -------------------------------------------- | ------------------------------------------ |
| **SDI Online** | https://edd.ca.gov/en/disability/sdi-online/ | Most claimants; fastest processing         |
| **By Mail**    | Paper form DE 2501                           | Those without internet; overseas claimants |
| **By Phone**   | 1-800-480-3287                               | Assistance with filing; status checks      |

### Filing Deadline

> **Critical:** Claims must be filed within **49 days** of the date your disability began. Late claims may result in loss of benefits.

### Online Filing Process (SDI Online)

**Step 1: Create/Access Account**

- Create a myEDD account at https://myedd.edd.ca.gov
- Verify identity through ID.me
- Link SDI Online to your myEDD account

**Step 2: Start Your Claim**

- Log in to SDI Online
- Select "File a New Disability Claim"
- Enter your personal information

**Step 3: Provide Employment Information**

- Current and recent employers (last 18 months)
- Last day worked
- Expected return to work date (if known)

**Step 4: Provide Medical Information**

- Physician/practitioner name and contact
- Medical license number
- Diagnosis (general description)
- Date disability began

**Step 5: Submit and Provide Physician Certification**

- Physician must complete their portion online or via mail
- Can provide physician with claim receipt number
- Physician has 49 days to certify

### Required Information for Filing

```
Personal Information:
├── Social Security Number
├── Date of Birth
├── Mailing Address
├── Phone Number
├── Email Address
└── Preferred Language

Employment Information:
├── Last Employer Name and Address
├── Last Day Worked
├── Employment Status (still employed, terminated, etc.)
├── Reason for Not Working
└── Other Income Sources (if any)

Medical Information:
├── Treating Physician Name
├── Physician Address and Phone
├── Physician License Number
├── Date Disability Began
├── Description of Disability
└── Expected Duration
```

---

## 3. Physician/Practitioner Certification

### Who Can Certify

| Practitioner Type         | License Required                            |
| ------------------------- | ------------------------------------------- |
| Medical Doctor (MD)       | Medical license                             |
| Doctor of Osteopathy (DO) | Medical license                             |
| Nurse Practitioner        | NP license (in specified scope)             |
| Physician Assistant       | PA license (under MD supervision)           |
| Chiropractor              | DC license (for musculoskeletal only)       |
| Psychologist              | Psychology license (for mental health)      |
| Dentist/Oral Surgeon      | DDS license (for dental procedures)         |
| Podiatrist                | DPM license (for foot/ankle)                |
| Optometrist               | OD license (for eye conditions)             |
| Nurse Midwife             | CNM license (for pregnancy-related)         |
| Acupuncturist             | Licensed acupuncturist (limited conditions) |

### Certification Process

**Online (Preferred):**

1. Claimant provides physician with Claim Receipt Number
2. Physician logs into SDI Online for Physicians portal
3. Physician completes medical certification section
4. Physician certifies disability dates and limitations

**By Mail:**

1. EDD mails DE 2501 Part B to physician
2. Physician completes and returns
3. Takes significantly longer (7-14 days mail time each way)

### What Physicians Must Certify

- Date disability began
- Date disability is expected to end (or "indefinite")
- Diagnosis
- ICD-10 diagnostic code
- Whether patient can perform any work
- Restrictions/limitations
- Treatment plan

---

## 4. Benefit Calculation

### Weekly Benefit Amount (WBA) Formula

```
WBA = (Highest Quarter Wages ÷ 13) × Wage Replacement Rate
```

### Wage Replacement Rates (2024-2026)

| Income Level        | Replacement Rate     |
| ------------------- | -------------------- |
| Lower wage earners  | Up to 70%            |
| Higher wage earners | Approximately 60-70% |

**Simplified Calculation:**

- Take your highest-earning quarter in the base period
- Divide by 13 (weeks in a quarter)
- Multiply by 0.70 (70%)
- Compare to maximum WBA

### Maximum Weekly Benefit Amounts

| Year | Maximum WBA                  |
| ---- | ---------------------------- |
| 2024 | $1,620                       |
| 2025 | $1,681                       |
| 2026 | $1,681 (verify—may increase) |

### Waiting Period

- **7-day waiting period** before benefits begin
- You are not paid for the first 7 days of disability
- If claim extends beyond 14 days, waiting period is paid retroactively

### Benefit Duration

| Situation                         | Maximum Duration                               |
| --------------------------------- | ---------------------------------------------- |
| Standard disability               | Up to 52 weeks                                 |
| Pregnancy (without complications) | Up to 4 weeks before, 6-8 weeks after delivery |
| Some extended conditions          | May be extended with medical necessity         |

---

## 5. After Filing: What to Expect

### Timeline Overview

```
Day 0:   Last day worked / Disability begins
         ↓
Days 1-7: File claim (ideally within first week)
         ↓
Days 1-14: Physician certifies claim (critical step)
         ↓
Days 14-21: EDD reviews claim, may request additional info
         ↓
Days 21-28: Eligibility determination
         ↓
~Day 28+: First payment issued (if approved)
         ↓
Every 2 weeks: Continued claim certification required
```

### Claim Status Tracking

**Online:** Log in to SDI Online to view:

- Claim status
- Payment history
- Required actions
- Correspondence from EDD

**By Phone:** 1-800-480-3287

- Hours: 8 AM - 5 PM Pacific, Monday-Friday
- Have SSN and claim information ready
- Long wait times common

### Common Status Messages

| Status                               | Meaning                               |
| ------------------------------------ | ------------------------------------- |
| **Pending**                          | Claim received, under review          |
| **Incomplete**                       | Missing information required          |
| **Physician Certification Needed**   | Doctor hasn't certified yet           |
| **Additional Information Requested** | EDD needs more documentation          |
| **Approved - Payment Pending**       | Approved, awaiting payment processing |
| **Paid**                             | Payment issued                        |
| **Denied**                           | Claim denied (can appeal)             |

---

## 6. Continued Claims

### Ongoing Certification Requirements

If your disability extends beyond the initial certification period:

1. **Continued Claim Certifications** - Every 2 weeks, you must certify you're still disabled
2. **Physician Re-certification** - May be required every 1-3 months depending on condition
3. **Return to Work Reporting** - Must report any return to work, even partial

### How to Certify for Continued Benefits

**SDI Online:**

1. Log in when certification period opens
2. Answer questions about current disability status
3. Report any work or income
4. Submit certification

**Auto-fill option:** Can set up automatic certification for stable conditions

---

## 7. Common Issues and Delays

### Frequent Causes of Delays

| Issue                           | Impact                    | Solution                                        |
| ------------------------------- | ------------------------- | ----------------------------------------------- |
| Physician hasn't certified      | Claim cannot be processed | Contact physician; provide claim receipt number |
| Wage information not on file    | Cannot calculate benefits | Employer must submit wage reports               |
| Incomplete information          | Claim returned            | Check SDI Online for required items             |
| Identity verification           | Claim held                | Complete ID.me verification                     |
| Employer disputes claim         | Investigation required    | Provide documentation                           |
| Conflicting medical information | Medical review            | May need additional physician statement         |

### Tips to Avoid Delays

1. **File immediately** when disability begins (don't wait)
2. **Use SDI Online** (faster than mail)
3. **Provide complete information** first time
4. **Give physician claim receipt number** same day you file
5. **Follow up with physician** to ensure they certify promptly
6. **Check SDI Online regularly** for requests
7. **Respond to requests within 10 days**

---

## 8. Appeals Process

### If Your Claim is Denied

| Step                       | Timeframe                | Action                                |
| -------------------------- | ------------------------ | ------------------------------------- |
| 1. Review denial letter    | Immediately              | Understand reason for denial          |
| 2. Gather evidence         | 1-2 weeks                | Medical records, physician statements |
| 3. File appeal             | Within 30 days of denial | Complete DE 1000A form                |
| 4. EDD Review              | 30-60 days               | EDD reconsiders with new information  |
| 5. ALJ Hearing (if needed) | 60-90 days               | Administrative Law Judge reviews case |

### Appeal Methods

- **Online:** Through SDI Online portal
- **Mail:** DE 1000A form to address on denial letter
- **In Person:** At local EDD office

---

## 9. Payment Methods

### How Benefits Are Paid

| Method                               | Details                                   |
| ------------------------------------ | ----------------------------------------- |
| **EDD Debit Card** (Bank of America) | Default method; card mailed automatically |
| **Direct Deposit**                   | Must enroll; faster receipt               |
| **Check**                            | Available by request; slowest             |

### Payment Schedule

- Benefits paid every two weeks
- Payment issued within 24-48 hours of certification approval
- EDD Debit Card: Funds available immediately
- Direct Deposit: 1-2 business days after issue
- Check: 5-7 business days after issue

---

## 10. Pilot-Specific Considerations

Based on the Signal thread and EDD process, here are the key friction points for pilots:

### Pay Structure Issues

| Pilot Reality                   | EDD Assumption       | Friction                          |
| ------------------------------- | -------------------- | --------------------------------- |
| Semi-monthly pay                | Monthly or bi-weekly | Calculation confusion             |
| Variable hours per month        | Consistent schedule  | "Regular" pay undefined           |
| Per diem (non-taxable)          | All pay is wages     | May or may not count              |
| Trip pay, override, premium     | Simple hourly/salary | Multiple line items confuse       |
| Sick pay looks like regular pay | Clear distinction    | FedEx data shows all as "regular" |
| May not fly every day of month  | Daily work expected  | "Last day worked" ambiguous       |

### Date Confusion

| Scenario                         | Pilot Reality                | EDD Interpretation                        |
| -------------------------------- | ---------------------------- | ----------------------------------------- |
| Pilot doesn't fly in September   | Last flight was August 28    | Disability starts September 1? August 28? |
| Pilot was on vacation, then sick | Last actual work day unclear | Vacation ≠ work but wasn't disabled       |
| Pilot on reserve, never called   | "Working" but no flights     | Technical employment status               |

### Required Documentation Workarounds

**For EDD Staff Understanding:**

Create a cover letter explaining:

```
To: California EDD Claims Processor
Re: Disability Claim for [Name], SSN ending [XXXX]

I am a commercial airline pilot employed by Federal Express (FedEx).
My pay structure differs from typical employees:

1. PAY FREQUENCY: I am paid semi-monthly (twice per month)

2. PAY COMPONENTS:
   - Flight Pay: Compensation for hours flown
   - Per Diem: Non-taxable meal allowance while traveling
   - Override/Premium: Additional compensation for specific duties
   - Vacation/Sick: Paid time off (appears as "regular pay" in FedEx systems)

3. WORK SCHEDULE: I work approximately 12-18 days per month,
   not 5 days per week. A "full month" of work is ~75-85 flight hours.

4. LAST DAY WORKED: My last day physically working was [DATE].
   This was my last day flying or on duty.

5. INCOME CALCULATION: My highest quarterly earnings were $XXX,XXX
   in Q[X] 20XX. See attached pay stubs for verification.

Please contact me at [PHONE/EMAIL] if clarification is needed.
```

---

## 11. Updates for Your Implementation

### Checklist Updates

Add these items to `data/checklist-items.json`:

```json
[
  {
    "id": "filing-00",
    "phase": "filing",
    "title": "Create or verify myEDD account",
    "description": "You'll need a myEDD account linked to SDI Online. This requires ID.me identity verification which can take 1-2 days if issues arise.",
    "estimatedMinutes": 20,
    "guideLink": "/guide/filing/online-account",
    "dependencies": [],
    "warnings": [
      "ID.me verification can be delayed if your ID doesn't match exactly",
      "Have a valid government ID ready for verification"
    ],
    "tips": [
      "Do this BEFORE you need to file—set up account while healthy",
      "Use the same email you use for other important accounts"
    ]
  },
  {
    "id": "filing-02",
    "phase": "filing",
    "title": "Provide claim receipt number to your physician",
    "description": "After filing, you'll receive a claim receipt number. Your doctor needs this to certify your claim online. Do this the same day you file.",
    "estimatedMinutes": 10,
    "guideLink": "/guide/filing/physician-certification",
    "dependencies": ["filing-01"],
    "warnings": [
      "Your claim CANNOT be processed until physician certifies",
      "This is the #1 cause of delays"
    ],
    "tips": [
      "Text or email physician's office immediately after filing",
      "Confirm they've certified within 48 hours",
      "Follow up at 72 hours if not certified"
    ]
  },
  {
    "id": "filing-03",
    "phase": "filing",
    "title": "Prepare pilot pay explanation cover letter",
    "description": "Create a clear explanation of airline pilot pay structure to include with your documentation. EDD staff may not understand flight pay, per diem, etc.",
    "estimatedMinutes": 30,
    "guideLink": "/guide/filing/pay-explanation",
    "dependencies": ["prep-01"],
    "warnings": [
      "FedEx's data to EDD shows all pay as 'regular pay' even when it's sick time",
      "This confusion can delay your claim"
    ],
    "tips": [
      "Use our Pay Stub Translator tool to generate this letter",
      "Keep it to one page",
      "Include your contact information for questions"
    ]
  },
  {
    "id": "post-01",
    "phase": "post-filing",
    "title": "Check claim status after 5 business days",
    "description": "Log in to SDI Online to verify your claim is processing and no additional information is needed.",
    "estimatedMinutes": 10,
    "guideLink": "/guide/post-filing/tracking",
    "dependencies": ["filing-01"],
    "warnings": [
      "Don't wait for EDD to contact you—check proactively",
      "Requests for information may be buried in the portal"
    ],
    "tips": [
      "Set a calendar reminder",
      "Check both 'Messages' and 'Required Actions' sections"
    ]
  },
  {
    "id": "post-02",
    "phase": "post-filing",
    "title": "Verify physician certification completed",
    "description": "Confirm in SDI Online that your physician's certification has been received. If not, follow up with physician immediately.",
    "estimatedMinutes": 15,
    "guideLink": "/guide/post-filing/physician-status",
    "dependencies": ["filing-02"],
    "warnings": [
      "Claim cannot proceed without physician certification",
      "Some physicians don't realize they need to take action"
    ],
    "tips": [
      "Call physician's office and ask specifically if they completed the SDI form",
      "Offer to walk them through the online portal if needed"
    ]
  },
  {
    "id": "post-03",
    "phase": "post-filing",
    "title": "Set up direct deposit for faster payments",
    "description": "Enroll in direct deposit through SDI Online to receive payments 1-2 days faster than EDD debit card.",
    "estimatedMinutes": 10,
    "guideLink": "/guide/post-filing/payment-setup",
    "dependencies": ["filing-01"],
    "warnings": [],
    "tips": [
      "Have bank routing and account numbers ready",
      "Verify account is in your name"
    ]
  },
  {
    "id": "post-04",
    "phase": "post-filing",
    "title": "Calendar continued claim certification dates",
    "description": "You must certify every 2 weeks that you're still disabled. Missing a certification can stop your payments.",
    "estimatedMinutes": 5,
    "guideLink": "/guide/post-filing/continued-claims",
    "dependencies": ["filing-01"],
    "warnings": [
      "Missing certification = no payment",
      "You have a limited window to certify each period"
    ],
    "tips": [
      "Set recurring calendar reminders",
      "Certification can be done online in 5 minutes"
    ]
  }
]
```

### Timeline Updates

Update `data/timeline-defaults.json`:

```json
{
  "phases": [
    {
      "id": "disability-start",
      "name": "Disability Begins",
      "startOffset": 0,
      "durationDays": 0,
      "varianceDays": 0,
      "type": "personal",
      "isCritical": true,
      "description": "Your last day worked or date disability began. This is Day 0 for all timeline calculations."
    },
    {
      "id": "waiting-period",
      "name": "7-Day Waiting Period",
      "startOffset": 0,
      "durationDays": 7,
      "varianceDays": 0,
      "type": "edd",
      "isCritical": false,
      "description": "You are not paid for the first 7 days. If disability lasts 14+ days, this is paid retroactively."
    },
    {
      "id": "file-claim",
      "name": "File CA SDI Claim",
      "startOffset": 1,
      "durationDays": 1,
      "varianceDays": 3,
      "type": "personal",
      "isCritical": true,
      "description": "File your claim online via SDI Online. Must be filed within 49 days of disability start."
    },
    {
      "id": "physician-certification",
      "name": "Physician Certifies Claim",
      "startOffset": 1,
      "durationDays": 3,
      "varianceDays": 7,
      "type": "personal",
      "isCritical": true,
      "description": "Your physician must complete their certification. This is often the biggest delay. Follow up within 48 hours."
    },
    {
      "id": "edd-initial-review",
      "name": "EDD Initial Review",
      "startOffset": 5,
      "durationDays": 10,
      "varianceDays": 7,
      "type": "edd",
      "isCritical": false,
      "description": "EDD reviews your claim for completeness. May request additional information."
    },
    {
      "id": "edd-info-request",
      "name": "Possible: EDD Requests Information",
      "startOffset": 10,
      "durationDays": 5,
      "varianceDays": 10,
      "type": "edd",
      "isCritical": false,
      "description": "EDD may request wage verification, doctor's license info, or other documentation. Check SDI Online regularly."
    },
    {
      "id": "license-verification",
      "name": "Doctor License Verification",
      "startOffset": 15,
      "durationDays": 10,
      "varianceDays": 5,
      "type": "edd",
      "isCritical": false,
      "description": "EDD verifies your doctor's medical license. Standard processing time is 7-10 business days."
    },
    {
      "id": "eligibility-determination",
      "name": "Eligibility Determination",
      "startOffset": 20,
      "durationDays": 7,
      "varianceDays": 7,
      "type": "edd",
      "isCritical": false,
      "description": "EDD determines benefit amount based on your wage history."
    },
    {
      "id": "first-payment-approved",
      "name": "First Payment Issued",
      "startOffset": 28,
      "durationDays": 0,
      "varianceDays": 14,
      "type": "edd",
      "isCritical": true,
      "description": "If approved, first payment issued. Covers period from end of waiting period to current date."
    },
    {
      "id": "hartford-notification",
      "name": "Notify The Hartford",
      "startOffset": 7,
      "durationDays": 1,
      "varianceDays": 0,
      "type": "hartford",
      "isCritical": true,
      "description": "If you expect to go on LTD, notify The Hartford of your disability. Start their process in parallel."
    },
    {
      "id": "hartford-offset-begins",
      "name": "Hartford May Begin Offset",
      "startOffset": 90,
      "durationDays": 0,
      "varianceDays": 30,
      "type": "hartford",
      "isCritical": true,
      "description": "When LTD begins, Hartford will offset by expected CA SDI amount—even if you haven't received it yet."
    },
    {
      "id": "continued-certification-1",
      "name": "First Continued Claim Certification",
      "startOffset": 14,
      "durationDays": 0,
      "varianceDays": 0,
      "type": "personal",
      "isCritical": true,
      "description": "Certify you're still disabled. Must do this every 2 weeks to continue receiving benefits."
    },
    {
      "id": "filing-deadline",
      "name": "DEADLINE: Claim Must Be Filed",
      "startOffset": 49,
      "durationDays": 0,
      "varianceDays": 0,
      "type": "deadline",
      "isCritical": true,
      "description": "Absolute deadline to file initial claim. Claims filed after 49 days may be denied."
    },
    {
      "id": "hartford-appeal-deadline",
      "name": "DEADLINE: Hartford Appeal",
      "startOffset": 180,
      "durationDays": 0,
      "varianceDays": 0,
      "type": "deadline",
      "isCritical": true,
      "description": "You have 6 months from Hartford's offset decision to file an appeal. Do not miss this deadline."
    }
  ],
  "filingMethodAdjustments": {
    "online": {
      "multiplier": 1.0,
      "notes": "Fastest processing; recommended"
    },
    "mail": {
      "multiplier": 1.5,
      "notes": "Add 7-14 days for mail each direction"
    },
    "in-person": {
      "multiplier": 0.8,
      "notes": "Can resolve issues same day but requires significant time investment"
    }
  },
  "locationAdjustments": {
    "inCalifornia": {
      "multiplier": 1.0,
      "notes": "Can visit EDD office if needed"
    },
    "outOfState": {
      "multiplier": 1.3,
      "notes": "Mail delays; harder to resolve issues"
    },
    "overseas": {
      "multiplier": 2.0,
      "notes": "Significant mail delays; phone time zone challenges"
    }
  }
}
```

### Calculator Constants Updates

Update `utils/constants.ts`:

```typescript
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
    maxTaxableWage: null, // Uncapped
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
    maxWeeklyBenefit: 1681, // Verify for 2026
    capped: false,
  },
};

export const SDI_BENEFIT_CALCULATION = {
  wageReplacementRate: 0.7, // 70% of wages
  waitingPeriodDays: 7,
  maxDurationWeeks: 52,
  weeksPerQuarter: 13,
};

export const LTD_LIMITS = {
  irs401a17_2024: 345000,
  irs401a17_2025: 350000,
  irs401a17_2026: 350000, // Verify for 2026
  percentageYear1_2: 60,
  percentageYear3Plus: 50,
};

export const BASE_PERIOD_LOOKUP: Record<string, string> = {
  Q1: "October - September (15-18 months prior)",
  Q2: "January - December (previous calendar year)",
  Q3: "April - March (4-15 months prior)",
  Q4: "July - June (4-15 months prior)",
};

export const EDD_CONTACT = {
  phone: "1-800-480-3287",
  phoneHours: "8 AM - 5 PM Pacific, Monday - Friday",
  sdiOnlineUrl: "https://edd.ca.gov/en/disability/sdi-online/",
  claimStatusUrl: "https://edd.ca.gov/en/disability/DI_Claim_Process/",
  formsUrl: "https://edd.ca.gov/en/disability/DI_Forms_and_Publications/",
};

export const KEY_DEADLINES = {
  filingDeadlineDays: 49,
  physicianCertificationDays: 49,
  hartfordAppealMonths: 6,
  continuedClaimIntervalDays: 14,
  informationResponseDays: 10,
};

export const PILOT_PAY_CATEGORIES = {
  workPay: ["flightPay", "perDiem", "premiumPay", "overridePay", "trainingPay"],
  timeOffPay: ["vacationPay", "sickPay", "dsaPay", "holidayPay"],
  deductions: ["caSDIWithheld", "federalTax", "stateTax"],
};
```

### New Guide Content Files

Create these markdown files in `content/guide/`:

**content/guide/3.filing/1.when-to-file.md:**

```markdown
---
title: "When to File Your CA SDI Claim"
description: "Understanding timing and deadlines for filing your California disability claim"
icon: "i-lucide-calendar"
---

# When to File Your CA SDI Claim

## The 49-Day Rule

::callout{type="danger" title="Critical Deadline"}
You must file your claim within **49 days** of your disability start date. Claims filed after this deadline may be denied, and you could lose benefits permanently.
::

## File Immediately

**Best Practice:** File your claim within the first week of your disability, ideally the same day or next day.

Why file immediately?

- Processing takes time regardless of when you file
- Earlier filing = earlier first payment
- Gives you buffer time if issues arise
- Physician certification can begin sooner

## What Date to Use

This is where it gets complicated for pilots.

### EDD's Expectation

EDD expects you to provide the date you stopped working due to your disability.

### Pilot Reality

You may not work every day. Your schedule varies. What counts as your "last day worked"?

| Scenario                                      | What Date to Use                                                |
| --------------------------------------------- | --------------------------------------------------------------- |
| You were flying and became unable to continue | Last day you actually flew                                      |
| You finished a trip and then got sick         | Last day of that trip                                           |
| You were on reserve and never called          | Last day of your reserve block                                  |
| You were on vacation and then got sick        | Last day before vacation (you weren't disabled during vacation) |
| You were on scheduled days off and got sick   | Your last duty day before days off                              |

::callout{type="warning" title="Calendar Month Confusion"}
EDD staff may interpret your disability start date differently than you intend. If you didn't fly at all during a calendar month, they may record your disability as starting on the 1st of that month, even if your last flight was the 28th of the prior month.

Document your last actual duty day clearly in your application.
::

## Pilot-Specific Date Example

**Scenario:** Captain Smith's last trip ended August 15. He was scheduled for vacation August 16-31. He developed symptoms during vacation and saw a doctor on August 25. He was scheduled to return to flying September 3.

**Disability Start Date:** This is debatable, but defensible options:

- **August 25** (first day of medical incapacity, per doctor)
- **September 3** (first day he couldn't perform scheduled work)

**NOT August 16** (he wasn't disabled; he was on scheduled vacation)

**Recommendation:** Use the date your physician certifies as the start of your disability. Discuss this with your doctor before filing.

[PLACEHOLDER: ADD MORE SPECIFIC EXAMPLES FROM PILOT EXPERIENCES]
```

**content/guide/3.filing/2.online-account.md:**

```markdown
---
title: "Setting Up Your SDI Online Account"
description: "Create and configure your myEDD and SDI Online accounts before you need them"
icon: "i-lucide-user-plus"
---

# Setting Up Your SDI Online Account

::callout{type="tip" title="Pro Tip"}
Set up your account **before** you need it. Don't wait until you're sick or injured to navigate account creation. Do it now while you're healthy.
::

## Step 1: Create a myEDD Account

1. Go to [myEDD](https://myedd.edd.ca.gov)
2. Click "Register" to create a new account
3. Enter your:
   - Email address (use a reliable personal email, not work email)
   - Create a password
   - Security questions

## Step 2: Complete ID.me Verification

EDD uses ID.me for identity verification. This is a one-time process but can take time.

### What You'll Need

- Valid government-issued photo ID (driver's license or passport)
- Smartphone or computer with camera
- Good lighting for photos
- Your Social Security Number
- Patience (this process can be frustrating)

### Verification Methods

| Method                      | Time Required                  | Success Rate        |
| --------------------------- | ------------------------------ | ------------------- |
| Self-Service (photo upload) | 10-15 minutes                  | High if ID is clear |
| Video Call                  | 30-60 minutes (including wait) | Very high           |
| In-Person                   | Varies                         | Highest             |

### Common ID.me Issues

::callout{type="warning" title="Name Mismatches"}
Your name on ID.me must match your government ID **exactly**. If your pilot certificate says "ROBERT JAMES SMITH" but your driver's license says "BOB J SMITH," you may have issues. Use the name exactly as shown on your photo ID.
::

## Step 3: Link SDI Online

Once your myEDD account is verified:

1. Log in to myEDD
2. Look for "SDI Online" in available services
3. Click to link/register for SDI Online
4. Complete any additional verification steps

## Step 4: Verify Your Account Works

After setup:

1. Log in to SDI Online
2. Verify you can access the main dashboard
3. Check that your personal information is correct
4. Note where "File a New Claim" option is located

## Troubleshooting

| Problem                        | Solution                                       |
| ------------------------------ | ---------------------------------------------- |
| ID.me won't verify my identity | Try video call option; have multiple IDs ready |
| Can't link SDI Online          | Call EDD at 1-800-480-3287                     |
| Password issues                | Use password reset; check spam folder          |
| Account locked                 | Wait 24 hours or call EDD                      |

[PLACEHOLDER: ADD SCREENSHOTS OF SDI ONLINE INTERFACE]
```

**content/guide/3.filing/3.physician-certification.md:**

```markdown
---
title: "Physician Certification: The Critical Step"
description: "How to ensure your doctor completes their part quickly"
icon: "i-lucide-stethoscope"
---

# Physician Certification: The Critical Step

::callout{type="danger" title="Most Common Cause of Delays"}
The #1 reason claims are delayed is that physicians don't complete their certification promptly—or at all. You must actively manage this process.
::

## How It Works

When you file your SDI claim, you provide your physician's information. EDD then contacts your physician to certify that:

1. You are under their care
2. You have a medical condition that prevents you from working
3. The expected duration of your disability
4. Any work restrictions

Your claim **cannot be processed** until this certification is received.

## Getting Your Claim Receipt Number

After you submit your claim online, you'll receive a **Claim Receipt Number**. This is critical.

**Save this number and immediately provide it to your physician.**

Your physician needs this number to:

- Access the online certification portal
- Link their certification to your claim
- Complete the process electronically

## How Physicians Certify

### Online (Fastest)

1. Physician goes to SDI Online for Physicians portal
2. Enters your claim receipt number
3. Completes medical certification form
4. Submits electronically

Processing time: Usually 1-2 business days

### By Mail (Slowest)

1. EDD mails paper form to physician (7-10 days)
2. Physician completes and mails back (7-10 days)
3. EDD processes paper form (5-10 days)

Processing time: 3-4 weeks minimum

::callout{type="tip" title="Push for Online Certification"}
Encourage your physician's office to certify online. Many offices are unfamiliar with the process—offer to help walk them through it if needed.
::

## What Physicians Need to Provide

| Information           | Notes                            |
| --------------------- | -------------------------------- |
| Diagnosis             | General description of condition |
| ICD-10 Code           | Standard diagnostic code         |
| Disability Start Date | Date you became unable to work   |
| Expected End Date     | Estimate or "indefinite"         |
| Treatment Plan        | Ongoing care description         |
| Work Restrictions     | What you cannot do               |

## Managing Your Physician

### Day 0 (Day You File)

- File your claim online
- Immediately call/text/email physician's office
- Provide claim receipt number
- Ask them to certify today if possible

### Day 2 (48 Hours After Filing)

- Log in to SDI Online
- Check if physician certification shows as received
- If not, call physician's office and ask status

### Day 4 (If Still Not Certified)

- Call physician's office directly
- Ask to speak with whoever handles disability paperwork
- Offer to help them access the online portal
- Get a commitment on when they'll complete it

### Day 7 (If Still Not Certified)

- Escalate with physician's office
- Consider whether physician can certify or if you need to see another provider
- Document all contacts

## Common Physician Issues

| Issue                          | Solution                                       |
| ------------------------------ | ---------------------------------------------- |
| "We've never done this before" | Walk them through SDI Online for Physicians    |
| "We mailed the form"           | Ask them to also do online version             |
| "Doctor is out of the office"  | Ask if nurse practitioner or PA can certify    |
| "We need your authorization"   | Most authorizations are included in your claim |
| "The system isn't working"     | Have them call EDD at 1-800-480-3287           |

## If Your Physician Won't Certify

Rare, but it happens. Options:

1. Ask them directly why they won't certify
2. Get a second opinion from another physician
3. Switch to a physician who will provide proper documentation
4. Note: EDD may question a last-minute physician change

[PLACEHOLDER: ADD PHYSICIAN CHECKLIST AND CONTACT TEMPLATES]
```

---

## 12. Key Contact Information to Add

Add to `data/contacts.json`:

```json
[
  {
    "id": "edd-main",
    "name": "EDD Disability Insurance Main Line",
    "organization": "edd",
    "type": "phone",
    "phone": "1-800-480-3287",
    "hours": "8 AM - 5 PM Pacific, Monday - Friday",
    "bestTimeToCall": "Early morning (8 AM) or late afternoon (after 4 PM) typically have shorter waits",
    "notes": "Expect 30-60+ minute wait times. Have your SSN and claim information ready.",
    "lastVerified": "2026-01-11"
  },
  {
    "id": "sdi-online",
    "name": "SDI Online Portal",
    "organization": "edd",
    "type": "website",
    "website": "https://edd.ca.gov/en/disability/sdi-online/",
    "notes": "File claims, check status, certify for continued benefits, update information",
    "lastVerified": "2026-01-11"
  },
  {
    "id": "edd-oakland",
    "name": "EDD Office - Oakland",
    "organization": "edd",
    "type": "office",
    "address": "[PLACEHOLDER: VERIFY ADDRESS]",
    "city": "Oakland",
    "state": "CA",
    "nearestAirport": "OAK",
    "hours": "8 AM - 5 PM, Monday - Friday",
    "waitTimeEstimate": "Arrive before 9 AM or expect 3-5 hour wait",
    "parkingInfo": "[PLACEHOLDER: NEED INFO FROM PILOTS]",
    "notes": "Based on pilot reports: arrive before 0900 to get a ticket to be seen. Wait times of 4+ hours are common.",
    "lastVerified": "2026-01-11"
  },
  {
    "id": "hartford-claims",
    "name": "The Hartford - Disability Claims",
    "organization": "hartford",
    "type": "phone",
    "phone": "[PLACEHOLDER: VERIFY NUMBER]",
    "hours": "[PLACEHOLDER: VERIFY HOURS]",
    "notes": "For FedEx LTD claims. Have your employee ID and claim number ready.",
    "lastVerified": "2026-01-11"
  },
  {
    "id": "alpa-ri",
    "name": "ALPA R&I Committee (Retirement & Insurance)",
    "organization": "alpa",
    "type": "person",
    "notes": "Contact for questions about LTD benefits, offsets, and plan interpretation. [PLACEHOLDER: ADD CONTACT INFO]",
    "lastVerified": "2026-01-11"
  },
  {
    "id": "alpa-pbrb",
    "name": "ALPA PBRB (Pilot Benefit Review Board)",
    "organization": "alpa",
    "type": "person",
    "notes": "For appealing Hartford denials after internal appeals exhausted. [PLACEHOLDER: ADD PROCESS INFO]",
    "lastVerified": "2026-01-11"
  }
]
```

---

This should give you a much more realistic foundation. The main things still needed from the pilots with actual experience:

1. **Specific EDD office details** (exact address near OAK, parking, best contacts)
2. **FedEx payroll contact** (who reports to EDD, how to fix data issues)
3. **Hartford-specific procedures** (exact phone numbers, claim process, appeal templates)
4. **Real timeline examples** (how long things actually took)
5. **Form field examples** (exactly what to put in tricky fields)
6. **Success story templates** (what worked for pilots who got through quickly)
