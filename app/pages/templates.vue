<script setup lang="ts">
useSeoMeta({
  title: "Document Templates - CA SDI Navigator",
  description:
    "Downloadable templates for CA SDI claims and Hartford LTD coordination",
});

interface Template {
  id: string;
  title: string;
  description: string;
  category: "edd" | "hartford" | "general";
  icon: string;
  content: string;
}

const templates: Template[] = [
  {
    id: "hartford-appeal",
    title: "Hartford Offset Appeal Letter",
    description: "Template for appealing Hartford's SDI offset decision",
    category: "hartford",
    icon: "i-lucide-file-signature",
    content: `[Your Name]
[Your Address]
[City, State ZIP]
[Date]

The Hartford
Group Benefits Claims
[Address from your claim documents]

RE: Appeal of SDI Offset Decision
Claim Number: [Your Claim Number]
Policy Number: [Your Policy Number]

Dear Claims Administrator,

I am writing to formally appeal the State Disability Insurance (SDI) offset applied to my Long-Term Disability (LTD) benefits under the above-referenced claim.

BACKGROUND:
I am a pilot employed by FedEx, based at the Oakland (OAK) domicile. As a California-based employee, I am required by California law to participate in the State Disability Insurance program through mandatory payroll deductions.

THE ISSUE:
I understand that the LTD plan provides for an offset of benefits received from state disability programs. However, I wish to bring to your attention the following concerns:

1. [Describe your specific situation - e.g., delays in receiving SDI, EDD processing issues, etc.]

2. [If applicable: I have not yet received any SDI payments, yet the offset has already been applied to my LTD benefits.]

3. [Include any other relevant facts about your situation]

REQUEST:
I respectfully request that you:
1. Review the offset calculation applied to my claim
2. [Specific request - e.g., suspend the offset until SDI payments are received, recalculate based on actual payments received, etc.]
3. Provide a written explanation of how the offset amount was calculated

SUPPORTING DOCUMENTATION:
I have enclosed the following documents in support of this appeal:
- [List documents: EDD correspondence, payment records, etc.]

Please respond to this appeal within 30 days as required under ERISA. If you require any additional information, please contact me at [phone number] or [email address].

Thank you for your prompt attention to this matter.

Sincerely,

[Your Signature]
[Your Printed Name]
[Your Employee ID]

Enclosures: [List]

cc: ALPA Retirement & Insurance Committee
    [Your personal records]`,
  },
  {
    id: "edd-cover-letter",
    title: "EDD Document Submission Cover Letter",
    description: "Cover letter template for submitting documents to EDD",
    category: "edd",
    icon: "i-lucide-file-text",
    content: `[Your Name]
[Your Address]
[City, State ZIP]
[Date]

California Employment Development Department
Disability Insurance Branch
[Office Address]

RE: Disability Insurance Claim - Document Submission
Claimant: [Your Full Name]
Social Security Number (last 4): XXX-XX-[Last 4]
Claim Effective Date: [Date]

Dear EDD Representative,

I am submitting the following documents in support of my State Disability Insurance claim:

DOCUMENTS ENCLOSED:
1. [Document name and description]
2. [Document name and description]
3. [Document name and description]

IMPORTANT INFORMATION ABOUT MY EMPLOYMENT:

I am an airline pilot employed by FedEx, based at the Oakland International Airport (OAK). My pay structure differs from traditional employment in the following ways:

• I am paid per flight hour, not hourly wages
• I receive per diem for meals while traveling
• My schedule and pay vary month to month
• A typical full month of work is approximately 75-85 flight hours

The enclosed pay documentation reflects this structure. If you have questions about interpreting my pay records, please contact me at the number below.

CONTACT INFORMATION:
Phone: [Your Phone Number]
Email: [Your Email]
Best time to reach me: [Time and timezone]

Please add these documents to my claim file. If you require any additional information, please contact me.

Thank you for your assistance.

Sincerely,

[Your Signature]
[Your Printed Name]

Enclosures: [Number] documents`,
  },
  {
    id: "doctor-request",
    title: "Doctor Certification Request",
    description: "Instructions for your doctor completing EDD certification",
    category: "general",
    icon: "i-lucide-stethoscope",
    content: `INFORMATION FOR PHYSICIAN
Completing California EDD Disability Insurance Medical Certification

Dear Dr. [Name],

I am applying for California State Disability Insurance (SDI) benefits and need you to complete the medical certification portion of my claim. Below is information to help you complete the form accurately.

PATIENT INFORMATION:
Patient Name: [Your Full Name]
Date of Birth: [DOB]
Social Security (last 4): XXX-XX-[Last 4]

IMPORTANT NOTES FOR THE FORM:

1. DIAGNOSIS: Please provide specific diagnosis codes (ICD-10) if possible.

2. DISABILITY START DATE: [Date] - This should be the date I became unable to perform my job duties.

3. EXPECTED DURATION: Please provide your best estimate. You can always extend later if needed.

4. WORK RESTRICTIONS: As an airline pilot, I cannot perform ANY of my job duties if I have any restrictions. Partial disability does not exist in my profession - I am either fit to fly or I am not.

5. TREATMENT PLAN: Brief description of current treatment.

YOUR INFORMATION NEEDED:
The California EDD will verify your medical license. Please ensure the following information is accurate on the form:
- Full legal name as it appears on your CA medical license
- Medical license number
- Practice address and phone number
- Fax number (EDD may fax requests)

The EDD typically takes 7-10 business days to verify physician licenses. Ensuring accurate information helps avoid delays.

RETURN OPTIONS:
Option 1: Complete and fax to EDD at [fax number]
Option 2: Give completed form to me and I will submit with my claim
Option 3: Mail directly to EDD at [address]

If you have questions about the form, you can contact EDD at 1-800-480-3287 or contact me at [your phone].

Thank you for your assistance.

[Your Name]
[Your Phone]
[Your Email]`,
  },
  {
    id: "edd-inquiry",
    title: "EDD Missing Payment Inquiry",
    description: "Template for inquiring about delayed or missing SDI payments",
    category: "edd",
    icon: "i-lucide-search",
    content: `[Your Name]
[Your Address]
[City, State ZIP]
[Date]

California Employment Development Department
Disability Insurance Branch
P.O. Box 989321
West Sacramento, CA 95798-9321

RE: Inquiry Regarding Delayed/Missing Disability Insurance Payment
Claimant: [Your Full Name]
Social Security Number (last 4): XXX-XX-[Last 4]
Claim Confirmation Number: [Number]
Claim Effective Date: [Date]

Dear EDD Representative,

I am writing to inquire about the status of my State Disability Insurance claim and payments.

CLAIM STATUS:
- Claim filed: [Date]
- Last communication received: [Date and description]
- Payments received to date: [None / List amounts and dates]
- Expected payment date: [Date]

ISSUE:
[Describe the specific issue - examples:]
- I have not received any payments since filing [X] days/weeks ago
- My payments stopped after [date] without explanation
- I received a request for documents which I submitted on [date] but have not heard back

ACTIONS TAKEN:
- [Date]: Called EDD at [number], spoke with [name if known], was told [outcome]
- [Date]: [Other actions taken]

REQUEST:
Please review my claim and advise:
1. The current status of my claim
2. If any documents or information is needed from me
3. When I can expect to receive payment
4. Any issues preventing payment processing

I can be reached at:
Phone: [Your Phone Number]
Email: [Your Email]

Please respond within [timeframe]. If this matter is not resolved, I may need to escalate to a supervisor or file a formal complaint.

Thank you for your prompt attention.

Sincerely,

[Your Signature]
[Your Printed Name]

Enclosures: [Copies of previous correspondence, if any]`,
  },
  {
    id: "pbrb-request",
    title: "PBRB Request Template",
    description: "Template for requesting Pilot Benefit Review Board review",
    category: "hartford",
    icon: "i-lucide-scale",
    content: `[Your Name]
[Your Address]
[City, State ZIP]
[Date]

ALPA Retirement & Insurance Committee
[Current Address - verify with ALPA]

RE: Request for Pilot Benefit Review Board (PBRB) Review
Employee: [Your Name]
Employee Number: [Your FedEx Employee ID]
Hartford Claim Number: [Your Claim Number]

Dear R&I Committee,

I am writing to formally request that my Long-Term Disability benefit dispute with The Hartford be reviewed by the Pilot Benefit Review Board (PBRB).

BACKGROUND:
I am a [Captain/First Officer] based at [OAK/other] with [X] years of service. I became disabled on [date] due to [general description - you don't need to provide detailed medical information].

THE DISPUTE:
The Hartford has [describe the decision you are disputing]:
- [Specific issue 1]
- [Specific issue 2]

ACTIONS TAKEN:
1. [Date]: Filed initial claim with Hartford
2. [Date]: Received decision from Hartford regarding [issue]
3. [Date]: Filed written appeal with Hartford
4. [Date]: Received appeal decision from Hartford
5. [Date]: [Any other relevant actions]

REASON FOR PBRB REQUEST:
I believe Hartford's decision is incorrect because:
1. [Reason 1]
2. [Reason 2]

I have exhausted the internal appeals process with The Hartford as required.

SUPPORTING DOCUMENTS:
I am enclosing copies of:
1. Hartford's original decision letter
2. My appeal letter
3. Hartford's appeal decision
4. [Other relevant documents]

Please advise me of:
1. The PBRB process and timeline
2. Any additional documentation needed
3. Next steps

Thank you for your assistance in this matter.

Sincerely,

[Your Signature]
[Your Printed Name]
[Your Phone Number]
[Your Email]

Enclosures: [List]`,
  },
];

const categoryLabels = {
  edd: { title: "EDD Documents", color: "info" },
  hartford: { title: "Hartford / LTD", color: "primary" },
  general: { title: "General", color: "neutral" },
};

const selectedTemplate = ref<Template | null>(null);

const copyToClipboard = async (text: string) => {
  await navigator.clipboard.writeText(text);
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Document Templates
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Ready-to-use letter templates for common situations in the SDI and LTD
        process.
      </p>
    </div>

    <CommonCallout
      variant="info"
      title="How to Use These Templates"
      class="mb-8"
    >
      <p>
        Click on a template to view it, then copy and customize with your
        specific information. Replace all bracketed [placeholders] with your
        actual information before sending.
      </p>
    </CommonCallout>

    <!-- Template Cards -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard
        v-for="template in templates"
        :key="template.id"
        class="cursor-pointer hover:border-primary-500 transition-colors"
        @click="selectedTemplate = template"
      >
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <div
              class="p-2 rounded-lg"
              :class="{
                'bg-blue-50 dark:bg-blue-900/20': template.category === 'edd',
                'bg-purple-50 dark:bg-purple-900/20':
                  template.category === 'hartford',
                'bg-gray-50 dark:bg-gray-800': template.category === 'general',
              }"
            >
              <UIcon
                :name="template.icon"
                class="w-5 h-5"
                :class="{
                  'text-blue-600 dark:text-blue-400':
                    template.category === 'edd',
                  'text-purple-600 dark:text-purple-400':
                    template.category === 'hartford',
                  'text-gray-600 dark:text-gray-400':
                    template.category === 'general',
                }"
              />
            </div>
            <UBadge
              :color="
                categoryLabels[template.category].color as
                  | 'info'
                  | 'primary'
                  | 'neutral'
              "
              variant="subtle"
              size="xs"
            >
              {{ categoryLabels[template.category].title }}
            </UBadge>
          </div>

          <h3 class="font-semibold text-gray-900 dark:text-white">
            {{ template.title }}
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ template.description }}
          </p>

          <UButton variant="ghost" size="sm" class="mt-2">
            <UIcon name="i-lucide-eye" class="w-4 h-4 mr-2" />
            View Template
          </UButton>
        </div>
      </UCard>
    </div>

    <!-- Template Modal -->
    <UModal v-model:open="selectedTemplate" :ui="{ width: 'max-w-4xl' }">
      <template v-if="selectedTemplate" #content>
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <UIcon :name="selectedTemplate.icon" class="w-5 h-5" />
                <h2 class="text-lg font-semibold">
                  {{ selectedTemplate.title }}
                </h2>
              </div>
              <UButton
                variant="ghost"
                color="neutral"
                icon="i-lucide-x"
                @click="selectedTemplate = null"
              />
            </div>
          </template>

          <div class="space-y-4">
            <CommonCallout variant="warning">
              Replace all [bracketed placeholders] with your actual information
              before using this template.
            </CommonCallout>

            <div class="relative">
              <pre
                class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap font-mono"
                >{{ selectedTemplate.content }}</pre
              >
            </div>
          </div>

          <template #footer>
            <div class="flex justify-end gap-3">
              <UButton
                variant="outline"
                @click="copyToClipboard(selectedTemplate!.content)"
              >
                <UIcon name="i-lucide-copy" class="w-4 h-4 mr-2" />
                Copy to Clipboard
              </UButton>
              <UButton @click="selectedTemplate = null"> Close </UButton>
            </div>
          </template>
        </UCard>
      </template>
    </UModal>

    <!-- Disclaimer -->
    <div class="mt-8">
      <CommonCallout variant="warning" title="Legal Disclaimer">
        These templates are provided for informational purposes only and do not
        constitute legal advice. Review all documents carefully before
        submitting. Consider consulting with a legal professional for complex
        situations or if you are unsure about any aspect of your claim.
      </CommonCallout>
    </div>
  </div>
</template>
