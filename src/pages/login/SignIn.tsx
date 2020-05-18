import React from "react"
import {signIn, Response, getCurrentUser} from "@/api/api"
import { FormComponentProps } from '@ant-design/compatible/es/form';
import {CallHistoryMethodAction, push} from "connected-react-router"
import {CallBackDataType, WrappedUserPasswordForm} from "../../components/UserPasswordForm/UserPasswordForm";
import {setCurrentUser} from "@/actions";
import {UserState} from "@/models/UserState";
import {connect} from "react-redux"
import {Dispatch} from "redux"
import {User} from "@/models/UserState";
import {AppState} from "@/stores";
import {Path} from "history"
import './SignIn.css'

export interface SignInView {
    username: string
    token: string
}

interface SignInState {
    username: string
    password: string
    rememberMe: boolean
    loading: boolean
}

interface SignInProps extends FormComponentProps {
    // routing?: RouterStore
    // connect?: ConnectStore
}

interface Props {
    currentUser: UserState
    setCurrentUser: (user: User) => void
    push: (path: Path, state?: any) => CallHistoryMethodAction<[ Path, any? ]>
}

// @inject("routing", "connect")
// @observer
export class SignInContainer extends React.Component<Props & FormComponentProps, SignInState> {

    readonly state: SignInState = {
        username: "",
        password: "",
        rememberMe: false,
        loading: false
    }

    getUserNameAndPassword = (data: CallBackDataType) => {
        this.setState({
            username: data.username,
            password: data.password,
            rememberMe: data.remember as boolean //property may undefined
        })
    }

    setUser = async () => {
        const token = localStorage.getItem("token")
        if (token === undefined) return
        const currentUser = await getCurrentUser()
        if (currentUser !== null && currentUser !== undefined) {
            this.props.setCurrentUser(currentUser)
            console.log(this.props.setCurrentUser)
        }
    }

    handleSubmit = async () => {
        this.setState({loading: true})
        console.log(this.state)
        const {username, password, rememberMe} = this.state
        let rep: Response<SignInView> = await signIn(username, password, rememberMe) as Response<SignInView>
        console.log(rep)
        if (rep.status !== undefined && rep.status === 200) {
            localStorage.setItem("token", (rep.data as SignInView).token)
            await this.setUser()
            this.props.push("/admin")
            console.log("登陆成功")
        } else {
            alert("验证失败")
            this.setState({password: "", loading: false})
        }
    }

    render() {
        const {loading} = this.state
        return (
            <div style={{height: 500, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <WrappedUserPasswordForm
                    loading={loading}
                    formType={"sign-in"}
                    setDataCallBackFunction={this.getUserNameAndPassword}
                    handleSubmitCallBackFunction={this.handleSubmit}/>
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    currentUser: state.currentUser
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setCurrentUser: (user: User) => dispatch(setCurrentUser(user)),
    push: (path: Path, state?: any) => dispatch(push(path, state))
})
export const SignIn = connect<ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps>,
    FormComponentProps,
    AppState>
(mapStateToProps, mapDispatchToProps)(SignInContainer)