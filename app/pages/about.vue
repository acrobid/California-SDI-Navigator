<script setup lang="ts">
useSeoMeta({
  title: 'About - CA SDI Navigator',
  description: 'About the CA SDI Navigator for FedEx Pilots',
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-3xl mx-auto">
      <!-- Header -->
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">About This Guide</h1>

      <!-- Main Content -->
      <div class="prose dark:prose-invert max-w-none">
        <h2>Why This Guide Exists</h2>
        <p>
          When a FedEx pilot based in California becomes disabled, they face a unique and challenging situation.
          They must navigate two separate bureaucratic systems—California's Employment Development Department (EDD)
          for State Disability Insurance (SDI) and The Hartford for Long-Term Disability (LTD)—that were never
          designed to work together smoothly.
        </p>

        <p>
          The core problem is simple but impactful: The Hartford reduces your LTD payments by the amount they
          expect you to receive from CA SDI, <em>regardless of whether you've actually received that payment</em>.
          This can leave pilots with significantly reduced income during an already stressful time.
        </p>

        <p>
          Each pilot who goes through this process has historically had to figure it out from scratch, wasting
          dozens of hours and potentially missing deadlines or making mistakes that cost them money. This guide
          consolidates the hard-won knowledge of pilots who have successfully navigated this process.
        </p>

        <h2>What This Guide Provides</h2>
        <ul>
          <li><strong>Process Documentation:</strong> Step-by-step guidance through the CA SDI claim process</li>
          <li><strong>Benefit Calculator:</strong> Estimate your SDI and LTD benefits before filing</li>
          <li><strong>Interactive Checklist:</strong> Track your progress through each phase</li>
          <li><strong>Timeline Generator:</strong> Visualize expected dates and critical deadlines</li>
          <li><strong>Contact Directory:</strong> Important phone numbers and addresses</li>
          <li><strong>Document Templates:</strong> Letter templates for common situations</li>
        </ul>

        <h2>Important Disclaimers</h2>

        <CommonCallout variant="danger" title="Not Legal or Financial Advice">
          This website is an unofficial resource created by pilots for pilots. It is not affiliated with,
          endorsed by, or sponsored by FedEx, ALPA, The Hartford, or California EDD. Information provided
          is for educational purposes only and should not be construed as legal, financial, or medical advice.
        </CommonCallout>

        <h3>Accuracy of Information</h3>
        <p>
          While we strive to keep this information accurate and up-to-date, laws, regulations, and procedures
          can change. Always verify information with official sources:
        </p>
        <ul>
          <li>California EDD: <a href="https://edd.ca.gov/en/disability/" target="_blank" rel="noopener">edd.ca.gov/en/disability/</a></li>
          <li>Your specific plan documents from The Hartford</li>
          <li>ALPA representatives for union-related questions</li>
        </ul>

        <h3>Individual Situations Vary</h3>
        <p>
          Every disability claim is unique. Your specific situation may require different steps or produce
          different outcomes than described in this guide. When in doubt, consult with:
        </p>
        <ul>
          <li>An attorney specializing in disability benefits</li>
          <li>A financial advisor familiar with pilot benefits</li>
          <li>ALPA's Retirement & Insurance Committee</li>
        </ul>

        <h3>Calculator Estimates</h3>
        <p>
          The benefit calculator provides estimates only. Actual CA SDI benefits are determined by EDD based
          on your specific earnings record. Actual LTD benefits are determined by The Hartford based on your
          plan documents and their review of your claim.
        </p>

        <h2>Privacy</h2>
        <p>
          This website is designed with privacy in mind:
        </p>
        <ul>
          <li><strong>No accounts required:</strong> You don't need to create an account or provide personal information</li>
          <li><strong>Local storage only:</strong> Your checklist progress is stored only in your browser</li>
          <li><strong>No data collection:</strong> Calculator inputs are not stored or transmitted anywhere</li>
          <li><strong>Minimal analytics:</strong> We use privacy-respecting analytics only to understand general usage patterns</li>
        </ul>

        <h2>Contributing</h2>
        <p>
          If you've been through the CA SDI process and have knowledge to share, corrections to suggest,
          or updates to provide, we welcome your contributions. This guide is maintained by pilots who
          want to help their colleagues navigate this challenging process.
        </p>

        <h2>Version Information</h2>
        <p>
          <strong>Last Updated:</strong> January 2026<br>
          <strong>SDI Rates Current Through:</strong> 2026
        </p>
      </div>

      <!-- Full Disclaimer -->
      <div class="mt-12">
        <CommonDisclaimer variant="full" />
      </div>
    </div>
  </div>
</template>
