import React, {useEffect, useState} from "react"
import ArticleList, {Article} from "../ArticleList/ArticleList"
import {getArticleById} from '../../api/api'
import {RouteComponentProps} from 'react-router-dom'
import {Typography} from "antd"
import './ArticleDetail.css'
import ReactMarkdown from "react-markdown"
const {Title, Text} = Typography

interface Params {
    id: string
}

const ArticleDetail: React.FC<RouteComponentProps<Params>> = (props: RouteComponentProps<Params>) => {
    const [article, setArticle] = useState<Article>(
        {content: "", date: "", id: 0, title: ""}
    )


    useEffect(() => {
        getArticleById(props.match.params.id)
            .then((r: Article | void) => {setArticle((r as Article))})
    }, [props.match.params.id])

    return (
        <Typography >
            <Title>{article.title}</Title>
            <Text className='meta'>{new Date(article.date).toLocaleString()}</Text>
            <Text className='meta'>{article.title}</Text>
            <Text className='meta'>{`共 ${article.content.trim().length} 字`}</Text>
            <Text className='meta'>{`或需要 ${Math.floor(article.content.trim().length / 300)} 分钟来阅读`}</Text>
            <ReactMarkdown source={article.content}/>
        </Typography>
    )
}

export default ArticleDetail
