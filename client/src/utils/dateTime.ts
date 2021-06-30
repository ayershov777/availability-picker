import { MonthIndex, TimeSlot, WeekdayIndex } from "../types/common/dateTime.types";

export const MILLIS_PER_FIFTEEN_MINUTES = 9e+5;
const MILLIS_PER_DAY = 8.64e+7;
const DAYS_TO_DISPLAY = 42;

export const WEEKDAYS = [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
];

export const MONTHS = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

export const HOURS = [
    "12", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"
];

export const MINUTES_PER_DAY = 1440;

export function getInitialDates() : Date[] {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() as MonthIndex;
    return getMonthlyDates(currentMonth, currentYear);
}

export function getMonthlyDates( monthIndex: MonthIndex, year: number) : Date[] {
    const firstSunday: Date = getFirstVisibleSunday(monthIndex, year);
    const firstSundayEpochMillis = firstSunday.getTime();

    return (
        new Array<undefined>(DAYS_TO_DISPLAY)
            .fill(undefined)
            .map((_day, idx) => addDays(firstSundayEpochMillis, idx))
    );
}

export function getCurrentMonth() {
    return new Date().getMonth() as MonthIndex;
}

export function getCurrentYear() {
    return new Date().getFullYear();
}

function addDays(firstDayEpochMillis: number, numDays: number) {
    return new Date(firstDayEpochMillis + numDays * MILLIS_PER_DAY)
}

function getFirstVisibleSunday(monthIndex: MonthIndex, year: number) {
    const day = new Date(year, monthIndex, 1);
    const weekdayIndex = day.getDay() as WeekdayIndex; 
    const epochMillis = day.getTime();

    const delta = weekdayIndex * MILLIS_PER_DAY;
    return new Date(epochMillis - delta);
}

export function getInitialTimes(date: Date): TimeSlot[] {
    return Array(96)
        .fill(undefined)
        .map((_slot, idx) => {
            const hours = Math.floor(idx/4);
            const minutes = 15*(idx % 4);

            const dateTime = getDateTime(date, hours, minutes);
            const timeDisplay = getStandardDisplayTime(hours, minutes);
            return { timeDisplay, dateTime };
        });
}

function getDateTime(date: Date, hours: number, minutes: number) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return new Date(year, month, day, hours, minutes);
}

function getStandardDisplayTime(hours: number, minutes: number) {
    const displayHours = HOURS[hours];
    const displayMinutes = minutes === 0 ? "00" : minutes.toString();
    const period = hours < 12 ? "AM" : "PM";
    return `${displayHours}:${displayMinutes} ${period}`;
}

// function isTimeSelected(events: CalendarAvailability[], dateTime: Date) {
//     return events.reduce((isAlreadySelected, event) => {
//         const dateTimeEpochMillis = dateTime.getTime();
//         const startEpochMillis = event.startTime.getTime();
//         const endEpochMillis = event.endTime.getTime();

//         const inRange = isInRange(dateTimeEpochMillis, startEpochMillis, endEpochMillis);

//         return isAlreadySelected || inRange;
//     }, false);
// }

function isInRange(x: number, min: number, max: number) {
    return x >= min && x <= max;
}
