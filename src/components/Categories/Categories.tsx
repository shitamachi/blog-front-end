import React from 'react'
import { Typography } from 'antd'
import { Link } from 'react-router-dom'
import { GlobalSettingState } from '../../pages/admin/articles/EditTagCategory'

const { Text } = Typography

export interface ICategory extends GlobalSettingState{

}

interface ICategoriesProps {
    categories: ICategory[]
}

class Categories extends React.Component<ICategoriesProps, {}> {
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            this.props.categories.map((c: ICategory, index: number) =>
                <Text style={{ marginRight: "7px" }} key={index}>
                    {/* TODO link's url should jump to the relevant categoty page */}
                    <Link to={`/category`}>{`${c.name}`}</Link>
                </Text>)
        )
    }
}

export default Categories