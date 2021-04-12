import axios from 'axios'
import {serverEndpoint} from '../ServerEndPoint'
export const Axios = axios.create({
    baseURL:serverEndpoint
})