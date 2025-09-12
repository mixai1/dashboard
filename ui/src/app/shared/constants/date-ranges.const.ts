import { PeriodOption } from '@shared/components/period-select/period-select.component';

export type PeriodKey = 'day' | 'week' | 'month' | 'quarter' | 'year';

export const DEFAULT_PERIODS: Record<PeriodKey, PeriodOption> = {
  get day() {
    const now = new Date();
    return {
      name: 'Day',
      value: {
        from: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0),
        to: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59),
      },
    };
  },

  get week() {
    const now = new Date();
    const dayOfWeek = now.getDay() || 7;
    const monday = new Date(now);
    monday.setDate(now.getDate() - (dayOfWeek - 1));
    monday.setHours(0, 0);

    const sunday = new Date(now);
    sunday.setDate(now.getDate() + (7 - dayOfWeek));
    sunday.setHours(23, 59);

    return {
      name: 'Week',
      value: { from: monday, to: sunday },
    };
  },

  get month() {
    const now = new Date();
    return {
      name: 'Month',
      value: {
        from: new Date(now.getFullYear(), now.getMonth(), 1, 0, 0),
        to: new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59),
      },
    };
  },

  get quarter() {
    const now = new Date();
    const currentMonth = now.getMonth();
    const quarterStartMonth = Math.floor(currentMonth / 3) * 3;
    const quarterEndMonth = quarterStartMonth + 2;

    const from = new Date(now.getFullYear(), quarterStartMonth, 1, 0, 0);
    const to = new Date(now.getFullYear(), quarterEndMonth + 1, 0, 23, 59);

    return {
      name: 'Quarter',
      value: { from, to },
    };
  },

  get year() {
    const now = new Date();
    return {
      name: 'Year',
      value: {
        from: new Date(now.getFullYear(), 0, 1, 0, 0),
        to: new Date(now.getFullYear(), 11, 31, 23, 59),
      },
    };
  },
};
