
import { axios, apiURL } from './config.js';

class User {
    static async getPatientAttendance(id) {
        try {
            const response = await axios.get(`${apiURL}/attendance/patient/${id}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async getDoctorAttendance(id) {
        try {
            const response = await axios.get(`${apiURL}/attendance/doctor/${id}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }


    static async getAttendanceById(id) {
        try {
            const response = await axios.get(`${apiURL}/attendance/${id}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async create(data) {
        try {
            const response = await axios.post(`${apiURL}/attendance`, data);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async update(data, id) {
        try {
            const response = await axios.put(`${apiURL}/attendance/${id}`, data);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async destroy(id){
        try {
            const response = await axios.delete(`${apiURL}/attendance/${id}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
}

export default User;