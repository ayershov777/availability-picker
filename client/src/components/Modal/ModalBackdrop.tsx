import styled from "styled-components";
import CSS from "csstype";

type ModalBackdropProps = {
    backgroundColor?: CSS.Property.BackgroundColor;
};

const ModalBackdrop = styled.div<ModalBackdropProps>`
    position: absolute;
    width: 100%;
    height: 100vh;
    left: 0;
    background-color: ${({ backgroundColor }) => backgroundColor || "rgba(0, 0, 0, 0.75)"};
`;

export default ModalBackdrop;