import axios from 'axios'

const url = 'http://localhost:8080'

const Services = {
    getStudents: (rsaEncryptedAesKey, iv) =>
        axios.get(
            `${url}/students`, {
                'headers': { rsaEncryptedAesKey: rsaEncryptedAesKey, iv: iv}
            }
        ),
    addStudent: (data) =>
        axios.post(
            `${url}/student/`, data
        ),
    updateStudent: (data) =>
        axios.put(
            `${url}/student/`, data
        ),
    getPublicKey: () =>
        axios.get(`${url}/getPublicKey`)
}

export default Services
