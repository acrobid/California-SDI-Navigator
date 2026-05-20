---
title: "How Offset Is Calculated"
description: "Understanding the LTD offset calculation"
icon: "i-lucide-calculator"
order: 20
---

# How the LTD Offset Is Calculated

Understanding the offset calculation is crucial for knowing what the pilot will actually receive.

::callout{type="info" title="Comprehensive Offset Guide Available"}
For complete details on **all offset types** (CA SDI, SSDI with the 70% rule, and outside income), see the [comprehensive LTD Offsets guide](/guide/hartford/offsets). This page provides a simplified overview of the math.
::

## The Basic Concept

The LTD claims administrator reduces monthly LTD payments by the amount of "other income" received, including California SDI.

::callout{type="warning" title="The Core Inequity"}
Pilots pay California SDI tax on 100% of gross earnings. Yet the claims administrator reduces the monthly contract LTD check by that exact SDI benefit amount. Because of this offset, the state benefit does not increase total monthly income; it simply shifts a portion of the payment responsibility from the LTD plan to the state fund.
::

## Step-by-Step Calculation

### Step 1: Calculate Gross LTD Benefit
First, the administrator calculates the gross contractual LTD benefit, which is 60% of pre-disability earnings. For 2026, the maximum pre-disability earnings that can be counted are capped at the IRS 401(a)(17) limit of $350,000.
```
Pre-disability earnings: $350,000 (capped at IRS limit)
LTD percentage: 60% (first 24 months)
Gross monthly LTD: $350,000 × 60% ÷ 12 = $17,500/month
```
*(Note: The contractual percentage drops to 50% after 24 months of disability. See [Benefit Calculation](/guide/hartford/calculation) for details.)*

### Step 2: Determine SDI Monthly Benefit
Next, the EDD calculates the weekly SDI benefit based on the pilot's highest base-period quarter. Because pilot wages are high, pilots typically qualify for the maximum state weekly benefit of $1,765. To convert this weekly benefit to a monthly equivalent, use the standard insurance factor of 4.33 weeks per month:
```
Maximum weekly SDI: $1,765 (2026)
Monthly SDI equivalent: $1,765 × 4.33 = $7,642/month
```

### Step 3: Apply the Offset
Finally, the administrator deducts the monthly SDI equivalent from the gross monthly LTD benefit to determine the net LTD check:
```
Gross LTD benefit:       $17,500/month
Less: SDI offset:        -$7,642/month
Net LTD payment:         $9,858/month
```

### Total Combined Income
When the offset is applied, total monthly income remains at the contractual 60% level:
```
State SDI payment:       $7,642/month
Net LTD payment:         $9,858/month
Total monthly income:    $17,500/month
```
Whether the pilot receives the SDI payments on time or not, the administrator reduces the LTD check to $9,858. This is the heart of the offset problem.

## What Counts as Offset Income

The LTD plan document allows the administrator to offset benefits by several sources of other disability income:

| Income Source | Subject to Offset? |
|--------------|-------------------|
| **California SDI** | Yes |
| **Social Security Disability (SSDI)** | Yes (subject to CBA 70% limit) |
| **Workers' Compensation** | Yes |
| **Other State Disability Plans** | Yes |
| **Retirement Pensions** | Yes (if paid during disability) |
| **Personal Investment Income** | No |
| **Spouse's Income** | No |

## Detailed Offset Example

### Pilot Scenario
The following is a typical Captain scenario using the actual 2026 contractual and state limits.

**Assumptions:**
* Pre-disability earnings: $400,000/year
* LTD plan cap: $350,000 (IRS limit)
* SDI weekly maximum: $1,765 (2026)

**Monthly Calculation:**

| Calculation Step | Value | Description |
| ---------------- | ----- | ----------- |
| **Earnings Base** | $350,000/year | Annual earnings capped at the IRS limit. |
| **LTD Rate** | 60.00% | Contractual rate for the first 24 months. |
| **Gross Annual LTD** | $210,000 | Annual LTD benefit prior to offsets. |
| **Gross Monthly LTD** | $17,500 | Monthly LTD benefit prior to offsets ($210,000 / 12). |
| **SDI Monthly Max** | $7,642 | Maximum monthly SDI benefit ($1,765 × 4.33). |
| **Net LTD Payment** | **$9,858** | The actual monthly check paid by the LTD administrator. |

**What the Pilot Receives:**
* From CA SDI: $7,642/month
* From LTD Plan: $9,858/month
* **Total Monthly Income: $17,500/month**

### What If the Pilot Fails to Receive SDI?
If the SDI claim is delayed or denied, the administrator still applies the $7,642 deduction, leaving the pilot with only the net payment:
* From CA SDI: $0/month (delayed)
* From LTD Plan: $9,858/month
* **Total Monthly Income: $9,858/month**

::callout{type="danger" title="Same Total, High Cash Flow Risk"}
The final target income is identical either way. However, if there are processing delays, the pilot bears the entire cash flow shortfall. This is why establishing the SDI claim early is so critical.
::

## The SDI Tax Cost

### What We Pay
Starting in 2024, the state eliminated the SDI taxable wage cap. As a result, pilots pay a flat 1.3% tax on their entire gross income:
* **2026 SDI Tax:** 1.3% of all wages (uncapped)
* **Tax on $400,000 of earnings:** $5,200/year

### What the Pilot Gets
* **SDI Benefit:** $7,642/month while disabled
* **LTD Offset:** -$7,642/month (deducted from the LTD check)
* **Net Financial Value: $0**

Pilots pay $5,200 annually in mandatory state taxes for a benefit that does not increase net disability income by a single dollar.

## Policy Language
The LTD plan document specifies that the monthly benefit will be reduced by other income benefits, defined to include benefits under any state disability law. The specific contract provisions govern these offsets. If a pilot suspects a miscalculation, they should request the detailed calculation sheet from the administrator.

## Addressing Calculation Errors
While the offset itself is a plan requirement, the administrator sometimes makes calculation mistakes. Common errors include:
* Using the incorrect weekly or monthly SDI rate.
* Offsetting benefits before the waiting period has concluded.
* Continuing to apply the offset after 52 weeks of state benefits have expired.

If an error is suspected, the pilot should request a complete statement of calculation from the claims representative, compare the numbers to actual EDD payments, and submit a formal dispute in writing if the math does not align.

## Timing of Offsets

### When Offsets Apply

**During the LTD Elimination Period (Days 1–180):**
During the first six months, the pilot is not receiving LTD payments, so there is nothing for the administrator to offset. The pilot collects state SDI payments independently to help cover expenses while they exhaust company sick banks.

**After LTD Begins (Day 181+):**
Once the pilot transitions to LTD, the administrator begins applying the expected SDI offset to each monthly check.

**If SDI Benefits Expire:**
California SDI has a maximum duration of 52 weeks. If the pilot remains disabled after state benefits expire, the SDI offset must be removed:
```
Months 1–12:  SDI + LTD (Offset applied)
Months 13+:   LTD only (Offset removed; LTD pays full gross benefit)
```

## Next Steps
* Use the [Benefit Calculator](/calculator) to model your specific earnings and offsets.
* Learn about the [PBRB Appeal Process](/guide/hartford/pbrb) for disputing administrator decisions.
* Find contact information in the [Contacts directory](/contacts).

