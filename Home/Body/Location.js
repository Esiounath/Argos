import axios from 'axios'
//URL du boutton SOS pour l'accès de la localisation de l'utilisateur sur Google Maps
export default axios.create({
    baseURL:"https://www.google.com/maps/search/?api=1&",
    method:'POST',
    timeout:1000,
    withCredentials:true,
    responseType:'json',
    headers:{
        application:'type/json'
    }
})