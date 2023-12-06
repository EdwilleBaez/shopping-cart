import styled from "styled-components";

export const Wrapper = styled.section`
    display: flex;
    justify-content: space-between;
    font-family: Arial, Helvetica, sans-serif;
    border-bottom: 1px solid lightblue;
    padding-bottom: 20px;

    div {
        flex: 1;
    }

    .information, .buttons {
        display: flex;
        justify-content: space-between;
    }

    img {
        max-width: 100px;
        object-fit: cover;
        margin-left: 40px;
        margin-top: 40px;
    }

    .button {
        background-color: white;
        border: 2px solid red;
        color: red;
        margin: auto 40px;
    }

    .button:hover {
        background-color: red;
        color: white;
    }
`;