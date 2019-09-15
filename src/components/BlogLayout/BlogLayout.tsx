import React from "react"
import {Layout, Menu, Breadcrumb} from 'antd'
import {RouteComponentProps, Route, Switch, withRouter} from "react-router-dom"
import ArticleList from "../ArticleList/ArticleList"
import ArticleDetail from "../ArticleDetail/ArticleDetail"
import {ClickParam} from "antd/es/menu"
import './BlogLayout.css'
import Archive from "../Archive/Archive"
import CategoriesList from "../CategoriesList"

const {Header, Content, Footer} = Layout

const BlogLayout: React.FC<RouteComponentProps<{ id: string }>> = (props: RouteComponentProps<{ id: string }>) => {

    const history = props.history

    const handledClick = (params:ClickParam) => {
        switch (params.key) {
            case "1": history.push("/");break;
            case "2": history.push("/archive");break;
            case "3": history.push("/category");break;
            default: history.push("/");break;
        }
    }

    return (
        <Layout className="layout">
            <Header>
                <div className="logo"/>
                <Menu
                    theme="light"
                    mode="horizontal"
                    //TODO refresh page will select default item incorrectly 刷新后会错误选中默认
                    defaultSelectedKeys={['1']}
                    style={{lineHeight: '64px'}}
                    onClick={handledClick}
                >
                    <Menu.Item key="1">主页</Menu.Item>
                    <Menu.Item key="2">归档</Menu.Item>
                    <Menu.Item key="3">分类</Menu.Item>
                </Menu>
            </Header>
            <Content style={{padding: '0 50px'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{background: '#fff', padding: 24, minHeight: 280}}>
                    <Switch>
                        <Route exact path="/" component={ArticleList}/>
                        <Route exact path="/article/:id" component={ArticleDetail}/>
                        <Route exact path='/archive' component={Archive} />
                        <Route exact path="/category" component={CategoriesList} />
                    </Switch>
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>2019 Blog Created by Jiang Guo</Footer>
        </Layout>
    )
}

export default withRouter(BlogLayout)
