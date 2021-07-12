import styled from "styled-components";

import DatePickerBody from "./DatePickerBody";
import MonthPicker from "../MonthPicker";
import { useCallback, useRef, useState } from "react";
import { GridAnimationVariant } from "./DatePickerGrid";

const Container = styled.div`
    margin-left: auto;
    margin-right: auto;
    padding: 0 8px;
`;

type DatePickerProps = {
    expanded: boolean | undefined;
};

export default function DatePicker({expanded}: DatePickerProps) {
    const [gridAnimation, setGridAnimation] = useState<GridAnimationVariant>("idle");
    const datePickerPanelRef = useRef<HTMLDivElement>(null);

    const [resolveAnimationEnded, setResolveAnimationEnded] = useState<(value: void | PromiseLike<void>) => void>();

    const animateGrid = useCallback((variant: GridAnimationVariant) => (
        new Promise<void>((resolve) => {
            setGridAnimation(variant);
            setResolveAnimationEnded(() => resolve);
        })
    ), []);

    return (
        <Container ref={datePickerPanelRef}>
            <MonthPicker animateGrid={animateGrid} />
            {expanded && 
                <DatePickerBody gridAnimation={gridAnimation} resolveAnimationEnded={resolveAnimationEnded} />
            }
        </Container>
    );
}
