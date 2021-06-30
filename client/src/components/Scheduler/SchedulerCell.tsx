import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setSelectedDateAction } from "../../redux/actions";
import useScreenSize, { Breakpoints, ScreenSize } from '../../hooks/useScreenSize';

const Cell = styled.div`
    border: 1px solid black;
    margin: 2px;
    padding: 4px;
    height: calc(100vw/10);
 
    @media (max-width: ${Breakpoints.Small}px) {
        border: none;
        width: calc(100vw/10);
        line-height: calc(100vw/10);
        border-radius: 50%;
        text-align: center;
        
        &:hover {
            background-color: #1a73e8;
            color: white;
        }
    }
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
            {useScreenSize() > ScreenSize.Small ? date.toDateString().substring(4, 10) : date.getDate()}
        </Cell>
    );
}

export default SchedulerCell;
