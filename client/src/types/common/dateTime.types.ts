export type CalendarEvent = {
    startTime: Date;
    endTime: Date;
};

export type WeekdayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type MonthIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type MonthId = {
    monthIndex: MonthIndex;
    year: number;
};

export type TimeSlot = {
    timeDisplay: string;
    dateTime: Date;
    event?: CalendarEvent;
};
