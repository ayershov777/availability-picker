import styled, { keyframes } from "styled-components";

export type GridAnimationVariant = "left" | "right" | "idle";

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

type DatePickerGridProps = {
    animationVariant: GridAnimationVariant;
};

const DatePickerGrid = styled.div<DatePickerGridProps>`
    display: grid;
    position: relative;
    grid-template-columns: repeat(7, 1fr);
    animation: ${({animationVariant}) => getGridAnimation(animationVariant)} 400ms ease-out;
`;

export default DatePickerGrid;
