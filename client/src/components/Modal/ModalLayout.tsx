import styled from "styled-components";
import CSS from "csstype";
import { fadeIn } from "../../utils/keyframes";

type ModalLayoutProps = {
    top: CSS.Property.Top;
};

const ModalLayout = styled.div<ModalLayoutProps>`
    position: absolute;
    display: flex;
    width: 100%;
    height: 100vh;
    top: ${({ top }) => top};
    left: 0;
    justify-content: center;
    align-items: center;
    animation: 0.25s ${fadeIn} ease-out;
`;

export default ModalLayout;