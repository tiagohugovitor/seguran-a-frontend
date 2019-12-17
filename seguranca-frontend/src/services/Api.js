import axios from 'axios'

const url = 'http://localhost:8080'

const Services = {
    getStudents: () => 
        axios.get(
            `${url}/students`
        ),
    addStudent: (data) =>
        axios.post(
            `${url}/student/`, data
        ),
    updateStudent: (data) =>
        axios.put(
            `${url}/student/`, data
        )
}

export default Services
