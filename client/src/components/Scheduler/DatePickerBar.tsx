import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { getSelectedDate } from "../../redux/selectors";

const slideDown = keyframes`
    from {
        height: 0;
    }

    to {
        height: 3.5rem;
    }
`;

const Container = styled.div`
    display: block;
    position: fixed;
    margin-left: auto;
    margin-right: auto;
    top: 0px;
    height: 3.5rem;
    width: 100%;
    border-bottom: 1px solid rgba(105, 105, 105, 0.5);
    margin-bottom: 1rem;
    z-index: 10;
    background-color: white;
    box-shadow: 1px 5px 5px grey;
    text-align: center;
    color: #1a73e8;
    font-weight: 600;
    font-size: 1.1rem;
    font-family: monospace;
    transition: filter 250ms;
    animation: ${slideDown} 0.3s ease-out;

    &:hover {
        filter: brightness(0.7);
    }
    
    & sub {
        cursor: pointer;
    }
`;

export default function DatePickerBar() {
    const selectedDate = useSelector(getSelectedDate);

    return (
        <Container>
            <p>
                {selectedDate?.toDateString()}
                {" "}
                <sub className="material-icons">expand_more</sub>
            </p>
        </Container> 
    )
}
