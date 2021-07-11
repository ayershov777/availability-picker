import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CSS from "csstype";
import { setSelectedDateAction } from "../../../redux/actions";
import { getMonthIndex, getSelectedDate } from "../../../redux/selectors";

type CellProps = {
    backgroundColor: CSS.Property.BackgroundColor;
    textColor: CSS.Property.Color;
    isSelected: boolean;
};

const Cell = styled.div<CellProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 16pt;
    background-color: ${props => props.backgroundColor};
    color: ${props => props.textColor};
    cursor: pointer;

    &:hover {
        background-color: ${props => props.isSelected ? props.backgroundColor : "#99bff1"};
        color: black;
    }
`;

type DatePickerCellProps = {
    date: Date;
};

function DatePickerCell({ date }: DatePickerCellProps) {
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
        <Cell isSelected={isSelected} onClick={handleClick} backgroundColor={backgroundColor} textColor={textColor}>
            {date.getDate()}
        </Cell>
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

export default DatePickerCell;
