import {observable, action, runInAction} from "mobx"
import {getCurrentUser} from "../api/api"

export interface User {
    userName: string
    nickName: string
    email: string
    avatar: string
    createTime: string
    userGroups: string[]
}

export class UserStore {
    @observable
    currentUser: User = {
        avatar: "", createTime: "", email: "", nickName: "",
        userGroups: Array<string>(), userName: ""
    }

    @action
    getCurrentUser = async () => {
        if (localStorage.getItem("token") === null) return
        let currentUser: User = await getCurrentUser()
        runInAction(() => this.currentUser = currentUser)
    }
}
