import React from "react"
import { SettingOutlined } from '@ant-design/icons';
import { Menu } from "antd";
import {ClickParam} from "antd/es/menu"
import BasicSettingFrom from "./BasicSetting"
import {SecuritySetting} from "./SecuritySetting/SecuritySetting"
import { AppState } from "@/stores"
import { UserState } from "@/models/UserState"
import { Action } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { fetchCurrentUser } from "@/actions"
import { connect } from "react-redux"

interface IAccountSettingState {
    currentItem: string
}

interface IAccountSettingProps {
    currentUser: UserState
    fetchCurrentUser: () => void
}

class AccountSetting extends React.Component<IAccountSettingProps, IAccountSettingState> {

    readonly state: IAccountSettingState = {
        currentItem: "as_basic",
    }

    handleClick = (params: ClickParam) => {
        console.log(params)
        if (this.state.currentItem !== params.key) {
            this.setState({currentItem: params.key})
            // this.renderItem(params.key)
        }
    }

    renderItem = (currentItem: string) => {
        switch (currentItem) {
            case "as_basic":
                const {currentUser} = this.props
                return (<BasicSettingFrom user={currentUser}/>)
            case "as_security":
                return (<SecuritySetting/>)
        }
    }

    async componentDidMount(): Promise<void> {
        const {fetchCurrentUser} = this.props
        fetchCurrentUser()
    }

    render() {
        return (
            <div>
                <Menu
                    theme="light"
                    style={{width: 256}}
                    onClick={this.handleClick}
                    defaultOpenKeys={['as_basic']}
                    mode="horizontal"
                >
                    <Menu.Item key="as_basic">
                        <SettingOutlined />
                        基本设置
                    </Menu.Item>
                    <Menu.Item key="as_security">
                        <SettingOutlined />
                        安全设置
                    </Menu.Item>
                </Menu>
                {
                    this.renderItem(this.state.currentItem)
                }
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    currentUser: state.currentUser
})

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, null, Action<string>>) => ({
    fetchCurrentUser: () => dispatch(fetchCurrentUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountSetting)
