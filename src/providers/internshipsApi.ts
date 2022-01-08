import {InternshipProps} from "../components/internships/InternshipProps";
import axios from 'axios';

const baseUrl = "http://localhost:8080/api/internship"

export const getInternships: () => Promise<any> = () => {
    return axios.get(`${baseUrl}/all`);
}

export const createInternship: (internship: InternshipProps) => Promise<any> = (internship) => {
    return axios.post(`${baseUrl}/new`, internship);
}

export const updateInternship: (internship: InternshipProps) => InternshipProps = (internship) => {
    return internship;
    // return withLogs(axios.put(`${issueUrl}/${issue.id}`, issue, authConfig(token)), 'updateInternship');
}