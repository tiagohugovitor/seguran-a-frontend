import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useHistory } from "react-router-dom";
import { Form, Buttons, FlexBox, Title } from './styled'
import Api from '../../services/Api'

const AddStudent = ({ getKeyAndEncrypt }) => {

    let history = useHistory()

    const returnMenu = () => {
        history.push('/')
    }

    const [name, setName] = useState('')
    const [student_Registration, setStudent_Registration] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const addStudent = () => {
        const obj = {
            name: name,
            student_registration: student_Registration,
            email: email,
            phone: phone
        }
        getKeyAndEncrypt(obj)
        .then((data) => {
            Api.addStudent(data).then( res => {
                history.push('/students/list')
            })
        });
    }

    return (
        <FlexBox>
            <Form noValidate autoComplete="off">
                <Title>Adicionar Estudante</Title>
                <TextField margin="normal" onChange={(ev) => setName(ev.target.value)} required className="mg-10" id="name" label="Nome" variant="outlined"/>
                <TextField margin="normal" onChange={(ev) => setStudent_Registration(ev.target.value)} required id="student_registration" label="Matricula" variant="outlined" />
                <TextField margin="normal" onChange={(ev) => setEmail(ev.target.value)} required id="email" label="E-mail" variant="outlined" />
                <TextField margin="normal" onChange={(ev) => setPhone(ev.target.value)} required id="phone" label="Telefone" variant="outlined" />
                <Buttons>
                    <Button style={{ margin: 15 }} onClick={() => returnMenu()}> Voltar </Button>
                    <Button style={{ margin: 15 }} onClick={() => addStudent()}> Salvar </Button>         
                </Buttons>
            </Form>
        </FlexBox>
    )
}

export default AddStudent
