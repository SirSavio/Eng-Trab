
import { axios, apiURL } from './config.js';

class User {
    static async getAll(type = 'M') {
        try {
            const response = await axios.get(`${apiURL}/user/all/${type}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async getPatientByUser() {
        try {
            const response = await axios.get(`${apiURL}/user/doctor/patient`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async getUserById(id) {
        try {
            const response = await axios.get(`${apiURL}/user/${id}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async create(data) {
        try {
            const response = await axios.post(`${apiURL}/user`, data);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async update(data, id) {
        try {
            const response = await axios.put(`${apiURL}/user/${id}`, data);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async destroy(id){
        try {
            const response = await axios.delete(`${apiURL}/user/${id}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
}

export default User;