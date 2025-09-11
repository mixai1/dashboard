import { PeriodOption } from '@shared/components/period-select/period-select.component';

export const DEFAULT_PERIODS: Record<'day' | 'week' | 'month' | 'year', PeriodOption> = {
  day: {
    name: 'Day',
    value: {
      from: new Date(new Date().setHours(0, 0)),
      to: new Date(new Date().setHours(23, 59)),
    },
  },
  week: {
    name: 'Week',
    value: {
      from: (() => {
        const now = new Date();
        const dayOfWeek = now.getDay() || 7;
        const monday = new Date(now);
        monday.setDate(now.getDate() - (dayOfWeek - 1));
        monday.setHours(0, 0);
        return monday;
      })(),
      to: (() => {
        const now = new Date();
        const dayOfWeek = now.getDay() || 7;
        const sunday = new Date(now);
        sunday.setDate(now.getDate() + (7 - dayOfWeek));
        sunday.setHours(23, 59);
        return sunday;
      })(),
    },
  },
  month: {
    name: 'Month',
    value: {
      from: new Date(new Date().getFullYear(), new Date().getMonth(), 1, 0, 0),
      to: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59),
    },
  },
  year: {
    name: 'Year',
    value: {
      from: new Date(new Date().getFullYear(), 0, 1, 0, 0),
      to: new Date(new Date().getFullYear(), 11, 31, 23, 59),
    },
  },
};
