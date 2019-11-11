import React from "react"
import {Input, Button} from "antd"
import {signIn, Response} from "../api/api"
import './SignIn.css'
import {observer, inject} from "mobx-react"
import {RouterStore} from "mobx-react-router"
import {ConnectStore} from "../stores/ConnectStore"

export interface SignInView {
    username: string
    token: string
}

interface SignInState {
    username: string
    password: string
    loading: boolean
}

@inject("routing", "connect")
@observer
export class SignIn extends React.Component<{ routing?: RouterStore, connect?: ConnectStore }, SignInState> {

    readonly state: SignInState = {
        username: "",
        password: "",
        loading: false
    }

    handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        this.setState({loading: true})
        let rep: Response<SignInView> = await signIn(this.state.username, this.state.password, false) as Response<SignInView>
        if (rep.status !== undefined && rep.status === 200) {
            console.log(this.state.loading)
            localStorage.setItem("token", (rep.data as SignInView).token)
            this.props.connect!.authenticated()
            this.props.routing!.history.push("/")
            console.log("登陆成功")
        } else {
            alert("验证失败")
            this.setState({password: "", loading: false})
        }
    }

    render() {
        return (
            <div className="input">
                <Input size={"large"} placeholder="input your username"
                       allowClear value={this.state.username}
                       onChange={(e) => this.setState({username: e.target.value})}/>
                <Input.Password size={"large"} placeholder="input password"
                                value={this.state.password}
                                onChange={(e) => this.setState({password: e.target.value})}/>
                <Button type="primary" onClick={this.handleSubmit} loading={this.state.loading}>
                    Sign In
                </Button>
                <Button type="primary" onClick={(e) => this.setState({username: "", password: ""})}>
                    Rest
                </Button>
            </div>
        )
    }
}
