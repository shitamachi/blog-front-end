import React, { useCallback } from "react"
import { UserState } from "@/models/UserState"
import { Dropdown, Avatar, Button } from "antd"
import { HeaderDropDown } from "@/components/HeaderDropdown/HeaderDropdown"
import { useSelector, useDispatch } from "react-redux"
import { AppState } from "@/stores"
import { push } from "connected-react-router";

interface HeaderRightAvatarProps {
    currentUser: UserState
    removeCurrentUser: () => void
}

export const HeaderRightAvatar: React.FC = () => {
    const dispatch = useDispatch()

    const currentUser = useSelector((state: AppState) => state.currentUser)

    const removeCurrentUser = useCallback(() => {
        dispatch(removeCurrentUser())
    }, [dispatch])

    const navToSignInPage = (e: React.MouseEvent) => {
        e.preventDefault()
        dispatch(push("/login"))
    }

    const navToAdminSetting = useCallback(() => {
        dispatch(push("/admin"))
    }, [dispatch])

    const dropDownMenus = <HeaderDropDown navToAdminSetting={navToAdminSetting} />

    return (
        <div style={{ alignItems: "center" }}>
            {
                currentUser.avatar
                    ? (<Dropdown overlay={dropDownMenus} trigger={['click']}>
                        <Avatar size={"small"} src={currentUser.avatar} />
                    </Dropdown>)
                    : (<Button type="link" onClick={navToSignInPage}>Login</Button>)
            }
        </div>
    )
}

