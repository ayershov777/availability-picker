import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { advanceMonthAction, reverseMonthAction } from "../../redux/actions";
import { getMonthIndex, getYear } from "../../redux/selectors";
import { MONTHS } from "../../utils/dateTime";
import { GridAnimationVariant } from "./SchedulerGrid";

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 16px 0;
`;

const Button = styled.button`
    background-color: white;
    border: 1px solid black;
    border-radius: 4px;
    line-height: 22px;
    &:hover {
        cursor: pointer;
        background-color: lightgreen;
    };
`;

type MonthPickerProps = {
    setGridAnimation: React.Dispatch<React.SetStateAction<GridAnimationVariant>>;
}

function MonthPicker({ setGridAnimation }: MonthPickerProps) {
    const monthIndex = useSelector(getMonthIndex);
    const year = useSelector(getYear);
    const month = MONTHS[monthIndex];

    const dispatch = useDispatch();

    function advanceMonth() {
        dispatch(advanceMonthAction({ monthIndex, year }));
    }
    
    function reverseMonth () {
        dispatch(reverseMonthAction({ monthIndex, year }));
    }

    function handleClickNext() {
        setGridAnimation("right");
        advanceMonth();
    }

    function handleClickPrevious() {
        setGridAnimation("left");
        reverseMonth();
    }

    return (
        <Container>
            <Button onClick={handleClickPrevious}>
                &lt;
            </Button>
            <h1>{month} {year}</h1>
            <Button onClick={handleClickNext}>
                &gt;
            </Button>
        </Container>
    );
}

export default MonthPicker;
