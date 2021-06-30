import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setSelectedDateAction } from "../../redux/actions";

const Cell = styled.div`
    border: 1px solid black;
    margin: 2px;
    padding: 4px;
    height: calc(100vw/10);
`;

type SchedulerCellProps = {
    date: Date;
};

function SchedulerCell({ date }: SchedulerCellProps) {
    const dispatch = useDispatch();

    function selectDay() {
        dispatch(setSelectedDateAction(date))
    }

    function handleClick() {
        selectDay();
    }

    return (
        <Cell onClick={handleClick}>
            {date.toDateString().substring(4, 10)}
        </Cell>
    );
}

export default SchedulerCell;
