// Actual backend API call
import axios from "./axios"; //important axios instance with base url
import { API } from "./endpoints";

export const register = async (registerData:any) =>{
    try {
        const response = await axios.post(API.AUTH.REGISTER, registerData);
        return response.data; //respone ko body(what backend return )
    }catch(error: Error | any){
        throw new Error(
            error.response?.data?.message
            || error.message  //general axios error message
            || "Registration failed"); //fallback message
    }
}

export const login = async (loginData:any) =>{
    try {
        const response = await axios.post(API.AUTH.LOGIN, loginData);
        return response.data; //respone ko body(what backend return )
    }catch(error: Error | any){
        throw new Error(
            error.response?.data?.message
            || error.message  //general axios error message
            || "Login failed"); //fallback message
    }
}