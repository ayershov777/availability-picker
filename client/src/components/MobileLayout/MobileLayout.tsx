import React, { cloneElement, ReactElement, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { ReactComponentElement } from 'react';

type MobileLayoutProps = {
    keepOpen: boolean;
    TopComponent: ReactComponentElement<any>;
    BottomComponent: ReactElement;
    children: string | JSX.Element | JSX.Element[];
};

const slide = (start: number, end: number) => keyframes`
    0% { height: ${start}px;}
    100% { height: ${end}px}
`;
// const turn = (direction: number) => keyframes`
//     0% { height: ${direction>0 ? }px;}
//     100% { height: ${end}px}
// `;
const Container = styled.div`
    display: grid;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    grid-template-rows: auto 1fr auto;
`;
const Top = styled.div`
    min-height: 6vh;
    background-color: #eee;
    border-bottom: 1px solid gray;
    box-shadow: 0 8px 5px -5px gray;

    &>i {
        position: absolute;
        top: 0;
        right: 1rem;
        font-size: 3rem;
        color: #555;
        z-index: 1;
    }
`;
const Bottom = styled.div<{start: number, end: number}>`
    position: relative;
    padding-top: 2rem;
    align-items: center;
    min-height: 6vh;
    background-color: #eee;
    border-top: 1px solid gray;
    box-shadow: 0 -8px 5px -5px gray;
    overflow: hidden;
    cursor: pointer;
    animation: ${props => slide(props.start, props.end)} 500ms;

    &>i {
        position: absolute;
        top: 0px;
        right: 50%;
        font-size: 3rem;
        color: #555;
        z-index: 1;
        transform: ${props => props.start > props.end ? 'rotate(0.5turn)' : 'rotate(-0.5turn)'};
        transform-origin: center;
        transition: transform 500ms;
    }
`;
const Middle = styled.div`
    overflow-y: auto;
`;

function MobileLayout({ keepOpen, TopComponent, BottomComponent, children }: MobileLayoutProps) {
    const [bottomExpanded, setBottomExpanded] = useState(false);
    
    return (
    <Container>
        <Top>
            <i className="material-icons">
                expand_more
            </i>
            {TopComponent}
        </Top>
        <Middle>
            {children} 
        </Middle>
        <Bottom start={bottomExpanded ? 0 : 300} end={bottomExpanded ? 300 : 0}>
            <i className="material-icons" onClick={e=>setBottomExpanded((prev)=>!prev)} >
                {bottomExpanded ? 'expand_less' : 'expand_more' }
            </i>
            {cloneElement(BottomComponent, {...BottomComponent.props, expanded: bottomExpanded}) }
        </Bottom>
    </Container>)
}

export default MobileLayout;