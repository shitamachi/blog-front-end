import React from "react"
import {Menu, Icon} from "antd"
import {ClickParam} from "antd/es/menu"
import BasicSettingFrom from "../forms/account/BasicSetting"
import {getUserInfo} from "../../api/api"
import {SecuritySetting} from "./SecuritySetting"
import {inject, observer} from "mobx-react"
import {User, UserStore} from "../../stores/UserStore"

interface IAccountSettingState {
    currentItem: string
}

interface IAccountSettingProps {
    user?: UserStore
}

@inject("user")
@observer
class AccountSetting extends React.Component<IAccountSettingProps, IAccountSettingState> {

    readonly state: IAccountSettingState = {
        currentItem: "as_1",
    }

    handleClick = (params: ClickParam) => {
        console.log(params)
        if (this.state.currentItem !== params.key) {
            this.setState({currentItem: params.key})
            // this.renderItem(params.key)
        }
    }

    renderItem = (selectedItemKey: string) => {
        switch (this.state.currentItem) {
            case "as_1":
                return (<BasicSettingFrom user={this.props.user!.currentUser}/>)
            case "as_2":
                return (<SecuritySetting/>)
        }
    }

    async componentDidMount(): Promise<void> {
        this.props.user!.getCurrentUser()
    }

    render() {
        return (
            <div>
                <Menu
                    theme="light"
                    style={{width: 256}}
                    onClick={this.handleClick}
                    defaultOpenKeys={['as_1']}
                    mode="horizontal"
                >
                    <Menu.Item key="as_1">
                        <Icon type="setting"/>
                        基本设置
                    </Menu.Item>
                    <Menu.Item key="as_2">
                        <Icon type="setting"/>
                        安全设置
                    </Menu.Item>
                </Menu>
                {
                    this.renderItem(this.state.currentItem)
                }
            </div>
        )
    }
}

export default AccountSetting
