import styled from "styled-components";
import CSS from "csstype";

type ModalContentContainerProps = {
    backgroundColor?: CSS.Property.BackgroundColor;
};

const ModalContentContainer = styled.div<ModalContentContainerProps>`
    z-index: 100;
    background-color: ${({ backgroundColor }) => backgroundColor || "white"};
`;

export default ModalContentContainer;