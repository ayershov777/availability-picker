import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { getDates } from "../../redux/selectors";
import { WEEKDAYS } from "../../utils/dateTime";
import SchedulerCell from "./SchedulerCell";

export type GridAnimationVariant = "left" | "right" | "idle";

type GridProps = {
    animationVariant: GridAnimationVariant;
};

const Grid = styled.div<GridProps>`
    display: grid;
    position: relative;
    grid-template-columns: repeat(7, 1fr);
    animation: ${({animationVariant}) => getGridAnimation(animationVariant)} 400ms ease-out;
`;

const slideFromRight = keyframes`
    0% {
        transform: translateX(100%);
    }
    50% {
        transform: translateX(20%);
    }
    to {
        transform: translateX(0%);
    }
`;

const slideFromLeft = keyframes`
    0% {
        transform: translateX(-100%);
    }
    50% {
        transform: translateX(-20%);
    }
    to {
        transform: translateX(0%);
    }
`;

function getGridAnimation(variant: GridAnimationVariant) {
    switch(variant) {
        case "left": return slideFromLeft;
        case "right": return slideFromRight;
        case "idle": return "none";
    }
}

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
        <Grid animationVariant={gridAnimation} onAnimationEnd={onAnimationEnd}>
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
        </Grid>
    );
}
