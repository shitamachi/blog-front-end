import React from "react"
import { signUp } from "@/api/api"
import { CallBackDataType, WrappedUserPasswordForm } from "@/components/UserPasswordForm/UserPasswordForm"
import { Form, Input, Button, Modal } from "antd"
import { FormInstance } from "antd/lib/form"
import { history } from "@/reducers"

export type RegisterUserType = { name: string, email: string }

interface SignUpState {
    username: string
    password: string
    loading: boolean
}

export class SignUp extends React.Component<{}, SignUpState> {

    readonly state: SignUpState = { username: "", password: "", loading: false }
    formRef = React.createRef<FormInstance>()

    getUserNameAndPassword = (data: CallBackDataType) => {
        const { username, password } = data
        this.setState({ username: username, password: password })
    }

    warning = (message: string) => {
        Modal.warn({
            title: 'Register Failed',
            content: message
        });
    }

    onFinish = async (values: { [name: string]: any }) => {
        this.setState({ loading: true })
        const { username, password, email, comfirm } = values
        console.log("sign up...")
        let rep = await signUp(username, password, email)
        if (rep.status === 200) {
            history.push("/register/verify", { name: username, email: email })
        } else {
            this.warning(rep.message)
            this.setState({ loading: false })
        }
    }

    reset = () => {
        this.formRef.current?.setFieldsValue({
            username: "", password: "", email: "", confirm: "", loading: false
        })
    }

    layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    tailLayout = {
        wrapperCol: { offset: 4 },
    };

    render() {
        const { loading } = this.state

        return (
            <Form
                {...this.layout}
                layout={"vertical"}
                ref={this.formRef}
                name="register"
                onFinish={this.onFinish}
                scrollToFirstError
            >
                <Form.Item
                    name="username"
                    label="UserName"
                    rules={[
                        {
                            required: true,
                            message: 'please input your user name'
                        },
                        {
                            min: 2,
                            max: 14,
                            message: 'user name length should be greater than 2 characters and less than 14 characters',
                        }
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!'
                        },
                        {
                            required: true,
                            message: 'please input your email'
                        }
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'please input your password'
                        },
                        {
                            min: 3,
                            max: 20,
                            message: 'password length is greater than 3 characters and less than 20 characters'
                        }
                    ]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    rules={[
                        {
                            required: true,
                            message: 'please input your password',

                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve()
                                }
                                return Promise.reject("The two passwords that you entered do not match!")
                            }
                        })
                    ]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item {...this.tailLayout} >
                    <Button type="primary" htmlType="submit" loading={loading} style={{ marginRight: "10px" }}>
                        Register
                    </Button>
                    <Button htmlType="button" onClick={this.reset} style={{ marginLeft: "5px" }}>
                        Reset
                    </Button>
                </Form.Item>
            </Form >
        )
    }
}
