import React from "react"
import {Input, Button} from "antd"
import {signUp} from "../api/api"
import {observer, inject} from "mobx-react"
import {RouterStore} from "mobx-react-router"
import {ConnectStore} from "../stores/ConnectStore"

interface SignUpState {
    username: string
    password: string
    loading: boolean
}

@inject("connect")
@observer
export class SignUp extends React.Component<{ routing?: RouterStore, connect?: ConnectStore }, SignUpState> {

    readonly state: SignUpState = {username: "", password: "", loading: false}

    validateValue = (): boolean => {
        let username = this.state.username
        let password = this.state.password
        if (!(username.length > 2 && username.length < 14)) {
            alert("用户名长度大于2位，小于14位")
            return false
        }
        if (!(password.length > 3 && password.length < 20)) {
            alert("密码长度大于3位，小于20位")
            return false
        }
        return true
    }

    handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        this.setState({loading: true})
        if (!this.validateValue()) {
            this.setState({loading: false})
            return
        }
        let rep = await signUp(this.state.username, this.state.password)
        if (rep.status === 200) {
            localStorage.setItem("token", (rep.data as { username: string, token: string }).token)
            alert("创建成功！请点击确定跳转到管理页面")
            window.location.href = "/admin"
        }
    }

    render() {
        return (
            <div className="input">
                <Input size={"large"} placeholder="input your user name" allowClear value={this.state.username}
                       onChange={(e) => this.setState({username: e.target.value})}/>
                <Input.Password size={"large"} placeholder="input your password" value={this.state.password}
                                onChange={(e) => this.setState({password: e.target.value})}/>
                <Button type="primary" onClick={this.handleSubmit} loading={this.state.loading}>
                    Register
                </Button>
                <Button type="primary" onClick={(e) => this.setState({username: "", password: ""})}>
                    Rest
                </Button>
            </div>
        )
    }
}
