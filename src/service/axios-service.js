import { Observable } from 'rxjs';
import axios from 'axios';

const axiosPost = (url, body, headers = { 'UserName': JSON.parse(sessionStorage.getItem('UserName')), 'Content-Type': 'application/json; charset=utf-8', 'Session': JSON.parse(sessionStorage.getItem('Session')), 'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('WebToken')) }) => {
    return Observable.fromPromise(axios.post(url, JSON.stringify(body), { headers }));
}


const axiosPut = (url, body, headers = { 'UserName': JSON.parse(sessionStorage.getItem('UserName')), 'Content-Type': 'application/json; charset=utf-8', 'Session': JSON.parse(sessionStorage.getItem('Session')), 'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('WebToken')) }) => {
    return Observable.fromPromise(axios.put(url, JSON.stringify(body), { headers }));
}


const axiosDelete = (url, headers = { 'UserName': JSON.parse(sessionStorage.getItem('UserName')), 'Content-Type': 'application/json; charset=utf-8', 'Session': JSON.parse(sessionStorage.getItem('Session')), 'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('WebToken')) }) => {
    return Observable.fromPromise(axios.delete(url, { headers }));
}

const axiosGet = (url, headers = { 'UserName': JSON.parse(sessionStorage.getItem('UserName')), 'Content-Type': 'application/json; charset=utf-8', 'Session': JSON.parse(sessionStorage.getItem('Session')), 'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('WebToken')) }) => {
    return Observable.fromPromise(axios.get(url, { headers }));
}

const axiosGetParams = (url, params, headers = { 'UserName': JSON.parse(sessionStorage.getItem('UserName')), 'Content-Type': 'application/json; charset=utf-8', 'Session': JSON.parse(sessionStorage.getItem('Session')), 'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('WebToken')) }) => {
    return Observable.fromPromise(axios.get(url, { params, headers }));
}
const axiosDeleteParams = (url, params, headers = { 'UserName': JSON.parse(sessionStorage.getItem('UserName')), 'Content-Type': 'application/json; charset=utf-8', 'Session': JSON.parse(sessionStorage.getItem('Session')), 'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('WebToken')) }) => {
    return Observable.fromPromise(axios.delete(url, { params, headers }));
}

export {
    axiosGet,
    axiosPost,
    axiosPut,
    axiosDelete,
    axiosGetParams,
    axiosDeleteParams
}