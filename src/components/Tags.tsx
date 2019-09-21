import React from "react"
import {inject, observer} from "mobx-react"
import {Tag, TagStore} from "../stores/TagStore"
import {Tag as AntdTag} from 'antd'

const colors: string[] = ["magenta", "red", "volcano", "orange",
    "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"]

@inject("tag")
@observer
export class Tags extends React.Component<{ tag?: TagStore, articleId: number }, { tags: Tag[] }> {

    readonly state: { tags: Tag[] } = {tags: Array<Tag>()}

    async componentDidMount(): Promise<void> {
        await this.props.tag!.getAllTagsByArticleId(this.props.articleId)
        this.setState({tags: this.props.tag!.tagsWithArticle})
    }

    render() {
        return (
            <div style={{marginTop: "10px", marginBottom: "7px"}}>
                {
                    this.state.tags.map((tag: Tag, index: number) =>
                        //TODO tag's color should bind to a constant special one in database
                        <AntdTag color={colors[Math.floor(Math.random() * 10 + 1)]}
                                 key={index}>
                            {tag.name}
                        </AntdTag>)
                }
            </div>
        )
    }
}
