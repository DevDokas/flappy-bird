import styled from "styled-components";

export const Bird = styled.div`
    position: absolute;
    background-color: red;
    height: ${(props) => props.size}px;
    width: ${(props) => props.size}px;
    margin-top: ${(props) => props.top}px;
    border: 0;
    border-radius: 50%;
`;