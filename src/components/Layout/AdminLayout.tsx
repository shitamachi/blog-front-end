import React from "react"
import {Layout, Menu, Breadcrumb, Icon, Card} from 'antd'
import {Route, Switch, RouteComponentProps, Redirect} from "react-router"
import NotFound from "../../pages/NotFound"
import "./AdminLayout.css"
import AccountSetting from "../../pages/account/AccountSetting"
import ArticleSettingWithRouter from "../../pages/account/ArticleSetting"
import EditArticleWithRouter from "../../pages/forms/account/EditArticle"
import {NavLink} from "react-router-dom"

const {Header, Content, Footer, Sider} = Layout
const {SubMenu} = Menu

interface IAdminLayoutState {
    collapsed: boolean
}

class AdminLayout extends React.Component<RouteComponentProps<{ id: string }>, IAdminLayoutState> {

    state = {
        collapsed: false,
    }

    onCollapse = (collapsed: boolean) => {
        console.log(collapsed)
        this.setState({collapsed})
    }

    render() {
        const {location} = this.props
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} theme="light">
                    <div className="logo">
                        <img src={"/imgs/logo.png"} alt={"logo"}/>
                    </div>
                    <Menu theme="light"
                          defaultOpenKeys={[location.pathname]}
                          mode="inline"
                          selectedKeys={[location.pathname]}
                    >
                        <Menu.Item key="/admin/settings">
                            <NavLink to={"/admin/settings"}>
                                <Icon type="user"/>
                                <span>User Setting</span>
                            </NavLink>
                        </Menu.Item>

                        <SubMenu
                            key="sub1"
                            title={
                                <span><Icon type="form"/><span>Article Setting</span></span>
                            }>
                            <Menu.Item key="/admin/articles">
                                <NavLink to={"/admin/articles"}>
                                    <Icon type="form"/>
                                    <span>Article List</span>
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="/admin/articles/add">
                                <NavLink to={"/admin/articles/add"}>
                                    <Icon type="form"/>
                                    <span>Add Article</span>
                                </NavLink>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0}}/>
                    <Content style={{margin: '0 16px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <Card style={{height: '100%'}}>
                            <Switch>
                                <Redirect exact from={`${this.props.match.path}/`}
                                          to={`${this.props.match.path}/settings`}/>
                                <Route exact path={`${this.props.match.path}/settings`} component={AccountSetting}/>
                                <Route exact path={`${this.props.match.path}/articles`}
                                       component={ArticleSettingWithRouter}/>
                                {/*<Route exact path={`${this.props.match.path}/articles/:id`} component={EditArticleWithRouter}/>*/}
                                <Route exact path={`${this.props.match.path}/articles/:id`} render={props => (
                                    <EditArticleWithRouter {...props} article={this.props.location.state}/>)
                                }/>
                                <Route exact path={`${this.props.match.path}/*`} component={NotFound}/>
                            </Switch>
                        </Card>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>2019 Created by Jiang Guo</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default AdminLayout
