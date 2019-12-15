import React from 'react'
import { useHistory } from "react-router-dom";
import {
    Options,
    Option,
    FlexBox
} from './styled'

const Menu = () => {

    let history = useHistory()

    const pushAddRoute = () => {
        history.push("/students/add")
    }

    const pushListRoute = () => {
        history.push("/students/list")
    }

    const renderAddOption = () => (
        <Option onClick={() => pushAddRoute()}>
            Add Student
        </Option>
    )

    const renderListOption = () => (
        <Option onClick={() => pushListRoute()}>
            List all Students
        </Option>
    )

    return (
        <FlexBox>
            <Options>
                {renderAddOption()}
                {renderListOption()}
            </Options>
        </FlexBox>
    )
}

export default Menu
