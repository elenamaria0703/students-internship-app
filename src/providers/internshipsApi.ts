import {InternshipProps} from "../components/internships/InternshipProps";

const internships: InternshipProps[] = [
    {
        _id: 1,
        title: "Job1",
        description: "Desc",
        location: "Bucuresti",
        duration: 120,
        salary: 1000,
        type: 'Remote'
    },
    {
        _id: 2,
        title: "Job2",
        description: "Desc2",
        location: "Cluj-Napoca",
        duration: 120,
        salary: 1500,
        type: 'Remote'
    },
    {
        _id: 3,
        title: "Job3",
        description: "Desc3",
        location: "Cluj-Napoca",
        duration: 120,
        salary: 1550,
        type: 'Remote'
    },
    {
        _id: 4,
        title: "Job4",
        description: "Desc4",
        location: "Cluj-Napoca",
        duration: 120,
        salary: 1500,
        type: 'Remote'
    },
    {
        _id: 5,
        title: "Job5",
        description: "Desc5",
        location: "Cluj-Napoca",
        duration: 120,
        salary: 1500,
        type: 'Remote'
    }
]

export const getInternships: () => InternshipProps[] = () => {
    return internships;
    // return withLogs(axios.get(issueUrl, authConfig(token)), 'getInternships');
}

export const createInternship: (internship: InternshipProps) => any[] = (internship) => {
    return [];
    // return withLogs(axios.post(issueUrl, issue, authConfig(token)), 'createInternship');
}

export const updateInternship: (internship: InternshipProps) => any[] = (internship) => {
    return [];
    // return withLogs(axios.put(`${issueUrl}/${issue._id}`, issue, authConfig(token)), 'updateInternship');
}