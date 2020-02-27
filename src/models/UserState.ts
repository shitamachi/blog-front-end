export interface UserState {
    userName: string
    nickName: string
    email: string
    avatar: string
    createTime: string
    userGroups: string[]
}

// attention: this type is only for transition
export type User = UserState