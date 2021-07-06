import { useRef, useState } from 'react';
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { getDates } from "../../redux/selectors";
import { WEEKDAYS } from "../../utils/dateTime";
import SchedulerCell from "./SchedulerCell";

const slideFromRight = keyframes`
    0% {
        transform: translateX(100%);
        opacity: 0;
    }
    50% {
        transform: translateX(20%);
        opacity: 0.5;
    }
    to {
        transform: translateX(0%);
        opacity: 1;
    }
`;
const slideOutFromRight = keyframes`
    0% {
        transform: translateX(0%);
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
    to {
        transform: translateX(-100%);
        opacity: 0;
    }
`;

const slideFromLeft = keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 0;
}
  50% {
    transform: translateX(-20%);
    opacity: 0.5;
}
  to {
    transform: translateX(0%);
    opacity: 1;
}
`;
const slideOutFromLeft = keyframes`
  0% {
    transform: translateX(0%);
    opacity: 1;
    }
  50% {
      opacity: 0.5;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

export type GridAnimationVariant = "left-phase-one" | "right-phase-one" | "left-phase-two" | "right-phase-two" | "idle";

type GridProps = {
    animationVariant: GridAnimationVariant;
};

function getGridAnimation(variant: GridAnimationVariant) {
    switch(variant) {
        case "left-phase-one": return slideOutFromLeft;
        case "right-phase-one": return slideOutFromRight;
        case "left-phase-two": return slideFromLeft;
        case "right-phase-two": return slideFromRight;
        case "idle": return "none";
    }
}

const Grid = styled.div<GridProps>`
    display: grid;
    position: relative;
    grid-template-columns: repeat(7, 1fr);
    animation: ${({animationVariant}) => getGridAnimation(animationVariant)} 200ms linear;
`;

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
    const newdates = useSelector(getDates);
    const [dates, setDates] = useState(newdates);
    enum AnimePhase {one = 1, two, three};
    const animePhase = useRef(AnimePhase.one);

    function onAnimationEnd() {
        animePhase.current = animePhase.current + 1;
        setDates(newdates);
        if (animePhase.current === AnimePhase.three) {
            setGridAnimation("idle");
            animePhase.current = AnimePhase.one;
        }
    }

    function mapVariant() {
        if  (animePhase.current === AnimePhase.two) {
            if (gridAnimation==="left-phase-one") return "left-phase-two" as GridAnimationVariant;
            else if (gridAnimation==="right-phase-one") return "right-phase-two" as GridAnimationVariant;
        }
        else return gridAnimation;
	}

    return (
        <Grid animationVariant={mapVariant()!} onAnimationEnd={onAnimationEnd}>
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
