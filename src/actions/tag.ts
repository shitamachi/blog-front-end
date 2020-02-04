import { TagState } from "@/models/TagState"
import { ThunkAction } from "redux-thunk"
import { AppState } from "@/stores"
import { Action } from "redux"
import { getAllTagsByArticleId } from "@/api/api"

export const SET_TAGS = "SET_TAGS"
export type SET_TAGS_TYPE = typeof SET_TAGS

export interface SetTagsAction {
    type: SET_TAGS_TYPE
    payload: TagState
}

export const setTags = (tags: TagState) => ({
    type: SET_TAGS,
    payload: tags
})


export const fetchAllTagsByArticleId = (
    articleId: number
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    const rep = await getAllTagsByArticleId(articleId)
    dispatch(setTags(rep))
}

export type TagActionType = SetTagsAction