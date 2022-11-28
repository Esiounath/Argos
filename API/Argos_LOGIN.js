import axios from 'axios'
import {URL} from './URL'

export default axios.create({
    baseURL:URL,
    method:'POST',
    timeout:1000,
    withCredentials:true,
    responseType:'json',
    headers:{
        application:'type/json'
    }
})