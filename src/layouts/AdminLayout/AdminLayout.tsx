import React from "react"
import { FormOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Breadcrumb, Card } from 'antd';
import {Route, Switch, RouteComponentProps, Redirect} from "react-router"
import NotFound from "../../pages/results/NotFound"
import "./AdminLayout.css"
import {NavLink} from "react-router-dom";
import HeaderRightContent from "../../containers/HeaderRightContent";
import ArticleSettingWithRouter from "../../pages/admin/articles/ArticleSetting";
import EditArticleWithRouter from "../../pages/admin/articles/EditArticle";
import EditTagCategoryTable, {EditTagCategory} from "../../pages/admin/articles/EditTagCategory";
import {TagSetting} from "../../pages/admin/articles/TagSetting";
import {Dashboard} from "../../pages/admin/Dashboard";
import AccountSetting from "../../pages/admin/account/AccountSetting";
import {CategorySetting} from "../../pages/admin/articles/CategorySetting";


const {Header, Content, Footer, Sider} = Layout
const {SubMenu} = Menu

interface IAdminLayoutState {
    collapsed: boolean
}

class AdminLayout extends React.Component<RouteComponentProps<{ id: string }>, IAdminLayoutState> {

    state = {
        collapsed: false,
        username: ""
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
                        {/* <img src={"http://logosolusa.com/wp-content/uploads/parser/Will-Logo-1.png"} alt={"logo"}/> */}
                    </div>
                    <Menu theme="light"
                          defaultOpenKeys={[location.pathname]}
                          mode="inline"
                          selectedKeys={[location.pathname]}
                    >
                        <Menu.Item key="/admin/settings">
                            <NavLink to={"/admin/settings"}>
                                <UserOutlined />
                                <span>User Setting</span>
                            </NavLink>
                        </Menu.Item>

                        <SubMenu
                            key="sub1"
                            title={
                                <span><FormOutlined /><span>Article Setting</span></span>
                            }>
                            <Menu.Item key="/admin/articles">
                                <NavLink to={"/admin/articles"}>
                                    <FormOutlined />
                                    <span>Article List</span>
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="/admin/articles/add">
                                <NavLink to={"/admin/articles/add"}>
                                    <FormOutlined />
                                    <span>Add Article</span>
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="/admin/category">
                                <NavLink to={"/admin/category"}>
                                    <FormOutlined />
                                    <span>Category</span>
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="/admin/tag">
                                <NavLink to={"/admin/tag"}>
                                    <FormOutlined />
                                    <span>Tag</span>
                                </NavLink>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{display: "flex", justifyContent: "flex-end"}}>
                        <HeaderRightContent/>
                    </Header>
                    <Content style={{margin: '0 16px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <Card style={{height: '100%'}}>
                            <Switch>
                                <Redirect exact from={`${this.props.match.path}/`}
                                          to={`${this.props.match.path}/settings`}/>
                                <Route exact path={`${this.props.match.path}/dashboard`} component={Dashboard}/>
                                <Route exact path={`${this.props.match.path}/settings`} component={AccountSetting}/>
                                <Route exact path={`${this.props.match.path}/articles`}
                                       component={ArticleSettingWithRouter}/>
                                {/*<Route exact path={`${this.props.match.path}/articles/:id`} component={EditArticleWithRouter}/>*/}
                                <Route exact path={`${this.props.match.path}/articles/:id`} render={props => (
                                    <EditArticleWithRouter {...props} article={this.props.location.state}/>)
                                }/>
                                <Route exact path={`${this.props.match.path}/category`} component={CategorySetting}/>
                                <Route exact path={`${this.props.match.path}/edit`} render={props => (
                                    <EditTagCategoryTable {...props} item={this.props.location.state}/>)
                                }/>
                                <Route exact path={`${this.props.match.path}/tag`} component={TagSetting}/>
                                <Route exact path={`${this.props.match.path}/tag/edit`} component={EditTagCategory}/>
                                <Route component={NotFound}/>
                            </Switch>
                        </Card>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>2020 Created by Jiang Guo</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default AdminLayout
