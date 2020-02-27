import React from 'react'
import { Menu, message } from "antd"
import { ClickParam } from "antd/lib/menu"

interface HeaderDropDownProps {
    removeCurrentUser?: () => void
    navToAdminSetting?: () => void
}

export const HeaderDropDown: React.FC<HeaderDropDownProps> = (props: HeaderDropDownProps) => {

    const onMenuClick = (param: ClickParam) => {
        switch (param.key) {
            case "logout":
                props.removeCurrentUser?.()
                localStorage.clear()
                window.location.href = "/login"
                break
            case "setting":
                props.navToAdminSetting?.()
                break
            default:
                message.error("you may click the wrong menu")
                break
        }
    }

    return (
        <div>
            <Menu onClick={onMenuClick}>
                <Menu.Item key={"setting"}>
                    Setting
                </Menu.Item>
                <Menu.Item key={"logout"}>
                    Logout
                </Menu.Item>
                {/*TODO*/}
            </Menu>
        </div>
    )
}
