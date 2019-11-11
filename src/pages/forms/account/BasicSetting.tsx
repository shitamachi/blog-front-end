import React from "react"
import {FormComponentProps} from "antd/es/form"
import {Button, Form, Input} from "antd"
import {User} from "../../../stores/UserStore"
import {updateUser} from "../../../api/api"

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
        const {form: {getFieldDecorator, getFieldValue}} = this.props
        console.log(this.props.user)
        return (
            <Form layout={"horizontal"} onSubmit={this.handleSubmit}>
                <Form.Item label={"email"}>
                    {getFieldDecorator('email', {rules: [{required: true, message: "需要邮箱"}]})(<Input
                        placeholder={"your email"}/>)}
                </Form.Item>
                <Form.Item label={"user name"}>
                    {getFieldDecorator('userName', {rules: [{required: true, message: "需要邮箱"}]})(<Input
                        placeholder={"your user name"}/>)}
                </Form.Item>
                <Form.Item label={"nick name"}>
                    {getFieldDecorator('nickName', {rules: [{message: "需要邮箱"}]})(<Input
                        placeholder={"your nickname"}/>)}
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
