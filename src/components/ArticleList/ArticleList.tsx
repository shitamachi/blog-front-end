import React from "react"
import {getAllArticles} from '../../api/api'
import ArticleItem from "../ArticleItem/ArticleItem"

export interface Article {
    id: number
    title: string
    content: string
    preview?: string
    date: string
}

interface IArticleListState {
    articles: Array<Article>
}

class ArticleList extends React.Component<{}, IArticleListState> {
    readonly state = {articles: Array<Article>()}

    async componentDidMount(): Promise<void> {
        let rep: Article[] = await getAllArticles() as Article[]
        this.setState({articles: rep})
    }

    render() {
        return (
            this.state.articles.map((article: Article) => <ArticleItem article={article} key={article.id}/>)
        )
    }
}

export default ArticleList
