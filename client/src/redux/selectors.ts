import RootState from "../types/redux/state.types";

export function getYear({ schedulerReducer }: RootState) {
    return schedulerReducer.year;
}

export function getMonthIndex({ schedulerReducer }: RootState) {
    return schedulerReducer.monthIndex;
}

export function getDates({ schedulerReducer }: RootState) {
    return schedulerReducer.dates;
}

export function getAvailabilities({ schedulerReducer }: RootState) {
    return schedulerReducer.availabilities;
}

export function getSelectedDate({ schedulerReducer }: RootState) {
    return schedulerReducer.selectedDate
}

export function getSelectedAvailabilities({ schedulerReducer }: RootState) {
    const selectedDate = schedulerReducer.selectedDate;
    if(selectedDate === undefined) {
        return [];
    }
    
    const selectedDateId = selectedDate.toISOString();
    return schedulerReducer.availabilities[selectedDateId];
}
