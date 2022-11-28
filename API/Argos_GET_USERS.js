import axios from 'axios'
import {URL} from './URL'

export default axios.create({
    baseURL:URL,
    method:'GET',
    timeout:2000,
    withCredentials:true,
    responseType:'json',
    headers:{
        application:'type/json'
    }
})