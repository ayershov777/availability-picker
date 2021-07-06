import { useSelector } from "react-redux";
import styled from "styled-components";
import { getDates } from "../../redux/selectors";
import { WEEKDAYS } from "../../utils/dateTime";
import SchedulerCell from "./SchedulerCell";
import { default as Container, GridAnimationVariant } from "./SchedulerGridContainer";

const WeekdayLabel = styled.div`
    text-align: center;
    font-size: 14pt;
    font-weight: bold;
    margin: 0 2px;
`;

type SchedulerGridProps = {
    gridAnimation: GridAnimationVariant;
    setGridAnimation: React.Dispatch<React.SetStateAction<GridAnimationVariant>>;
};

export default function SchedulerGrid({ gridAnimation, setGridAnimation }: SchedulerGridProps) {
    const dates = useSelector(getDates);

    function onAnimationEnd() {
        setGridAnimation("idle");
    }

    return (
        <Container animationVariant={gridAnimation} onAnimationEnd={onAnimationEnd}>
            {WEEKDAYS.map((weekday, idx) => (
                <WeekdayLabel key={`weekday-label-${idx}`}>
                    {weekday}
                </WeekdayLabel>
            ))}
            {dates.map((date, idx) => (
                <SchedulerCell
                    key={`scheduler-item-${idx}`}
                    date={date}
                />
            ))}
        </Container>
    );
}
