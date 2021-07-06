import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getDates } from "../../../redux/selectors";
import { WEEKDAYS } from "../../../utils/dateTime";
import DatePickerCell from "./DatePickerCell";
import DatePickerGrid, { GridAnimationVariant } from "./DatePickerGrid";

const WeekdayLabel = styled.div`
    text-align: center;
    font-size: 14pt;
    font-weight: bold;
    margin: 0 2px;
`;

type DatePickerBodyProps = {
    gridAnimation: GridAnimationVariant;
    resolveAnimationEnded: undefined | ((value: void | PromiseLike<void>) => void);
};

export default function DatePickerBody({ gridAnimation, resolveAnimationEnded }: DatePickerBodyProps) {
    const dates = useSelector(getDates);

    function onAnimationEnd() {
        if(resolveAnimationEnded) {
            resolveAnimationEnded();
        }
    }

    return (
        <DatePickerGrid animationVariant={gridAnimation} onAnimationEnd={onAnimationEnd}>
            {WEEKDAYS.map((weekday, idx) => (
                <WeekdayLabel key={`weekday-label-${idx}`}>
                    {weekday}
                </WeekdayLabel>
            ))}
            {dates.map((date, idx) => (
                <DatePickerCell
                    key={`scheduler-item-${idx}`}
                    date={date}
                />
            ))}
        </DatePickerGrid>
    );
}
