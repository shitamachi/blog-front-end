import React, { useState } from "react"
import { Layout, Menu } from 'antd'
import { RouteComponentProps, withRouter } from "react-router-dom"
import { ClickParam } from "antd/es/menu"
import "./BlogLayout.css"
import {HeaderRightAvatar} from "../../containers/HeaderRightAvatar";
import MainContent from "../../components/MainContent";

const { Header, Footer } = Layout

const BlogLayout: React.FC<RouteComponentProps<{ id: string }>> = (props: RouteComponentProps<{ id: string }>) => {

    const [currentSelectedMenu, setCurrentSelectedMenu] = useState<string>("1")
    const history = props.history

    const handledClick = (params: ClickParam) => {
        switch (params.key) {
            case "1": history.push("/"); break;
            case "2": history.push("/archive"); break;
            case "3": history.push("/category"); break;
            case "4": history.push("/tags"); break;
            default: history.push("/"); break;
        }
        setCurrentSelectedMenu(params.key)
    }
    console.log(props)
    return (
        <Layout style={{ minHeight: '100%' }}>
            <Header style={{ display: 'flex',justifyContent:"space-between" }}>
                <Menu
                    theme="light"
                    mode="horizontal"
                    //TODO refresh page will select default item incorrectly 刷新后会错误选中默认
                    // defaultSelectedKeys={['1']}
                    selectedKeys={[currentSelectedMenu]}
                    style={{ lineHeight: '64px', display: 'flex' }}
                    onClick={handledClick}
                >
                    <Menu.Item key="1">主页</Menu.Item>
                    <Menu.Item key="2">归档</Menu.Item>
                    <Menu.Item key="3">分类</Menu.Item>
                    <Menu.Item key="4">标签</Menu.Item>
                </Menu>
                <HeaderRightAvatar />
            </Header>
            <MainContent pathname={history.location.pathname}/>
            <Footer style={{ textAlign: 'center' }}>2020 Blog Created by Jiang Guo</Footer>
        </Layout>
    )
}

export default withRouter(BlogLayout)
