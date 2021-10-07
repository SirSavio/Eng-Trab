
import { axios, apiURL } from './config.js';

class User {
    static async getAnamneseById(id) {
        try {
            const response = await axios.get(`${apiURL}/anamnese/${id}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async create(data) {
        try {
            const response = await axios.post(`${apiURL}/anamnese`, data);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async update(data, id) {
        try {
            const response = await axios.put(`${apiURL}/anamnese/${id}`, data);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
}

export default User;