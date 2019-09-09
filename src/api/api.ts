import Axios, {AxiosResponse} from 'axios'
import qs from 'qs'
import {Article} from "../components/ArticleList/ArticleList"

const BASE_URL: string = "http://localhost:5000/api"
const ARTICLES_URL: string = BASE_URL + '/articles'
const SIGN_IN_URL: string = BASE_URL + '/signIn'
const SIGN_OUT_URL: string = BASE_URL + '/signOut'

// window.console.log("初始化axios");

// axios.defaults.withCredentials = true;
// axios.interceptors.request.use(config => {
//     window.console.log("初始化拦截器");

//     const token = localStorage.getItem("token");
//     if (token) {
//         config.headers.Authorization = 'Bearer ' + token;
//     }
//     return config
// }, error => {
//     return Promise.reject(error);
// });
export interface Response<T> {
    code: number
    message: string
    data: Array<T> | T
}

export const getAllArticles = () => {
    return Axios.get(ARTICLES_URL)
        .then(response => {
            console.log(response)
            return response.data
        })
        .catch(err => console.log(err))
}

export const getArticleById = (id: string) => {
    console.log(ARTICLES_URL + `/${id}`)
    return Axios.get(ARTICLES_URL + `/${id}`)
        .then((response: AxiosResponse<Response<Article>>) => response.data.data as Article)
        .catch(err => console.log(err))
}

export const putEditArticle = (id: string, newValue: string) => {
    Axios.put(ARTICLES_URL, {id: id, content: newValue})
        .then(response => console.log(response.data))
        .catch(err => console.log(err))
}

export const signIn = (username: string, password: string) => {
    return Axios.post(SIGN_IN_URL, qs.stringify({username: username, password: password}))
        .catch(err => console.log(err))
}

export const signOut = () => {
    return Axios.get(SIGN_OUT_URL)
        .then(rep => console.log(rep.data))
        .catch(err => console.log(err))
}

