import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import {currentUserReducer} from "@/reducers/user";
import { tagReducer } from "./tag";
import { createBrowserHistory } from "history"

export const history = createBrowserHistory()

export const rootReducer = combineReducers({
    router: connectRouter(history),
    currentUser: currentUserReducer,
    tag: tagReducer
})



