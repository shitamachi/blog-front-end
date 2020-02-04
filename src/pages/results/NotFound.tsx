import React from "react"
import {Button, Result} from "antd"

const NotFound: React.FC = () => {
    return (
        <Result
            status="warning"
            title="404 NOT FOUND"
            subTitle="Sorry, the page you visited does not exist."
            extra={
                <Button type="primary" onClick={() => window.location.href = '/'}>
                    Home Page
                </Button>
            }
        />
    )
}

export default NotFound
