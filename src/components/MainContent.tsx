import React from "react"
import { Route, Switch } from "react-router"
import { Breadcrumb } from "antd"
import ArticleList from "./ArticleList/ArticleList"
import ArticleDetail from "./ArticleDetail/ArticleDetail"
import Archive from "./Archive/Archive"
import CategoriesList from "./CategoriesList"
import { Layout } from 'antd'
// import { RouterStore } from "mobx-react-router"
import { NavLink } from "react-router-dom"
import { SignIn } from "@/pages/login/SignIn"
import { Test } from "@/pages/Test"
import { SignUp } from "@/pages/register/SignUp"
import { TagsList } from "./TagsList"

const { Content } = Layout

interface IMainContentProps {
    // article?: ArticleStore
    // routing?: RouterStore
    pathname: string
}

// @inject("article", "routing")
// @observer
class MainContent extends React.Component<IMainContentProps> {

    async componentDidMount(): Promise<void> {
        // await this.props.article!.fetchArticle()
    }

    generateBreadcrumbItem = (pathArray: string[]) => {
        let url = '/'
        return pathArray.map((value, index) => {
            url = url + value + '/'
            return (<Breadcrumb.Item key={index}>
                {/* <NavLink to={`${pathArr.slice(0, index + 1).join('/')}`}>{`${value} i ${index} v ${value.toString()}`}</NavLink> */}
                <NavLink to={`${url}`}>{`${value}`}</NavLink>
            </Breadcrumb.Item>)
        })
    }

    render() {
        const { pathname } = this.props
        console.log(pathname)
        let pathArr: string[] = pathname
            .split("/")
            .filter((p: string) => p !== "")
        console.log(pathArr)
        return (
            <Content style={{ padding: '0 50px' }}>
                {/*TODO maybe should extract as a stateless component*/}
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><NavLink to={`/`}>Home</NavLink></Breadcrumb.Item>
                    {

                        this.generateBreadcrumbItem(pathArr)
                    }
                </Breadcrumb>
                <div style={{ background: '#fff', padding: 24 }}>
                    <Switch>
                        <Route exact path="/" component={ArticleList} />
                        <Route exact path="/article" component={ArticleList} />
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
