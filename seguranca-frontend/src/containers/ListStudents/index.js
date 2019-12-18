import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import UpdateStudent from '../UpdateStudent'
import { Content, Title, FlexBox } from './styled'
import Api from '../../services/Api'

const ListStudents = ({ getKey, decrypt }) => {
    let history = useHistory()

    const [indexUpdateStudent, setIndexUpdateStudent] = useState(0)
    const [updateStudent, setUpdateStudent] = useState(false)

    const [students, setStudents] = useState(() => [])

    const getStudents = () => {
        getKey()
        .then(({ rsaEncryptedAesKey, iv, encrypted}) => {   
            Api.getStudents(rsaEncryptedAesKey, iv, encrypted).then( res => {
                console.log(JSON.stringify(res));
                const result = decrypt(res.data,res.config.headers.iv)
                setStudents(result)
            })
        })
    }

    const goToUpdateStudent = (index) => {
        setIndexUpdateStudent(index)
        setUpdateStudent(true)
    }

    const returnMenu = () => {
        history.push('/')
    }

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },  
    });

    const classes = useStyles()
 
    const renderListStudent = () => {
        if(!students.length) {
            getStudents()
        }
        return (
            <FlexBox>
                <Content>
                    <Title> Estudantes </Title>
                    <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell align="right">Matricula</TableCell>
                            <TableCell align="right">Telefone</TableCell>
                            <TableCell align="right">Email</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {students.map((student, index) => (
                            <TableRow style={{cursor: 'pointer'}} onClick={() => goToUpdateStudent(index)} key={student.name}>
                            <TableCell component="th" scope="row">
                                {student.name}
                            </TableCell>
                            <TableCell align="right">{student.student_registration}</TableCell>
                            <TableCell align="right">{student.phone}</TableCell>
                            <TableCell align="right">{student.email}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <Button onClick={() => returnMenu()}>
                        Voltar
                    </Button>
                </Content>
            </FlexBox>
        )
    }

    return updateStudent
        ? <UpdateStudent student={students[indexUpdateStudent]} />
        : renderListStudent()

}

export default ListStudents
