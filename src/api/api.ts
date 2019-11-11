import Axios, {AxiosResponse} from 'axios'
import {Article} from "../components/ArticleList/ArticleList"
import {IArchive} from '../components/Archive/Archive'
import {ICategory} from '../components/Categories/Categories'
import {ICategoriesList} from '../components/CategoriesList'
import {Tag} from '../stores/TagStore'
import {SignInView} from "../pages/SignIn"
import {User} from "../stores/UserStore"
import {ITagsListList} from "../components/TagsList"

const BASE_URL: string = "http://localhost:5000/api"
const ARTICLES_URL: string = BASE_URL + '/articles'
const ARCHIVE_URL: string = BASE_URL + '/archives'
const CATEGORIES_URL: string = BASE_URL + '/categories'
const TAGS_URL: string = BASE_URL + '/tags'

const ACCOUNT_URL: string = BASE_URL + '/account'
const SIGN_IN_URL: string = ACCOUNT_URL + '/signIn'
const SIGN_UP_URL: string = ACCOUNT_URL + '/signUp'
const SIGN_OUT_URL: string = ACCOUNT_URL + '/signOut'
const PASSWORD_URL: string = ACCOUNT_URL + '/password'

export interface Response<T> {
    status: number
    message: string
    data: Array<T> | T
}

Axios.interceptors.request.use(config => {
    config.withCredentials = true
    let token = localStorage.getItem("token")
    if (token !== null) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, error => {
    console.log("request error")
    return Promise.reject(error)
})

Axios.interceptors.response.use(rep => {
        return rep
    },
    error => {
        Object.keys(error)
        if (error.response) {
            console.log('response status:' + error.response.status)
            switch (error.response.status) {
                case 401:
                    localStorage.removeItem("token")
                    window.location.href = "/login"
            }
        }
        return Promise.reject(error.response.data)
    }
)

export const getAllArticles = async (): Promise<Article[] | null> => {
    try {
        let response: AxiosResponse<Response<Article[]>> = await Axios.get(ARTICLES_URL)
        return response.data.data as Article[]
    } catch (err) {
        console.log(err)
        return null
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

export const postNewArticle = async (article: Article) => {
    let rep = await Axios.post(ARTICLES_URL, article)
    return rep
}

export const putEditArticle = (id: string, newValue: string) => {
    Axios.put(ARTICLES_URL, {id: id, content: newValue})
        .then(response => console.log(response.data))
        .catch(err => console.log(err))
}

export const deleteArticle = async (id: string) => {
    let rep: AxiosResponse<Response<{ isDeleted: string }>> = await Axios.delete(`${ARTICLES_URL}/${id}`)
    return rep
}

export const signIn = async (username: string, password: string, rememberMe: boolean): Promise<Response<SignInView>> => {
    try {
        let rep: AxiosResponse<Response<SignInView>> = await Axios
            .post(SIGN_IN_URL, {
                username: username,
                password: password,
                rememberMe: rememberMe
            })
        return rep.data as Response<SignInView>
    } catch (err) {
        // console.log(Object.keys(err), err.request)
        return err
    }
}

export const signUp = async (username: string, password: string): Promise<Response<{ username: string, token: string }>> => {
    try {
        let rep: AxiosResponse<Response<{ username: string, token: string }>> = await Axios.post(SIGN_UP_URL, {
            username: username,
            password: password
        })
        return rep.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const signOut = async () => {
    try {
        let rep = await Axios.get(SIGN_OUT_URL)
        return console.log(rep.data)
    } catch (err) {
        return console.log(err)
    }
}

export const getArchives = async (): Promise<Array<IArchive>> => {
    try {
        let rep: AxiosResponse<Response<IArchive>> = await Axios.get(ARCHIVE_URL)
        return rep.data.data as Array<IArchive>
    } catch (err) {
        console.log(err)
        return new Array<IArchive>()
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
        let rep: AxiosResponse<Response<ICategory>> = await Axios.get(`${CATEGORIES_URL}/${id}`)
        return rep.data.data as Array<ICategory>
    } catch (err) {
        return console.log(err)
    }
}

export const getAllTagsWithArticles = async (): Promise<ITagsListList[] | null> => {
    try {
        let rep: AxiosResponse<Response<Tag[]>> = await Axios.get(TAGS_URL)
        return rep.data.data as ITagsListList[]
    } catch (e) {
        console.log(e)
        return null
    }
}

export const getAllTagsByArticleId = async (id: number): Promise<Array<Tag>> => {
    try {
        let rep: AxiosResponse<Response<Tag>> = await Axios.get(`${TAGS_URL}/${id}`)
        return rep.data.data as Array<Tag>
    } catch (err) {
        console.log(err)
        return new Array<Tag>()
    }
}

export const getUserInfo = async (id: string) => {
    try {
        let rep: AxiosResponse<Response<User>> = await Axios.get(`${ACCOUNT_URL}/id`)
        return rep.data.data as User
    } catch (e) {
        console.log(e)
    }
}

export const getCurrentUser = async () => {
    try {
        let rep: AxiosResponse<Response<User>> = await Axios.get(`${ACCOUNT_URL}`)
        console.log(rep)
        return rep.data.data as User
    } catch (e) {
        console.log(e)
        return {
            avatar: "", createTime: "", email: "", nickName: "",
            userGroups: Array<string>(), userName: ""
        } as User
    }
}

export const updateUser = async (newUser: User) => {
    try {
        let rep = await Axios.put(ACCOUNT_URL, newUser)
        return rep
    } catch (err) {
        console.log(err)
        return {
            avatar: "", createTime: "", email: "", nickName: "",
            userGroups: Array<string>(), userName: ""
        } as User
    }
}

export const updatePassword = async (password: { userName?: string, oldPassword: string, newPassword: string }) => {
    let rep: AxiosResponse<Response<{ userName: string }>> = await Axios.post(PASSWORD_URL, password)
    return rep.data
}
