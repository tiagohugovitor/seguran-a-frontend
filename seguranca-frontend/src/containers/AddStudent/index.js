import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useHistory } from "react-router-dom";
import { Form, Buttons, FlexBox, Title } from './styled'

const AddStudent = () => {

    let history = useHistory()

    const returnMenu = () => {
        history.push('/')
    }

    return (
        <FlexBox>
            
            <Form noValidate autoComplete="off">
                <Title>Adicionar Estudante</Title>
                <TextField margin="normal" required className="mg-10" id="name" label="Nome" variant="outlined"/>
                <TextField margin="normal" required id="student_registration" label="Matricula" variant="outlined" />
                <TextField margin="normal" required id="email" label="E-mail" variant="outlined" />
                <TextField margin="normal" required id="phone" label="Telefone" variant="outlined" />
                <Buttons>
                    <Button style={{ margin: 15 }} onClick={() => returnMenu()}> Voltar </Button>
                    <Button style={{ margin: 15 }} type="submit"> Salvar </Button>         
                </Buttons>
            </Form>
        </FlexBox>
    )
}

export default AddStudent
