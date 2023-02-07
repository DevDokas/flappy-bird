import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

export const GameBox = styled.div`
    height: ${(props) => props.height}px;
    width: ${(props) => props.width}px;
    background-color: green;
`;