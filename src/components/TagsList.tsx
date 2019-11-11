import React from "react"
import {getAllTagsWithArticles} from "../api/api"
import {Tabs} from "antd"
import {Article} from "./ArticleList/ArticleList"
import {Link} from "react-router-dom"
import {ICategoriesList} from "./CategoriesList"
import {Tag} from "../stores/TagStore"

const {TabPane} = Tabs

export interface ITagsListList extends Tag {
    articles: Article[]
}

interface ITagsListState {
    list: ITagsListList[]
}

export class TagsList extends React.Component<{}, ITagsListState> {

    readonly state: ITagsListState = {list: new Array<ITagsListList>()}

    async componentDidMount(): Promise<void> {
        let rep = await getAllTagsWithArticles()
        if (rep !== null) {
            this.setState({list: rep})
        }
    }

    render() {
        return (
            <Tabs>
                {this.state.list.map((tag: ITagsListList, index: number) =>
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
