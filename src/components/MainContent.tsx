import React from "react"
import { Route, Switch } from "react-router"
import { Breadcrumb } from "antd"
import ArticleList from "./ArticleList/ArticleList"
import ArticleDetail from "./ArticleDetail/ArticleDetail"
import Archive from "./Archive/Archive"
import CategoriesList from "./CategoriesList"
import { Layout } from 'antd'
import { inject, observer } from "mobx-react"
import { ArticleStore } from "../stores/ArticleStore"
import { RouterStore } from "mobx-react-router"
import { NavLink } from "react-router-dom"
import { SignIn } from "../pages/SignIn"
import { PrivateRoute } from "../pages/Authorized"
import { Test } from "../pages/Test"
import {SignUp} from "../pages/SignUp"
import NotFound from "../pages/NotFound"
import {TagsList} from "./TagsList"

const { Content } = Layout

interface IMainContentProps {
    article?: ArticleStore
    routing?: RouterStore
}

@inject("article", "routing")
@observer
class MainContent extends React.Component<IMainContentProps> {

    async componentDidMount(): Promise<void> {
        await this.props.article!.getArticle()
    }

    render() {
        let path: string[] = this.props.routing!.location.pathname
            .split("/")
            .filter((p: string) => p !== "")
        return (
            <Content style={{ padding: '0 50px' }}>
                {/*TODO maybe should extract as a stateless component*/}
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><NavLink to={`/`}>Home</NavLink></Breadcrumb.Item>
                    {
                        path.map((value, index) =>
                            <Breadcrumb.Item key={index}>
                                <NavLink to={`${this.props.routing!.location.pathname
                                    .slice(0, index).toString()}`}>{value}</NavLink>
                            </Breadcrumb.Item>
                        )
                    }
                </Breadcrumb>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    <Switch>
                        <Route exact path="/" component={ArticleList} />
                        <Route exact path="/article/:id" component={ArticleDetail} />
                        <Route exact path='/archive' component={Archive} />
                        <Route exact path="/category" component={CategoriesList} />
                        <Route exact path="/tags" component={TagsList} />
                        <Route exact path="/login" component={SignIn} />
                        <Route exact path="/register" component={SignUp} />
                        <Route path="/test" component={Test} />
                        {/* <Route path="*" component={NotFound}/> */}
                    </Switch>
                </div>
            </Content>
        )
    }
}

export default MainContent
