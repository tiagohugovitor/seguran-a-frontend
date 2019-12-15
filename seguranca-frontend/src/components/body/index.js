import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Menu from '../../containers/Menu'
import AddStudent from '../../containers/AddStudent'
import ListStudents from '../../containers/ListStudents'
import UpdateStudents from '../../containers/UpdateStudent'
import { CenterContainer } from './styled'

const BodyApp = () => {

    return (
        <CenterContainer>
            <Switch>
              <Route 
                exact
                path="/"
                component = {() => <Menu />}
              />
            </Switch>
            <Switch>
              <Route 
                path="/students/add"
                component = {() => <AddStudent />}
              />
            </Switch>
            <Switch>
              <Route 
                path="/students/list"
                component = {() => <ListStudents />}
              />
            </Switch>
            <Switch>
              <Route 
                path="/students/update"
                component = {() => <UpdateStudents />}
              />
            </Switch>
        </CenterContainer>
    )

}

export default BodyApp