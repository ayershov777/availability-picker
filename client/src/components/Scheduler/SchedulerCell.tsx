import { useDispatch } from "react-redux";
import styled from "styled-components";
import { toggleDayAction } from "../../redux/actions";
import { CalendarDay } from "../../types/common/dateTime.types";

const Cell = styled.div`
    border: 1px solid black;
    margin: 2px;
    padding: 4px;
    height: calc(100vw/10);
`;

type SchedulerCellProps = {
    day: CalendarDay;
};

function SchedulerCell({ day }: SchedulerCellProps) {
    const dispatch = useDispatch();

    function selectDay() {
        dispatch(toggleDayAction(day))
    }

    function handleClick() {
        selectDay();
    }

    return (
        <Cell onClick={handleClick}>
            {day.date.toDateString().substring(4, 10)}
        </Cell>
    );
}

export default SchedulerCell;
