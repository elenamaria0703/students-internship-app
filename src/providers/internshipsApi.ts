import {InternshipProps} from "../components/internships/InternshipProps";
import axios from 'axios';

const baseUrl = "http://localhost:8080/api/internship"
const config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
}

export const getInternships: () => Promise<any> = () => {
    return axios.get(`${baseUrl}/all`, config);
}

export const createInternship: (internship: InternshipProps) => Promise<any> = (internship) => {
    return axios.post(`${baseUrl}/new`, internship);
}

export const updateInternship: (internship: InternshipProps) => InternshipProps = (internship) => {
    return internship;
    // return withLogs(axios.put(`${issueUrl}/${issue.id}`, issue, authConfig(token)), 'updateInternship');
}

export const deleteInternship: (internship: InternshipProps) => Promise<any> = (internship) => {
    return axios.delete(`${baseUrl}/delete`, {...config, data: internship});
}