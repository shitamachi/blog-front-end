import React from "react"
import { LockOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input, message } from "antd";
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { updatePassword } from "@/api/api"

interface UpdatePasswordFormProps extends FormComponentProps {

}

const UpdatePasswordForm: React.FC<UpdatePasswordFormProps> = (props: UpdatePasswordFormProps) => {

    const { getFieldDecorator } = props.form

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const { getFieldsValue } = props.form
        props.form.validateFieldsAndScroll(async (err, value) => {
            if (!err) {
                const { oldPassword, newPassword } = getFieldsValue(["oldPassword", "newPassword"])
                let rep = await updatePassword({ oldPassword: oldPassword, newPassword: newPassword })
                if (rep.status === 200) localStorage.removeItem("token")
                message.warn(rep.message)
            }
        })
    }

    const customValidator = (rule: any, value: any, callback: any) => {
        let newPwd = props.form.getFieldValue("newPassword")
        if (value && value !== newPwd) {
            callback('两次输入的密码不相同')
        }
        callback()
    }


    return (
        <Form layout={"vertical"} onSubmit={handleSubmit} style={{ marginTop: '13px' }}>
            <Form.Item>
                {getFieldDecorator('oldPassword', {
                    rules: [{ required: true, message: 'Please input your old Password!' }],
                })(
                    <Input
                        prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)', marginBottom: '9px' }} />}
                        type="password"
                        placeholder="Old Password"
                    />,
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('newPassword', {
                    rules: [{ required: true, message: 'Please input your new Password!' }],
                })(
                    <Input
                        prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)', marginBottom: '9px' }} />}
                        type="password"
                        placeholder="New Password"
                    />,
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('retyped-password', {
                    rules: [{
                        required: true,
                        message: "请重新输入新密码，两次输入需一致",
                        validator: customValidator
                    }],
                })(
                    <Input
                        prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)', marginBottom: '9px' }} />}
                        type="password"
                        placeholder="Retype New Password"
                    />,
                )}
            </Form.Item>
            <Button type={"primary"} htmlType={"submit"} style={{ width: '100%' }}>
                Submit
                </Button>
        </Form>
    );
}

export const WrappedUpdatePasswordForm = Form.create<UpdatePasswordFormProps>()(UpdatePasswordForm)

