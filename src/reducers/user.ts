import { UserState } from "@/models/UserState";
import { UserAction, REMOVE_CURRENT_USER, SET_CURRENT_USER, GET_CURRENT_USER } from "@/actions";

const initialUserState: UserState = {
    avatar: "",
    createTime: "",
    email: "",
    nickName: "",
    userGroups: new Array<string>(),
    userName: ""
}

export function currentUserReducer(
    state: UserState = initialUserState,
    action: UserAction
): UserState {
    switch (action.type) {
        case SET_CURRENT_USER:
            return action.payload
        case REMOVE_CURRENT_USER:
            return initialUserState
        case GET_CURRENT_USER:
            return action.payload
        default:
            return state
    }
}