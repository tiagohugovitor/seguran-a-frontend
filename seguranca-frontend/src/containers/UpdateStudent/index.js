import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useHistory } from "react-router-dom";
import { Form, Buttons, FlexBox, Title } from './styled'
import Api from '../../services/Api'

const UpdateStudent = ({ student }) => {
    let history = useHistory()

    const returnMenu = () => {
        history.push('/')
    }

    const [newName, setNewName] = useState(student.name)
    const [newStudent_Registration, setNewStudent_Registration] = useState(student.student_registration)
    const [newEmail, setNewEmail] = useState(student.email)
    const [newPhone, setNewPhone] = useState(student.phone)

    const updateStudent = () => {
        const obj = {
            id: student.id,
            name: newName,
            student_registration: newStudent_Registration,
            email: newEmail,
            phone: newPhone
        }
        Api.updateStudent(obj).then( res => {
            history.push('/students/list')
        })
    }

    return (
        <FlexBox>
            <Form noValidate autoComplete="off">
                <Title>Atualizar Estudante</Title>
                <TextField defaultValue={student.name} onChange={(ev) => setNewName(ev.target.value)} margin="normal" required className="mg-10" id="name" label="Nome" variant="outlined"/>
                <TextField defaultValue={student.student_registration} onChange={(ev) => setNewStudent_Registration(ev.target.value)} margin="normal" required id="student_registration" label="Matricula" variant="outlined" />
                <TextField defaultValue={student.email} onChange={(ev) => setNewEmail(ev.target.value)} margin="normal" required id="email" label="E-mail" variant="outlined" />
                <TextField defaultValue={student.phone} onChange={(ev) => setNewPhone(ev.target.value)} margin="normal" required id="phone" label="Telefone" variant="outlined" />
                <Buttons>
                    <Button style={{ margin: 15 }} onClick={() => returnMenu()}> Voltar </Button>
                    <Button style={{ margin: 15 }} onClick={() => updateStudent()}> Atualizar </Button>         
                </Buttons>
            </Form>
        </FlexBox>
    )
}

export default UpdateStudent