import styled from "styled-components";

export const Obstacle = styled.div`
    position: relative;
    top: ${(props) => props.top}px;
    left: ${(props) => props.left}px;
    background-color: blue;
    height: ${(props) => props.height}px;
    width: ${(props) => props.width}px;
`;