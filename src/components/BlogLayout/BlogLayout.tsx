import React from "react"
import {Layout, Menu, Breadcrumb} from 'antd'
import {RouteComponentProps, Route, Switch, withRouter} from "react-router-dom"
import ArticleList from "../ArticleList/ArticleList"
import ArticleDetail from "../ArticleDetail/ArticleDetail"
import {ClickParam} from "antd/es/menu"

const {Header, Content, Footer} = Layout

const BlogLayout: React.FC<RouteComponentProps<{ id: string }>> = (props: RouteComponentProps<{ id: string }>) => {

    const history = props.history

    const handledClick = (params:ClickParam) => {
        switch (params.key) {
            case "1": history.push("/")
        }
    }

    return (
        <Layout className="layout">
            <Header>
                <div className="logo"/>
                <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{lineHeight: '64px'}}
                    onClick={handledClick}
                >
                    <Menu.Item key="1">主页</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
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
                    </Switch>
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )
}

export default withRouter(BlogLayout)
