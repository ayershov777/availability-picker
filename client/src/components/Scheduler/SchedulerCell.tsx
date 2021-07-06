import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CSS from "csstype";
import { setSelectedDateAction } from "../../redux/actions";
import { getMonthIndex, getSelectedDate } from "../../redux/selectors";
import useViewport, { Viewport } from '../../hooks/useViewport';

type CellProps = {
    backgroundColor: CSS.Property.BackgroundColor;
    textColor: CSS.Property.Color;
    circleSize: string;
    borderColor: CSS.Property.Color;
}

const Cell = styled.div<CellProps>`
    margin: auto;
    height: ${props => props.circleSize};
    width: ${props => props.circleSize};
    line-height: ${props => props.circleSize};
    border-radius: 50%;
    text-align: center;
    background-color: ${props => props.backgroundColor};
    color: ${props => props.textColor};
    border: ${props => `1px solid ${props.borderColor}`};
    cursor: pointer;

    &:hover {
        background-color: #99bff1;
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
    const selectedDate = useSelector(getSelectedDate);
    const viewport = useViewport();

    const {backgroundColor, textColor, circleSize, borderColor} = getCellStyles(viewport, monthIndex, selectedDate, date);

    function selectDay() {
        dispatch(setSelectedDateAction(date));
    }

    function handleClick() {
        selectDay();
    }
    return (
        <Wrapper>
            <Cell onClick={handleClick} backgroundColor={backgroundColor} textColor={textColor} circleSize={circleSize || "calc(100vw/20)"} borderColor={borderColor || 'currentcolor'} >
                {date.getDate()}
            </Cell>
        </Wrapper>
    );
}

function getCellStyles(
    viewport: Viewport,
	monthIndex: number,
	selectedDate: Date,
	date: Date
) {
	const selectedMonth = selectedDate?.getMonth(),
		cellMonth = date.getMonth(),
		cellDate = date.getDate(),
        circleSize = viewport >= Viewport.SM ? "calc(100vw/30)" : "calc(100vw/15)";
    if (selectedMonth === cellMonth && selectedDate?.getDate() === cellDate)
		return {
			backgroundColor: "#FFFFFF",
			textColor: "#1a73e8",
            circleSize,
			borderColor: "#1a73e8",
		};
	if (monthIndex === cellMonth) {
		return { backgroundColor: "#1a73e8", textColor: "#FFFFFF", circleSize };
	}

	return { backgroundColor: "lightgray", textColor: "#FFFFFF", circleSize };
}

export default SchedulerCell;
