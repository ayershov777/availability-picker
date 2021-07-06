import styled from "styled-components";

import DatePickerBody from "./DatePickerBody";
import MonthPicker from "../MonthPicker";
import { useRef, useState } from "react";
import { GridAnimationVariant } from "./DatePickerGrid";

const Container = styled.div`
    margin-left: auto;
    margin-right: auto;
    padding: 0 8px;
`;

export default function DatePicker() {
    const [gridAnimation, setGridAnimation] = useState<GridAnimationVariant>("idle");
    const datePickerPanelRef = useRef<HTMLDivElement>(null);

    return (
        <Container ref={datePickerPanelRef}>
            <MonthPicker setGridAnimation={setGridAnimation} />
            <DatePickerBody gridAnimation={gridAnimation} setGridAnimation={setGridAnimation} />
        </Container>
    );
}
