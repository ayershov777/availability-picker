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
    setGridAnimation: React.Dispatch<React.SetStateAction<GridAnimationVariant>>;
};

export default function DatePickerBody({ gridAnimation, setGridAnimation }: DatePickerBodyProps) {
    const dates = useSelector(getDates);

    function onAnimationEnd() {
        setGridAnimation("idle");
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