import { UserState } from "@/models/UserState"
import { getCurrentUser } from "@/api/api"
import { ThunkAction } from "redux-thunk"
import { AppState } from "@/stores"
import { Action } from "redux"

export const SET_CURRENT_USER = "SET_CURRENT_USER"
export const REMOVE_CURRENT_USER = "REMOVE_CURRENT_USER"
export const GET_CURRENT_USER = "GET_CURRENT_USER"

export type SET_CURRENT_USER_TYPE = typeof SET_CURRENT_USER
export type REMOVE_CURRENT_USER_TYPE = typeof REMOVE_CURRENT_USER
export type GET_CURRENT_USER_TYPE = typeof GET_CURRENT_USER

interface SetCurrentUserAction {
    type: SET_CURRENT_USER_TYPE
    payload: UserState
}

interface RemoveCurrentUserAction {
    type: REMOVE_CURRENT_USER_TYPE
}

interface GetCurrentUserAction {
    type: GET_CURRENT_USER_TYPE
    payload: UserState
}

// actions creator: type ActionCreator = (...args: any) => Action | AsyncAction
export const setCurrentUser = (newCurrentUser: UserState) => ({
    type: SET_CURRENT_USER,
    payload: newCurrentUser
})

export const removeCurrentUser = () => ({
    type: REMOVE_CURRENT_USER,
})

export const fetchCurrentUser = (
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    const rep = await getCurrentUser()
    dispatch(setCurrentUser(rep))
}

export type UserAction = SetCurrentUserAction | RemoveCurrentUserAction | GetCurrentUserAction
export type FetchCurrentUserAction = GetCurrentUserAction