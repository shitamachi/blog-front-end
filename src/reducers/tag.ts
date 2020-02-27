import { TagState, Tag } from "@/models/TagState";
import { TagActionType, SET_TAGS } from "@/actions/tag";

const initialTagState: TagState = new Array<Tag>()

export const tagReducer = (
    state: TagState = initialTagState,
    action: TagActionType): TagState => {
    switch (action.type) {
        case SET_TAGS:
            return { ...action.payload }
        default:
            return state
    }
}