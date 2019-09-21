import React from "react"
import {Card} from "antd"
import {Article} from "../ArticleList/ArticleList"
import './ArticleItem.css'
import {Link} from "react-router-dom"
import {Tags} from "../Tags"

export interface IArticleItemProps {
    article: Article
}

const ArticleItem: React.FC<IArticleItemProps> = (props: IArticleItemProps) => {
    return (
        <Card title={props.article.title} bordered={false} style={{marginBottom: "7px"}}>
            <p>{props.article.date}</p>
            <p className="content-display">{props.article.content}</p>
            <Tags articleId={props.article.id}/>
            <Link to={`/article/${props.article.id}`}>Read More...</Link>
        </Card>
    )
}

export default ArticleItem
