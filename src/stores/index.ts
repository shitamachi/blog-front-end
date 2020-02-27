import { applyMiddleware, createStore } from "redux"
import { routerMiddleware } from "connected-react-router"
import { rootReducer } from "@/reducers"
import { composeWithDevTools } from "redux-devtools-extension"
import { persistStore, persistReducer } from 'redux-persist'
// defaults to localStorage for web
import storage from 'redux-persist/lib/storage'
import thunk from "redux-thunk"
import { history } from "@/reducers"
// export const history = createBrowserHistory()

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore(preloadedState?: any) {
    // const middlewares = [thunkMiddleware];
    // const middleWareEnhancer = applyMiddleware(...middlewares);

    // enhancer is a function
    const store = createStore(
        persistedReducer,
        preloadedState,
        composeWithDevTools(
            applyMiddleware(routerMiddleware(history)),
            applyMiddleware(thunk)
            // other store enhancers if any
        ),
    )
    let persistor = persistStore(store)
    return { store, persistor }
}
