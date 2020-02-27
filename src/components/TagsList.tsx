import React from "react"
import {getAllTagsWithArticles} from "../api/api"
import {Tabs} from "antd"
import {Article} from "./ArticleList/ArticleList"
import {Link} from "react-router-dom"
import { Tag } from "@/models/TagState"

const {TabPane} = Tabs

export interface ITagsList extends Tag {
    articles: Article[]
}

interface ITagsListState {
    list: ITagsList[]
}

export class TagsList extends React.Component<{}, ITagsListState> {

    readonly state: ITagsListState = {list: new Array<ITagsList>()}

    async componentDidMount(): Promise<void> {
        let rep = await getAllTagsWithArticles()
        if (rep !== null) {
            this.setState({list: rep})
        }
    }

    render() {
        return (
            <Tabs>
                {this.state.list.map((tag: ITagsList, index: number) =>
                    <TabPane tab={tag.name} key={index.toString()}>
                        {
                            tag.articles.map((article: Article) =>
                                <p key={article.id}>
                                    <Link to={`/article/${article.id}`}>
                                        {article.title}
                                    </Link>
                                </p>)
                        }
                    </TabPane>
                )}
            </Tabs>
        )
    }
}
