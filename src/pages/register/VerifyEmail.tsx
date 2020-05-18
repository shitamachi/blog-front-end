import React, { useState, useEffect } from "react"
import { Form, Result, Input, Button, Modal } from "antd"
import { useHistory, useLocation } from "react-router-dom"
import { verifyCode } from "@/api/api"


interface VerifyEmailProps {
    token?: string
}

export const VerifyEmail: React.FC<VerifyEmailProps> = (props: VerifyEmailProps) => {

    const history = useHistory()
    const location = useLocation<string>()

    const [resendButtonDisabled, setResendButtonDisabled] = useState(true)
    const [waitTime, setWaitTime] = useState(3)
    const [buttonText, setButtonText] = useState(`wait ${waitTime}s`)
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        setToken(localStorage.getItem("verify_token") === location.state ? location.state : null)
        let interval: NodeJS.Timeout = setInterval(() => {
            if (waitTime === 0) {
                clearInterval(interval)
                setButtonText("Re-Send")
                setResendButtonDisabled(false)
                return
            }
            setWaitTime(waitTime - 1)
            setButtonText(`wait ${waitTime}s`)
        }, 1000)
        return () => clearInterval(interval)
    }, [waitTime])

    const handleResend = (e: React.MouseEvent) => {
        e.preventDefault()
        //TODO do verify request
        setWaitTime(4)
        setResendButtonDisabled(true)
    }

    const goToRegisterPage = (e: React.MouseEvent) => {
        e.preventDefault()
        history.push("/register")
    }

    const backToPreviousPage = (e: React.MouseEvent) => {
        e.preventDefault()
        history.goBack()
    }

    const onFinish = async (value: { [name: string]: any }) => {
        if (token !== null) {
            let result = await verifyCode(token, value.code)
            if (result.status === 200) {
                Modal.success({
                    content: 'you have successfully register!',
                    onOk: () => {
                        history.push("/admin")
                    }
                });
            }
        }
        Modal.warning({
            title: "oh,some thing happened",
            content: 'please try again',
        });
    }

    const invaildTokenResult =
        <Result
            status="error"
            title="this page is for verify email"
            subTitle="if you want to reigster user,please go the reigster page"
            extra={[
                <Button type="primary" key="go_register" onClick={goToRegisterPage}>
                    Go to Reigster
                </Button>,
                <Button type="link" key="previous_page" onClick={backToPreviousPage}>
                    Back to Previous Page
                </Button>
            ]}
        >
        </Result>

    return (
        <>
            {
                //TODO do more check
                props.token ?
                    (<Result
                        title="you need to verify your email,please input code we just send to your email box"
                        extra={
                            <Form
                                name="verify-email"
                                onFinish={onFinish}
                                scrollToFirstError
                            >
                                <Form.Item
                                    name="code"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'please input your code'
                                        }
                                    ]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Verify
                                    </Button>
                                    <Button type="primary"
                                        htmlType="button"
                                        style={{ marginLeft: "10px" }}
                                        disabled={resendButtonDisabled}
                                        onClick={handleResend}
                                    >
                                        {buttonText}
                                    </Button>
                                </Form.Item>
                            </Form>
                        }
                    />)
                    : invaildTokenResult}
        </>
    )
}