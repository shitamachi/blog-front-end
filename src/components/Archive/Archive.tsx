import React from "react"
import {Article} from "../ArticleList/ArticleList"
import {getArchives} from "../../api/api"
import {List} from "antd"
import {Link} from "react-router-dom"
import './Archive.css'

export interface IArchive {
    year: string
    month: string
    day: string
    count: string
    articles: Array<Article>
}

interface IArchiveState {
    archives: Array<IArchive>
}

class Archive extends React.Component<{}, IArchiveState> {
    readonly state = {archives: new Array<IArchive>()}

    async componentDidMount() {
        this.setState({archives: await getArchives() as Array<IArchive>})
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            this.state.archives.map((archive: IArchive, index: number) =>
                <List
                    key={index}
                    itemLayout="horizontal"
                    bordered={false}
                    header={`${archive.year}年 / ${archive.month}月 / ${archive.day}日`}
                    footer={<div/>}
                    style={{marginBottom: "17px"}}
                    dataSource={archive.articles}
                    renderItem={item => (
                        <List.Item style={{paddingLeft: "10px"}}>
                            <List.Item.Meta
                                title={<Link to={`/article/${item.id}`}>{item.title}</Link>}
                                description={item.preview ? "" : item.preview}
                            />
                        </List.Item>
                    )}
                />
            )
        )
    }
}

export default Archive
