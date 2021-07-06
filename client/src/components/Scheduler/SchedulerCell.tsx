import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CSS from "csstype";
import { setSelectedDateAction } from "../../redux/actions";
import { getMonthIndex, getSelectedDate } from "../../redux/selectors";

type CellProps = {
    backgroundColor: CSS.Property.BackgroundColor;
    textColor: CSS.Property.Color;
};

const Cell = styled.div<CellProps>`
    margin: auto;
    line-height: 32px;
    text-align: center;
    background-color: ${props => props.backgroundColor};
    color: ${props => props.textColor};
    cursor: pointer;

    &:hover {
        background-color: #99bff1;
        color: black;
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
    const selectedDate = useSelector(getSelectedDate);

    const isSelected = selectedDate.toDateString() === date.toDateString();
    const isCurrentMonth = monthIndex === date.getMonth();

    const backgroundColor = getBackgroundColor(isSelected);
    const textColor = getTextColor(isSelected, isCurrentMonth);

    function selectDay() {
        dispatch(setSelectedDateAction(date));
    }

    function handleClick() {
        selectDay();
    }

    return (
        <Wrapper>
            <Cell onClick={handleClick} backgroundColor={backgroundColor} textColor={textColor}>
                {date.getDate()}
            </Cell>
        </Wrapper>
    );
}

function getBackgroundColor(isSelected: boolean) {
    if(isSelected) {
        return "#1a73e8";
    }

    return "white";
}

function getTextColor(isSelected: boolean, isCurrentMonth: boolean) {
    if(isSelected) {
        return "white";
    }

    if(!isCurrentMonth) {
        return "lightgray";
    }

    return "black";
}

export default SchedulerCell;
