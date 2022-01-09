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

export const updateInternship: (internship: InternshipProps) => Promise<any> = (internship) => {
    return axios.put(`${baseUrl}/update`, internship);
}

export const deleteInternship: (internship: InternshipProps) => Promise<any> = (internship) => {
    return axios.delete(`${baseUrl}/delete`, {...config, data: internship});
}