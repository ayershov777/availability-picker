import { useSelector } from "react-redux";
import styled from "styled-components";
import useViewport, { Viewport } from "../../../hooks/useViewport";
import { getDates } from "../../../redux/selectors";
import { WEEKDAYS } from "../../../utils/dateTime";
import DatePickerCell from "./DatePickerCell";
import { LargeDatePickerGrid, DefaultDatePickerGrid, GridAnimationVariant } from "./DatePickerGrid";

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

function DatePickerBody({ gridAnimation, resolveAnimationEnded }: DatePickerBodyProps) {
    const dates = useSelector(getDates);
    const viewport = useViewport();

    function onAnimationEnd() {
        if(resolveAnimationEnded) {
            resolveAnimationEnded();
        }
    }

    const DatePickerGrid = getDatePickerGrid(viewport);

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

function getDatePickerGrid(viewport: Viewport) {
    switch(viewport) {
        case Viewport.XS:
        case Viewport.SM:
        case Viewport.MD:
        case Viewport.XL:
            return DefaultDatePickerGrid
        case Viewport.LG:
            return LargeDatePickerGrid;
        default: return LargeDatePickerGrid;
    }
}

export default DatePickerBody;
