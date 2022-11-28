import axios from 'axios'
import {USER_LOGIN_URL} from './URL'

export default axios.create({
    baseURL:USER_LOGIN_URL,
    method:'POST',
    timeout:1000,
    withCredentials:true,
    responseType:'json',
    headers:{
        application:'type/json'
    }
})