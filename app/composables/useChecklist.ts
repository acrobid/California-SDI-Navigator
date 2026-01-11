import { computed } from 'vue'
import type { ChecklistItem, ChecklistState } from '~/types'
import checklistData from '~~/data/checklist-items.json'

export function useChecklist() {
  const items = useState<ChecklistItem[]>('checklist-items', () => checklistData as ChecklistItem[])

  const state = useCookie<ChecklistState>('sdi-checklist-state', {
    default: () => ({
      items: {},
      startedAt: undefined,
      claimType: 'both' as const,
    }),
    watch: true,
  })

  // Use localStorage for persistence (works better for this use case)
  if (import.meta.client) {
    const stored = localStorage.getItem('sdi-checklist-state')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        state.value = { ...state.value, ...parsed }
      } catch (e) {
        console.error('Failed to parse checklist state', e)
      }
    }

    watch(state, (newState) => {
      localStorage.setItem('sdi-checklist-state', JSON.stringify(newState))
    }, { deep: true })
  }

  const toggleItem = (id: string) => {
    const newItems = { ...state.value.items }
    newItems[id] = !newItems[id]

    state.value = {
      ...state.value,
      items: newItems,
      startedAt: state.value.startedAt || (Object.values(newItems).some(Boolean) ? new Date().toISOString() : undefined),
    }
  }

  const isComplete = (id: string) => !!state.value.items[id]

  const progress = computed(() => {
    const total = items.value.length
    const completed = Object.values(state.value.items).filter(Boolean).length
    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    }
  })

  const itemsByPhase = computed(() => {
    const phases = ['preparation', 'filing', 'post-filing', 'hartford', 'in-person'] as const
    return phases.reduce((acc, phase) => {
      acc[phase] = items.value.filter((item) => item.phase === phase)
      return acc
    }, {} as Record<string, ChecklistItem[]>)
  })

  const phaseProgress = computed(() => {
    const phases = ['preparation', 'filing', 'post-filing', 'hartford', 'in-person'] as const
    return phases.reduce((acc, phase) => {
      const phaseItems = items.value.filter((item) => item.phase === phase)
      const completed = phaseItems.filter((item) => state.value.items[item.id]).length
      acc[phase] = {
        completed,
        total: phaseItems.length,
        percentage: phaseItems.length > 0 ? Math.round((completed / phaseItems.length) * 100) : 0,
      }
      return acc
    }, {} as Record<string, { completed: number; total: number; percentage: number }>)
  })

  const resetChecklist = () => {
    state.value = {
      items: {},
      startedAt: undefined,
      claimType: 'both',
    }
    if (import.meta.client) {
      localStorage.removeItem('sdi-checklist-state')
    }
  }

  return {
    items,
    state,
    toggleItem,
    isComplete,
    progress,
    itemsByPhase,
    phaseProgress,
    resetChecklist,
  }
}
