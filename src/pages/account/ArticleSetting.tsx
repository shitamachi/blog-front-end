import React from "react"
import { Button, List, message } from "antd"
import { deleteArticle, getAllArticles } from "../../api/api"
import { Article } from "../../components/ArticleList/ArticleList"
import { Tag } from "../../stores/TagStore"
import { Tags } from "../../components/Tags"
import { RouteComponentProps, withRouter, Link } from "react-router-dom"

type ArticleWithTag = {
    article: Article,
    tags: Tag[]
}

interface IArticleSettingState {
    articles: Article[],
    tags: Tag[],
    articleDetail: ArticleWithTag[]
}

class ArticleSetting extends React.Component<RouteComponentProps<{ id: string }>, IArticleSettingState> {

    readonly state: IArticleSettingState = {
        articles: new Array<Article>(),
        tags: new Array<Tag>(),
        articleDetail: new Array<ArticleWithTag>(),
    }

    handleDeleteArticle = async (e: React.MouseEvent, id: string) => {
        e.preventDefault()
        let rep = await deleteArticle(id)
        message.warn(`${rep.data.message}`)
        if (rep.data.status === 200) this.forceUpdate()
    }

    async componentDidMount() {
        // console.log("componentDidMount")
        this.setState({ articles: await getAllArticles() as Article[] })
        // console.log(this.state)
    }

    render() {
        const { articles } = this.state
        return (
            <div>
                <List
                    header={
                        <Button type={"primary"}
                            onClick={e => {
                                e.preventDefault()
                                // history.push("/admin/articles/add")
                                window.location.href = "/admin/articles/add"
                            }}
                        >
                            Add NewArticle
                        </Button>
                    }
                    itemLayout="horizontal"
                    dataSource={articles}
                    renderItem={(item: Article, index: number) => (
                        <List.Item
                            key={index}
                            actions={[
                                <Tags articleId={item.id!} />,
                                <span>{new Date(item.date).toLocaleString()}</span>,
                                <Button type={"primary"}>
                                    <Link to={{
                                        pathname: `/admin/articles/${item.id}`,
                                        state: item
                                    }}>
                                        Edit
                                    </Link></Button>,
                                <Button
                                    type={"danger"}
                                    onClick={(e) => this.handleDeleteArticle(e, item.id!.toString())}
                                >
                                    Delete
                                </Button>,
                            ]}
                        >
                            <List.Item.Meta
                                title={item.title}
                                description={item.preview ? item.content.substring(0, 50) : item.preview}>
                            </List.Item.Meta>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}


const ArticleSettingWithRouter = withRouter(ArticleSetting)
export default ArticleSettingWithRouter
