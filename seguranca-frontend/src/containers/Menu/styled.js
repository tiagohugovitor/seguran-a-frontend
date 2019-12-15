import styled from 'styled-components'

export const FlexBox = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
`
export const Options = styled.div`
    display: flex;
    position: absolute;
    top: 25%;
    right: 25%;
    left: 25%;
    padding: 10px;
    bottom: 25%;
    background-color: gray;
    flex-direction: column;
    justify-content: center;
    flex-wrap: 1;
`

export const Option = styled.button`
    text-align: center;
    margin: 10px;
    background-color: gray;
    border: 1px solid black;
    border-radius: 15px;
    justify-content: center;
    height: 200px;
    &:hover {
        background-color: #4F4F4F;
    }
`
