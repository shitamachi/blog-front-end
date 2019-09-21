import React from 'react'
import BlogLayout from "./components/BlogLayout/BlogLayout"
import {Router} from "react-router"
import {Provider} from "mobx-react"
import {RouterStore, syncHistoryWithStore} from 'mobx-react-router'
import {createBrowserHistory} from 'history'
import {configure} from "mobx"
import {TagStore} from "./stores/TagStore"
import {ArticleStore} from "./stores/ArticleStore"

configure({
    enforceActions: "always"
})

const routingStore = new RouterStore()
const browserHistory = createBrowserHistory()
const history = syncHistoryWithStore(browserHistory, routingStore)

const stores = {
    article: new ArticleStore(),
    tag: new TagStore(),
    routing: routingStore,
}

const App: React.FC = () => {
    return (
        <Provider {...stores}>
            <Router history={history}>
                <BlogLayout/>
            </Router>
        </Provider>
    )
}

export default App
