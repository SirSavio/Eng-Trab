
import { axios, apiURL } from './config.js';

class User {
    static async getPatientSchedulings(id) {
        try {
            const response = await axios.get(`${apiURL}/scheduling/patient/${id}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async getDoctorSchedulings(id) {
        try {
            const response = await axios.get(`${apiURL}/scheduling/doctor/${id}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async getSecretarySchedulings(id) {
        try {
            const response = await axios.get(`${apiURL}/scheduling/secretary/${id}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async getSchedulingById(id) {
        try {
            const response = await axios.get(`${apiURL}/scheduling/${id}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async create(data) {
        try {
            const response = await axios.post(`${apiURL}/scheduling`, data);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async update(data, id) {
        try {
            const response = await axios.put(`${apiURL}/scheduling/${id}`, data);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async destroy(id){
        try {
            const response = await axios.delete(`${apiURL}/scheduling/${id}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
}

export default User;