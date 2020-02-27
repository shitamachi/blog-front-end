import React from "react"
import {Card} from "antd"
import {Article} from "../ArticleList/ArticleList"
import './ArticleItem.css'
import {Link} from "react-router-dom"
import Tags from "../Tags"

export interface IArticleItemProps {
    article: Article
}

const ArticleItem: React.FC<IArticleItemProps> = (props: IArticleItemProps) => {
    return (
        <Card title={props.article.title} bordered={false} style={{marginBottom: "7px"}}>
            <p>{new Date(props.article.date).toLocaleString()}</p>
            <p className="content-display">{props.article.preview ?? props.article.content}</p>
            {/*<div className="content-display" dangerouslySetInnerHTML={{__html: marked(props.article.content)}} />*/}
            <Tags articleId={props.article.id!}/>
            <Link to={`/article/${props.article.id}`}>Read More...</Link>
        </Card>
    )
}

export default ArticleItem
