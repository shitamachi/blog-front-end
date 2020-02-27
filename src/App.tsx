import React from 'react'
import { BasicLayout } from './layouts/BasicLayout'
import { Provider } from "react-redux"
import configureStore from "./stores"
import { ConnectedRouter } from "connected-react-router"
import { PersistGate } from "redux-persist/integration/react"
import { history } from "@/reducers"

export const { store, persistor } = configureStore()

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <PersistGate loading={null} persistor={persistor}>
                    <BasicLayout />
                </PersistGate>
            </ConnectedRouter>
        </Provider>
    )
}

export default App
