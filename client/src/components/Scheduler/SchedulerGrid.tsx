import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { getDates } from "../../redux/selectors";
import { WEEKDAYS } from "../../utils/dateTime";
import SchedulerCell from "./SchedulerCell";

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
const slideOutFromRight = keyframes`
    0% {
        transform: translateX(0%);
    }
    to {
        transform: translateX(-100%);
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
const slideOutFromLeft = keyframes`
  0% {
    transform: translateX(0%);
  }
  to {
    transform: translateX(100%);
  }
`;

export type GridAnimationVariant = "left" | "right" | "idle";
enum AnimePhase {one = 1, two, three};

type GridProps = {
    animationVariant: GridAnimationVariant;
    animePhase: AnimePhase;
};

function getGridAnimation(variant: GridAnimationVariant) {
    switch(variant) {
        case "left": return slideFromLeft;
        case "right": return slideFromRight;
        case "idle": return "none";
    }
}
function getGridAnimationSlideOut(variant: GridAnimationVariant) {
    switch(variant) {
        case "left": return slideOutFromLeft;
        case "right": return slideOutFromRight;
        case "idle": return "none";
    }
}

const Grid = styled.div<GridProps>`
    display: grid;
    position: relative;
    grid-template-columns: repeat(7, 1fr);
    animation: ${({animationVariant, animePhase}) => animePhase===AnimePhase.one ? getGridAnimationSlideOut(animationVariant) : getGridAnimation(animationVariant)} 200ms linear;
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
    const animePhase = useRef(AnimePhase.one);

    function onAnimationEnd() {
        animePhase.current = animePhase.current + 1;
        setDates(newdates);
        if (animePhase.current === AnimePhase.three) setGridAnimation("idle");
    }

    useEffect(() => {
        if (animePhase.current === AnimePhase.three) animePhase.current = AnimePhase.one;
    })

    return (
        <Grid animationVariant={gridAnimation} animePhase={animePhase.current} onAnimationEnd={onAnimationEnd}>
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
