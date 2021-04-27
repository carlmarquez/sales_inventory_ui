import axios from 'axios'
import {serverEndpoint} from '../../utils/ServerEndPoint'

let token = localStorage.getItem('jars-token')
export const baseUrlWithAuth = axios.create({
    headers: {
        Authorization: "Bearer " + token
    },
    baseURL: serverEndpoint
})



