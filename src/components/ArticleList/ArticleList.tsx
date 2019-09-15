import React from "react"
import {getAllArticles, Response} from '../../api/api'
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

    componentDidMount(): void {
        getAllArticles().then((rep: Response<Article>) => {
            console.log(rep)
            this.setState({articles: rep.data as Array<Article>})
        })
    }

    render() {
        return (
            this.state.articles.map((article: Article) => <ArticleItem article={article} key={article.id}/>)
        )
    }
}

export default ArticleList
