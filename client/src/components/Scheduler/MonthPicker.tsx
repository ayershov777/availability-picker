import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { advanceMonthAction, reverseMonthAction } from "../../redux/actions";
import { getMonthIndex, getYear } from "../../redux/selectors";
import { MONTHS } from "../../utils/dateTime";

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

function MonthPicker() {
    const monthIndex = useSelector(getMonthIndex);
    const year = useSelector(getYear);

    const dispatch = useDispatch();

    function advanceMonth() {
        dispatch(advanceMonthAction({ monthIndex, year }));
    }
    
    function reverseMonth () {
        dispatch(reverseMonthAction({ monthIndex, year }));
    }

    function handleClickNext(e: React.MouseEvent<HTMLButtonElement>) {
        advanceMonth();
    }

    function handleClickPrevious(e: React.MouseEvent<HTMLButtonElement>) {
        reverseMonth();
    }

    const month = MONTHS[monthIndex];

    function getNextMonth() {
        if(monthIndex === 11) {
            return MONTHS[0];
        }
        
        return MONTHS[monthIndex + 1]
    }

    function getPreviousMonth() {
        if(monthIndex === 0) {
            return MONTHS[11];
        }

        return MONTHS[monthIndex - 1]
    }

    return (
        <Container>
            <Button onClick={handleClickPrevious}>
                &lt; {getPreviousMonth()}
            </Button>
            <h1>{month} {year}</h1>
            <Button onClick={handleClickNext}>
                {getNextMonth()} &gt;
            </Button>
        </Container>
    );
}

export default MonthPicker;
