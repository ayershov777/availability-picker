import styled from "styled-components";

import SchedulerGrid from "./SchedulerGrid";
import MonthPicker from "./MonthPicker";
import TimeSelector from "../TimeSelector/TimeSelector";
import useViewport, { Viewport } from "../../hooks/useViewport";
import { useState } from "react";
import { GridAnimationVariant } from "./SchedulerGridContainer";

const Container = styled.div<{viewport: Viewport}>`
    display: flex;
    flex-flow: ${({viewport})=>viewport <= Viewport.SM ? 'wrap' : 'nowrap'};
`;

const DatePickerPanelDesktop = styled.div`
    position: sticky;
    top: 0px;
    display: inline-block;
    vertical-align: top;
    margin 0 8px;
`;

const DatePickerPanelMobile = styled.div`
    display: block;
    margin-left: auto;
    margin-right: auto;
`;

function Scheduler() {
    const viewport = useViewport();
    const DatePickerPanel = viewport >= Viewport.SM ? DatePickerPanelDesktop : DatePickerPanelMobile;
    const [gridAnimation, setGridAnimation] = useState<GridAnimationVariant>("idle");

    return (
        <Container viewport={viewport}>
            <DatePickerPanel>
                <MonthPicker setGridAnimation={setGridAnimation} />
                <SchedulerGrid gridAnimation={gridAnimation} setGridAnimation={setGridAnimation} />
            </DatePickerPanel>
            
            <TimeSelector />
        </Container>
    );
}

export default Scheduler;
