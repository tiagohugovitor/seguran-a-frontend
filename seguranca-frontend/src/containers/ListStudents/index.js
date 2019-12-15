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
import { Content, Title, FlexBox } from './styled'
import Api from '../../services/Api'

const ListStudents = () => {
    let history = useHistory()

    const getStudents = async () => {
        const resultado = []
        await Api.getStudents().then( res => {
            resultado = res
        })
        return resultado
    }

    const [students, setStudents] = useState(() => getStudents())

    const goToUpdateStudent = () => {
        history.push('/students/update')
    }

    const returnMenu = () => {
        history.push('/')
    }

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },  
    });
      
    function createData(name, student_registration, phone, email) {
        return { name, student_registration, phone, email};
    }
      
    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24),
        createData('Ice cream sandwich', 237, 9.0, 37),
        createData('Eclair', 262, 16.0, 24),
        createData('Cupcake', 305, 3.7, 67),
        createData('Gingerbread', 356, 16.0, 49),
    ];

    const classes = useStyles();
    return (
        <FlexBox>
            {console.log(students)}
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
                    {rows.map(row => (
                        <TableRow onClick={() => goToUpdateStudent()} key={row.name}>
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.student_registration}</TableCell>
                        <TableCell align="right">{row.phone}</TableCell>
                        <TableCell align="right">{row.email}</TableCell>
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

export default ListStudents
