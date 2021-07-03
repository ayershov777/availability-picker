import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CSS from "csstype";
import { setSelectedDateAction } from "../../redux/actions";
import { getMonthIndex } from "../../redux/selectors";

type CellProps = {
    backgroundColor: CSS.Property.BackgroundColor;
}

const Cell = styled.div<CellProps>`
    margin: auto;
    height: calc(100vw/15);
    border: none;
    width: calc(100vw/15);
    line-height: calc(100vw/15);
    border-radius: 50%;
    text-align: center;
    background-color: ${props => props.backgroundColor};
    color: white;
    border: 1px solid white;
    cursor: pointer;

    &:hover {
        background-color: white;
        color: black;
        border: 1px solid ${props => props.backgroundColor};
    }
`;

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
`;

type SchedulerCellProps = {
    date: Date;
};

function SchedulerCell({ date }: SchedulerCellProps) {
    const dispatch = useDispatch();
    const monthIndex = useSelector(getMonthIndex);

    const backgroundColor = getBackgroundColor(monthIndex, date.getMonth());

    function selectDay() {
        dispatch(setSelectedDateAction(date));
    }

    function handleClick() {
        selectDay();
    }

    return (
        <Wrapper>
            <Cell onClick={handleClick} backgroundColor={backgroundColor}>
                {date.getDate()}
            </Cell>
        </Wrapper>
    );
}

function getBackgroundColor(selectedMonth: number, cellMonth: number) {
    if(selectedMonth === cellMonth) {
        return "#1a73e8";
    }

    return "lightgray";
}

export default SchedulerCell;
