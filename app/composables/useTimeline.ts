import { computed } from "vue";
import type { TimelineEvent, TimelineInputs, TimelineOutput } from "~/types";
import timelineDefaults from "~~/data/timeline-defaults.json";

export function useTimeline() {
  const events = useState<TimelineEvent[]>(
    "timeline-events",
    () => timelineDefaults as TimelineEvent[],
  );

  const getDefaultDate = (): string => {
    const parts = new Date().toISOString().split("T");
    return parts[0] ?? "";
  };

  const inputs = useState<TimelineInputs>("timeline-inputs", () => ({
    claimStartDate: getDefaultDate(),
    filingMethod: "online" as const,
    livesInCalifornia: true,
    hasExistingEDDContact: false,
  }));

  const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const formatDate = (date: Date): string => {
    const parts = date.toISOString().split("T");
    return parts[0] ?? "";
  };

  const output = computed<TimelineOutput>(() => {
    const startDate = new Date(inputs.value.claimStartDate);

    // Adjust timelines based on filing method
    const filingAdjustment =
      inputs.value.filingMethod === "mail"
        ? 14
        : inputs.value.filingMethod === "in-person"
          ? -7
          : 0;

    const calculatedEvents = events.value.map((event) => {
      const adjustedOffset =
        event.type === "edd"
          ? event.startOffset + filingAdjustment
          : event.startOffset;

      const expectedDate = addDays(startDate, adjustedOffset);
      const rangeStart = addDays(expectedDate, -event.varianceDays);
      const rangeEnd = addDays(expectedDate, event.varianceDays);

      return {
        ...event,
        expectedDate: formatDate(expectedDate),
        rangeStart: formatDate(rangeStart),
        rangeEnd: formatDate(rangeEnd),
      };
    });

    const today = new Date();
    const criticalDeadlines = calculatedEvents
      .filter((event) => event.isCritical || event.type === "deadline")
      .map((event) => {
        const eventDate = new Date(event.expectedDate);
        const daysFromNow = Math.ceil(
          (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
        );
        return {
          name: event.name,
          date: event.expectedDate,
          daysFromNow,
        };
      })
      .sort((a, b) => a.daysFromNow - b.daysFromNow);

    return {
      events: calculatedEvents,
      criticalDeadlines,
    };
  });

  const updateInput = <K extends keyof TimelineInputs>(
    key: K,
    value: TimelineInputs[K],
  ) => {
    inputs.value = { ...inputs.value, [key]: value };
  };

  return {
    events,
    inputs,
    output,
    updateInput,
  };
}
