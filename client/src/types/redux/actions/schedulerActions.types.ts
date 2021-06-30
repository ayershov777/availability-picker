import { CalendarAvailability, MonthId } from "../../common/dateTime.types";

export type SetDayEventsPayload = {
    dayIdx: number,
    events: CalendarAvailability[],
};

export type AdvanceMonthAction = {
    type: "ADVANCE_MONTH";
    payload: MonthId;
};

export type ReverseMonthAction = {
    type: "REVERSE_MONTH";
    payload: MonthId;
};

export type SetSelectedDateAction = {
    type: "SET_SELECTED_DATE";
    payload: Date | undefined;
}

type SchedulerActions = AdvanceMonthAction | ReverseMonthAction | SetSelectedDateAction;

export default SchedulerActions;
