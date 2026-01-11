import { computed } from 'vue'
import type { CalculatorInputs, CalculatorOutputs } from '~/types'
import { calculateBenefits } from '~/utils/calculations'

export function useCalculator() {
  const inputs = useState<CalculatorInputs>('calculator-inputs', () => ({
    annualBaseSalary: 350000,
    averageMonthlyIncome: 30000,
    highestQuarterlyIncome: 90000,
    rank: 'captain' as const,
    yearsOfService: 10,
    expectedDisabilityWeeks: 26,
    hasExhaustedSickBank: false,
    ltdPercentage: 60 as const,
    vaDisabilityMonthly: 0,
    otherDisabilityIncome: 0,
  }))

  const outputs = computed<CalculatorOutputs>(() => {
    return calculateBenefits(inputs.value)
  })

  const updateInput = <K extends keyof CalculatorInputs>(
    key: K,
    value: CalculatorInputs[K]
  ) => {
    inputs.value = { ...inputs.value, [key]: value }
  }

  const resetInputs = () => {
    inputs.value = {
      annualBaseSalary: 350000,
      averageMonthlyIncome: 30000,
      highestQuarterlyIncome: 90000,
      rank: 'captain',
      yearsOfService: 10,
      expectedDisabilityWeeks: 26,
      hasExhaustedSickBank: false,
      ltdPercentage: 60,
      vaDisabilityMonthly: 0,
      otherDisabilityIncome: 0,
    }
  }

  return {
    inputs,
    outputs,
    updateInput,
    resetInputs,
  }
}
