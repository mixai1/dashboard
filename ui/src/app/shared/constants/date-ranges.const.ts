import { PeriodOption } from '@shared/components/period-select/period-select.component';

export type PeriodKey = 'day' | 'week' | 'month' | 'quarter' | 'year';

export const DEFAULT_PERIODS: Record<PeriodKey, PeriodOption> = {
  get day() {
    const now = new Date();
    const from = new Date(now);
    from.setDate(from.getDate() - 1);
    return {
      name: 'Day',
      value: { from, to: now },
    };
  },

  get week() {
    const now = new Date();
    const from = new Date(now);
    from.setDate(from.getDate() - 7);
    return {
      name: 'Week',
      value: { from, to: now },
    };
  },

  get month() {
    const now = new Date();
    const from = new Date();
    from.setMonth(now.getMonth() - 1);
    return {
      name: 'Month',
      value: { from, to: now },
    };
  },

  get quarter() {
    const now = new Date();
    const from = new Date();
    from.setMonth(now.getMonth() - 3);
    return {
      name: 'Quarter',
      value: { from, to: now },
    };
  },

  get year() {
    const now = new Date();
    const from = new Date();
    from.setFullYear(now.getFullYear() - 1);
    return {
      name: 'Year',
      value: { from, to: now },
    };
  },
};
