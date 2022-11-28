import axios from 'axios'
import {GET_USER_URL} from './URL'

export default axios.create({
    baseURL:GET_USER_URL,
    method:'GET',
    timeout:2000,
    withCredentials:true,
    responseType:'json',
    headers:{
        application:'type/json'
    }
})