import { CalendarDay, CalendarEvent, MonthId } from "../../common/dateTime.types";

export type SetDayEventsPayload = {
    dayIdx: number,
    events: CalendarEvent[],
};

type NumberArray = MonthId[];

export type AdvanceMonthAction = {
    type: 'ADVANCE_MONTH';
    payload: MonthId;
};

export type ReverseMonthAction = {
    type: 'REVERSE_MONTH';
    payload: MonthId;
};

export type ToggleDayAction = {
    type: 'TOGGLE_DAY';
    payload: CalendarDay;
}

export type SetDayEventsAction = {
    type: "SET_DAY_EVENTS";
    payload: SetDayEventsPayload;
};

type SchedulerActions = AdvanceMonthAction | ReverseMonthAction | ToggleDayAction | SetDayEventsAction;

export default SchedulerActions;
