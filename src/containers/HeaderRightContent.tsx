import React from 'react'
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Avatar } from "antd";
// import { inject, observer } from "mobx-react"
// import { UserStore } from "../../../stores/UserStore"
import { HeaderDropDown } from "../components/HeaderDropdown/HeaderDropdown"
import { UserState } from '@/models/UserState'
import { AppState } from '@/stores'
import { connect } from 'react-redux'

interface HeaderRightContentProps {
    currentUser: UserState
}

class HeaderRightContent extends React.Component<HeaderRightContentProps> {
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        // const currentUser = useSelector((state: AppState) => state.currentUser)

        const { currentUser } = this.props
        const dropDownMenus = <HeaderDropDown />
        return (
            <Dropdown overlay={dropDownMenus}>
                <a className="ant-dropdown-link"
                    href={"/admin"}
                    onClick={(event: React.MouseEvent) => event.preventDefault()}>
                    {currentUser?.userName} 
                    <Avatar size={"small"} src={currentUser.avatar}  style={{margin: '7px'}}/>
                    <DownOutlined />
                </a>
            </Dropdown>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    currentUser: state.currentUser
})

export default connect(mapStateToProps)(HeaderRightContent)