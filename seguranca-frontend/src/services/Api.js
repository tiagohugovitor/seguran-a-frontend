import axios from 'axios'

const url = 'localhost:8080'

const Services = {
    getStudents: () => 
        axios.get(
            `${url}/students`
        ),

}

export default Services
