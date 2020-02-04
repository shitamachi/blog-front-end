import React from "react"
import {signUp} from "@/api/api"
// import {observer, inject} from "mobx-react"
// import {RouterStore} from "mobx-react-router"
// import {ConnectStore} from "../../stores/ConnectStore"
import {CallBackDataType, WrappedUserPasswordForm} from "@/components/UserPasswordForm/UserPasswordForm"

interface SignUpState {
    username: string
    password: string
    loading: boolean
}

// @inject("connect")
// @observer
// export class SignUp extends React.Component<{ routing?: RouterStore, connect?: ConnectStore }, SignUpState> {
export class SignUp extends React.Component<{}, SignUpState> {

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

    getUserNameAndPassword = (data: CallBackDataType) => {
        const {username, password} = data
        this.setState({username: username, password: password})
    }

    handleSubmit = async () => {
        this.setState({loading: true})
        if (!this.validateValue()) {
            this.setState({loading: false})
            return
        }
        let rep = await signUp(this.state.username, this.state.password)
        if (rep.status === 200) {
            localStorage.setItem("token", (rep.data as { username: string, token: string }).token)
            alert("register successful, please click button to homepage")
            window.location.href = "/admin"
        }
    }

    render() {
        const {loading} = this.state
        return (
            <div className="input">
                <WrappedUserPasswordForm
                    loading={loading}
                    formType={"sign-up"}
                    setDataCallBackFunction={this.getUserNameAndPassword}
                    handleSubmitCallBackFunction={this.handleSubmit}/>
            </div>
        )
    }
}
