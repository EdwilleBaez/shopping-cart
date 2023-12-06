import styled from "styled-components";

export const Wrapper = styled.aside`
    font-family: Arial, Helvetica, sans-serif;
    width: 600px;
    padding: 200px;

    .button {
        background-color: white;
        border: 2px solid red;
        font-size: 16px;
        color: red;
        width: 40%;
        margin-left: 180px; 
    }

    .button:hover {
        background-color: red;
        color: white;
    }
`;