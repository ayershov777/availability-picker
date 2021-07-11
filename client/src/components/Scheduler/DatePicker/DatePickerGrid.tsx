import styled, { keyframes } from "styled-components";

export type GridAnimationVariant = "left-in" | "right-in" | "left-out" | "right-out" | "idle";

const slideOutFromRight = keyframes`
    0% {
        transform: translateX(0%);
        opacity: 1;
    }
    to {
        transform: translateX(-100%);
        opacity: 0;
    }
`;

const slideOutFromLeft = keyframes`
  0% {
    transform: translateX(0%);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const slideInFromRight = keyframes`
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

const slideInFromLeft = keyframes`
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

type GridProps = {
    animationVariant: GridAnimationVariant;
};

const Grid = styled.div<GridProps>`
    display: grid;
    position: relative;
    animation: ${({animationVariant}) => getGridAnimation(animationVariant)} 200ms ease-out;
`;

export const LargeDatePickerGrid = styled(Grid)`
    grid-template-columns: repeat(7, 40px);
    grid-template-rows: repeat(7, 40px);
`;

export const DefaultDatePickerGrid = styled(Grid)`
    grid-template-columns: repeat(7, 48px);
    grid-template-rows: repeat(7, 40px);
`;

function getGridAnimation(variant: GridAnimationVariant) {
    switch(variant) {
        case "left-in": return slideInFromLeft;
        case "right-in": return slideInFromRight;
        case "left-out": return slideOutFromLeft;
        case "right-out": return slideOutFromRight;
        case "idle": return "none";
    }
}
