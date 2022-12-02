import axios from 'axios'
import {URL} from './URL'

export default axios.create({
    baseURL:URL,
    withCredentials:true,
    responseType:'json',
    headers:{
        application:'type/json'
    }
})