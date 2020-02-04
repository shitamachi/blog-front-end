import React from "react"
import { FormComponentProps } from "antd/es/form"
import { Avatar, Button, Form, Input, Upload } from "antd"
import { updateUser, BASE_HOST } from "@/api/api"
import { UploadChangeParam } from "antd/lib/upload/interface"
import { User } from "@/models/UserState"

//should be put the url of your backend api on here
const uploadAvatarUrl = (username: string) => `${BASE_HOST}/api/account/${username}/avatar`

interface UserBasicSettingFormProps extends FormComponentProps {
    user: User
}

class BasicSetting extends React.Component<UserBasicSettingFormProps> {

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll(async (err, value: User) => {
            if (!err) {
                console.log("发送更新请求")
                console.log(value)
                await updateUser(value)
            }
        })
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        const { user, form: { getFieldDecorator } } = this.props
        console.log(this.props.user)
        return (
            <Form layout={"horizontal"} onSubmit={this.handleSubmit}>
                <Form.Item label={"avatar"}>
                    {getFieldDecorator('avatar', { rules: [{ required: false, message: "需要头像" }] })(
                        <Upload
                            action={uploadAvatarUrl(user.userName)}
                            onChange={(info: UploadChangeParam) => {
                                console.log(info);

                                if (info.file.status === "done") {
                                    window.location.reload()
                                }
                            }}
                            headers={{ "Authorization": `Bearer ${localStorage.getItem("token")}` }}>
                            <Avatar shape={"circle"} size={72} icon={"user"} src={user.avatar} />
                        </Upload>)}
                </Form.Item>
                <Form.Item label={"email"}>
                    {getFieldDecorator('email', { rules: [{ required: true, message: "需要邮箱" }] })(<Input
                        placeholder={"your email"} />)}
                </Form.Item>
                <Form.Item label={"user name"}>
                    {getFieldDecorator('userName', { rules: [{ required: true, message: "需要邮箱" }] })(<Input
                        placeholder={"your user name"} />)}
                </Form.Item>
                <Form.Item label={"nick name"}>
                    {getFieldDecorator('nickName', { rules: [{ message: "需要邮箱" }] })(<Input
                        placeholder={"your nickname"} />)}
                </Form.Item>
                <Button type={"primary"} htmlType={"submit"}>
                    Save Change
                </Button>
            </Form>
        )
    }
}

const BasicSettingFrom = Form.create<UserBasicSettingFormProps>({
    mapPropsToFields(props: UserBasicSettingFormProps) {
        return props.user ? {
            avatar: Form.createFormField({
                value: props.user.avatar
            }),
            email: Form.createFormField({
                value: props.user.email
            }),
            userName: Form.createFormField({
                value: props.user.userName
            }),
            nickName: Form.createFormField({
                value: props.user.nickName
            }),
        } : {};
    }
})(BasicSetting)
export default BasicSettingFrom
