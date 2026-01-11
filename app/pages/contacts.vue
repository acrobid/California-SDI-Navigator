<script setup lang="ts">
import type { Contact, ContactOrganization } from '~/types'
import { formatPhone } from '~/utils/formatters'
import contactsData from '~~/data/contacts.json'

useSeoMeta({
  title: 'Contact Directory - CA SDI Navigator',
  description: 'Important contacts for CA SDI claims, Hartford LTD, and ALPA resources',
})

const contacts = ref<Contact[]>(contactsData as Contact[])

const organizationLabels: Record<ContactOrganization, { title: string; icon: string; color: string }> = {
  edd: { title: 'California EDD', icon: 'i-lucide-landmark', color: 'blue' },
  hartford: { title: 'The Hartford', icon: 'i-lucide-building', color: 'purple' },
  alpa: { title: 'ALPA', icon: 'i-lucide-users', color: 'green' },
  fedex: { title: 'FedEx', icon: 'i-lucide-plane', color: 'orange' },
  other: { title: 'Other Resources', icon: 'i-lucide-link', color: 'gray' },
}

const organizations: ContactOrganization[] = ['edd', 'hartford', 'alpa', 'fedex', 'other']

const contactsByOrg = computed(() => {
  return organizations.reduce((acc, org) => {
    acc[org] = contacts.value.filter((c) => c.organization === org)
    return acc
  }, {} as Record<ContactOrganization, Contact[]>)
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Contact Directory</h1>
      <p class="text-gray-600 dark:text-gray-400">
        Important contacts for navigating your CA SDI claim and Hartford LTD coordination.
      </p>
    </div>

    <!-- Contact Categories -->
    <div class="space-y-8">
      <section v-for="org in organizations" :key="org">
        <div v-if="contactsByOrg[org]?.length" class="space-y-4">
          <!-- Section Header -->
          <div class="flex items-center gap-3">
            <div
              class="p-2 rounded-lg"
              :class="{
                'bg-blue-50 dark:bg-blue-900/20': org === 'edd',
                'bg-purple-50 dark:bg-purple-900/20': org === 'hartford',
                'bg-green-50 dark:bg-green-900/20': org === 'alpa',
                'bg-orange-50 dark:bg-orange-900/20': org === 'fedex',
                'bg-gray-50 dark:bg-gray-800': org === 'other',
              }"
            >
              <UIcon
                :name="organizationLabels[org].icon"
                class="w-5 h-5"
                :class="{
                  'text-blue-600 dark:text-blue-400': org === 'edd',
                  'text-purple-600 dark:text-purple-400': org === 'hartford',
                  'text-green-600 dark:text-green-400': org === 'alpa',
                  'text-orange-600 dark:text-orange-400': org === 'fedex',
                  'text-gray-600 dark:text-gray-400': org === 'other',
                }"
              />
            </div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              {{ organizationLabels[org].title }}
            </h2>
          </div>

          <!-- Contact Cards -->
          <div class="grid md:grid-cols-2 gap-4">
            <UCard v-for="contact in contactsByOrg[org]" :key="contact.id">
              <div class="space-y-3">
                <!-- Contact Name & Type -->
                <div class="flex items-start justify-between">
                  <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white">{{ contact.name }}</h3>
                    <UBadge variant="subtle" color="neutral" size="xs" class="mt-1">
                      {{ contact.type }}
                    </UBadge>
                  </div>
                </div>

                <!-- Address (for offices) -->
                <div v-if="contact.address" class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <UIcon name="i-lucide-map-pin" class="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p>{{ contact.address }}</p>
                    <p>{{ contact.city }}, {{ contact.state }} {{ contact.zip }}</p>
                    <a
                      v-if="contact.googleMapsUrl"
                      :href="contact.googleMapsUrl"
                      target="_blank"
                      rel="noopener"
                      class="text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>

                <!-- Phone -->
                <div v-if="contact.phone" class="flex items-center gap-2 text-sm">
                  <UIcon name="i-lucide-phone" class="w-4 h-4 text-gray-400" />
                  <a :href="`tel:${contact.phone}`" class="text-primary-600 dark:text-primary-400 hover:underline">
                    {{ formatPhone(contact.phone) }}
                  </a>
                </div>

                <!-- Hours -->
                <div v-if="contact.hours" class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <UIcon name="i-lucide-clock" class="w-4 h-4" />
                  <span>{{ contact.hours }}</span>
                </div>

                <!-- Best Time to Call -->
                <div v-if="contact.bestTimeToCall" class="flex items-start gap-2 text-sm">
                  <UIcon name="i-lucide-lightbulb" class="w-4 h-4 text-green-500 mt-0.5" />
                  <span class="text-green-700 dark:text-green-300">Best time: {{ contact.bestTimeToCall }}</span>
                </div>

                <!-- Website -->
                <div v-if="contact.website" class="flex items-center gap-2 text-sm">
                  <UIcon name="i-lucide-globe" class="w-4 h-4 text-gray-400" />
                  <a
                    :href="contact.website"
                    target="_blank"
                    rel="noopener"
                    class="text-primary-600 dark:text-primary-400 hover:underline truncate"
                  >
                    {{ contact.website.replace('https://', '') }}
                  </a>
                </div>

                <!-- Wait Time (for offices) -->
                <div v-if="contact.waitTimeEstimate" class="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-300">
                  <UIcon name="i-lucide-alert-triangle" class="w-4 h-4" />
                  <span>Typical wait: {{ contact.waitTimeEstimate }}</span>
                </div>

                <!-- Parking Info -->
                <div v-if="contact.parkingInfo" class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <UIcon name="i-lucide-car" class="w-4 h-4" />
                  <span>{{ contact.parkingInfo }}</span>
                </div>

                <!-- Notes -->
                <div v-if="contact.notes" class="pt-2 border-t border-gray-100 dark:border-gray-800">
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ contact.notes }}</p>
                </div>

                <!-- Last Verified -->
                <div v-if="contact.lastVerified" class="text-xs text-gray-400">
                  Last verified: {{ contact.lastVerified }}
                </div>
              </div>
            </UCard>
          </div>
        </div>
      </section>
    </div>

    <!-- Disclaimer -->
    <div class="mt-8">
      <CommonCallout variant="info" title="Contact Information">
        Contact information is provided for convenience and may change. Always verify current information with official sources. If you find outdated information, please let us know.
      </CommonCallout>
    </div>
  </div>
</template>
