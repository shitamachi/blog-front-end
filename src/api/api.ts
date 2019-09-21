import Axios, {AxiosResponse} from 'axios'
import qs from 'qs'
import {Article} from "../components/ArticleList/ArticleList"
import {IArchive} from '../components/Archive/Archive'
import {ICategory} from '../components/Categories/Categories'
import {ICategoriesList} from '../components/CategoriesList'
import {Tag} from '../stores/TagStore'

const BASE_URL: string = "http://localhost:5000/api"
const ARTICLES_URL: string = BASE_URL + '/articles'
const SIGN_IN_URL: string = BASE_URL + '/signIn'
const SIGN_OUT_URL: string = BASE_URL + '/signOut'
const ARCHIVE_URL: string = BASE_URL + '/archives'
const CATEGORIES_URL: string = BASE_URL + '/categories'
const TAGS_URL: string = BASE_URL + '/tags'

export interface Response<T> {
    code: number
    message: string
    data: Array<T> | T
}

export const getAllArticles = async (): Promise<Article[] | void> => {
    try {
        let response: AxiosResponse<Response<Article[]>> = await Axios.get(ARTICLES_URL)
        return response.data.data as Article[]
    } catch (err) {
        return console.log(err)
    }
}

export const getArticleById = async (id: string) => {
    console.log(ARTICLES_URL + `/${id}`)
    try {
        const response = await Axios.get(ARTICLES_URL + `/${id}`)
        return response.data.data as Article
    } catch (err) {
        return console.log(err)
    }
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

export const getArchives = async (): Promise<Array<IArchive> | void> => {
    try {
        let rep: AxiosResponse<Response<IArchive>> = await Axios.get(ARCHIVE_URL)
        return rep.data.data as Array<IArchive>
    } catch (err) {
        return console.log(err)
    }
}

export const getAllCategoriesWithArticles = async (): Promise<Array<ICategoriesList> | void> => {
    try {
        let rep: AxiosResponse<Response<ICategoriesList>> = await Axios.get(CATEGORIES_URL)
        return rep.data.data as ICategoriesList[]
    } catch (err) {
        return console.log(err)
    }
}

export const getAllCategoriesByArticleId = async (id: string): Promise<Array<ICategory> | void> => {
    try {
        let rep: AxiosResponse<Response<ICategory>> = await Axios.get(`${CATEGORIES_URL}/${id}`,)
        return rep.data.data as Array<ICategory>
    } catch (err) {
        return console.log(err)
    }
}

export const getAllTagsWithArticles = async (): Promise<Tag[] | void> => {
    try {
        let rep: AxiosResponse<Response<Tag[]>> = await Axios.get(TAGS_URL)
        return rep.data.data as Tag[]
    } catch (e) {
        return console.log(e)
    }
}

export const getAllTagsByArticleId = async (id: number): Promise<Array<Tag> | void> => {
    try {
        let rep: AxiosResponse<Response<Tag>> = await Axios.get(`${TAGS_URL}/${id}`)
        return rep.data.data as Array<Tag>
    } catch (err) {
        return console.log(err)
    }
}
