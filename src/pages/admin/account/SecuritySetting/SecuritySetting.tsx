import React from "react"
import {message} from "antd"
import Title from "antd/lib/typography/Title"
import "./SecuritySetting.css"
import {Response, updatePassword} from "@/api/api"
import {WrappedUpdatePasswordForm} from "@/components/UpdatePasswordForm/UpdatePasswordForm"


type SecuritySettingState = { userName: string, oldPassword: string, newPassword: string }

export class SecuritySetting extends React.Component<{}, SecuritySettingState> {

    state: SecuritySettingState = {
        userName: "", newPassword: "", oldPassword: ""
    }

    handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        let rep: Response<{ userName: string }> = await updatePassword(this.state)
        message.warn(rep.message)
    }

    render() {
        return (
            <div className={"password"}>
                <Title level={3} >修改密码:</Title>
                <WrappedUpdatePasswordForm/>
            </div>
        )
    }
}
