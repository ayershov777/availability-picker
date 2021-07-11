import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { advanceMonthAction, reverseMonthAction } from "../../redux/actions";
import { getMonthIndex, getYear } from "../../redux/selectors";
import { MONTHS } from "../../utils/dateTime";
import { GridAnimationVariant } from "./DatePicker/DatePickerGrid";

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 5fr 1fr;
    padding: 16px 0;
`;

const Heading = styled.div`
    font-size: 1.5em;
    text-align: center;
    font-weight: bold;
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
    animateGrid: (variant: GridAnimationVariant) => Promise<void>;
};

function MonthPicker({ animateGrid }: MonthPickerProps) {
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

    async function handleClickNext() {
        await animateGrid("right-out");
        reverseMonth();
        await animateGrid("right-in");
    }

    async function handleClickPrevious() {
        await animateGrid("left-out");
        advanceMonth();
        await animateGrid("left-in");
    }

    return (
        <Container>
            <Button onClick={handleClickPrevious}>
                &lt;
            </Button>
            <Heading>{month} {year}</Heading>
            <Button onClick={handleClickNext}>
                &gt;
            </Button>
        </Container>
    );
}

export default MonthPicker;
