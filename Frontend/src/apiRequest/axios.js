import apiClient from "./ApiRequest";

const getRequest = async (url, config = {}) => {
    try {
        const response = await apiClient.get(url, config);
        return response;
    } catch (error) {
        return error;
    }
}

const postRequest = async (url, data, config = {})=>{
    try {
        const response = await apiClient.post(url, data, config);
        return response;
    } catch (error) {
        return error;
    }
}

const deleteRequest = async (url, config = {})=>{
    try {
        const response = await apiClient.delete(url, config);
        return response;
    } catch (error) {
        return error;
    }
}

const putRequest = async (url, data,config = {})=>{
    try {
        const response = await apiClient.put(url, data, config);
        return response;
    } catch (error) {
        return error;
    }
}

export {getRequest, postRequest, deleteRequest, putRequest};