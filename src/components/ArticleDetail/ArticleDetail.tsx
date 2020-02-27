import React from "react"
import { Article } from "../ArticleList/ArticleList"
import { getArticleById, getAllCategoriesByArticleId } from '../../api/api'
import { RouteComponentProps } from 'react-router-dom'
import { Typography } from "antd"
import './ArticleDetail.css'
import ReactMarkdown from "react-markdown"
import Categories, { ICategory } from "../Categories/Categories"
import Tags from "../Tags"

const { Title, Text } = Typography

interface Params {
    id: string
}

interface IArticleDetailState {
    article: Article
    categories: ICategory[]
}

class ArticleDetail extends React.Component<RouteComponentProps<Params>, IArticleDetailState> {

    constructor(props: RouteComponentProps<Params>) {
        super(props);
        this.state = {
            article: { content: "", date: "", id: 0, title: "" },
            categories: []
        }
    }

    async componentDidMount(): Promise<void> {
        let articleRep: Article | void = await getArticleById(this.props.match.params.id)
        let categoriesRep: ICategory[] | void = await getAllCategoriesByArticleId(this.props.match.params.id)
        this.setState({ categories: categoriesRep as ICategory[] })
        this.setState({ article: articleRep as Article })
    }

    render() {
        return (
            <Typography>
                <Title>{this.state.article.title}</Title>
                <Text className='meta'>{new Date(this.state.article.date).toLocaleString()}</Text>
                <Categories categories={this.state.categories} />
                <Text className='meta'>{`共 ${this.state.article.content.trim().length} 字`}</Text>
                <Text
                    className='meta'>{`或需要 ${Math.floor(this.state.article.content.trim().length / 300)} 分钟来阅读`}</Text>
                <Tags articleId={parseInt(this.props.match.params.id)} />
                <ReactMarkdown source={this.state.article.content} />
            </Typography>
        )
    }
}

export default ArticleDetail

