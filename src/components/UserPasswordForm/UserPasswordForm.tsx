import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button, Checkbox } from "antd";
import { FormComponentProps } from '@ant-design/compatible/es/form/Form';
import './UserPasswordForm.css'

type UserPasswordFormType = "sign-in" | "sign-up"
export type CallBackDataType = { username: string, password: string, remember?: boolean }

interface UserPasswordProps extends FormComponentProps {
    formType: UserPasswordFormType
    setDataCallBackFunction: (data: CallBackDataType) => void
    handleSubmitCallBackFunction: () => void
    loading: boolean
}

interface UserPasswordState {
    username: string
    password: string
    remember?: boolean
}

class UserPasswordForm extends React.Component<UserPasswordProps, UserPasswordState> {

    readonly state: UserPasswordState = {
        username: "",
        password: "",
        remember: false,
    }

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, value) => {
            if (!err) {
                // message.warn(err)
                this.props.handleSubmitCallBackFunction()
            }
        })

    }

    render() {
        const {formType, form: {getFieldDecorator}} = this.props
        const {loading} = this.props
        return (
            <Form onSubmit={this.handleSubmit}
                  style={{maxWidth:'300px', margin: "0 auto"}}>
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input
                            prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}} />}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [
                            formType === "sign-in"
                                ? {required: true, message: 'Please input your Password!'}
                                : {required: true, min: 3, message: '密码最少需要三位'}],
                    })(
                        <Input
                            prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                {formType === "sign-up" ? (
                        <Button type="primary" htmlType="submit" style={{width: "100%"}} loading={loading}>
                            Register
                        </Button>) :
                    (<Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: false,
                            })(<Checkbox>Remember me</Checkbox>)}
                            {/*TODO add feature find password*/}
                            <a style={{float: "right"}} href="https://www.github.com">
                                Forgot password
                            </a>
                            <Button type="primary" htmlType="submit" style={{width: "100%"}} loading={loading}>
                                Log in
                            </Button>
                            Or <a href="/register">register now!</a>
                        </Form.Item>
                    )
                }
            </Form>
        );
    }
}

export const WrappedUserPasswordForm = Form.create<UserPasswordProps>({
    name: "name-password-form",
    onFieldsChange: (props: UserPasswordProps, fields: any, allFields: any) => {
        const {username, password} = allFields
        const remember = props.formType === "sign-in" ? allFields.remember.value : undefined
        props.setDataCallBackFunction({
            username: username.value,
            password: password.value,
            remember: remember
        })
    },
    // onValuesChange(_, values) {
    //     console.log(values);
    // },
})(UserPasswordForm)

