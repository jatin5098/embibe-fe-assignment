import axios from 'axios';

// API
import { ALL_STUDENTS } from './Endpoints';

export const getStudentDetails = () => {
    return axios.get(ALL_STUDENTS);
}