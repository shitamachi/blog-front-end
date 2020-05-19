import React from "react"
import { message } from "antd"
import { deleteOneArticle, getAllArticles, getAllTagsByArticleId, getAllCategoriesByArticleId } from "../../../api/api"
import { Article } from "../../../components/ArticleList/ArticleList"
import { Tag } from "@/models/TagState"
import { RouteComponentProps, withRouter } from "react-router-dom"
import { ColumnProps } from "antd/es/table"
import { TableRowSelection } from 'antd/lib/table/interface'
import { GenericTable } from "../../../components/GenericTable/GenericTable"

type ArticleWithTag = {
    article: Article,
    tags: Tag[]
}


export interface EditableArticle {
    id: number
    title: string
    preview: string
    content: string
    author: string
    categories: string[]
    tags: string[]
    comment: string
    publishDate: string
}

interface IArticleSettingState {
    articles: Article[],
    tags: Tag[],
    articleDetail: ArticleWithTag[],
    editableArticle: EditableArticle[],
    selectRows: EditableArticle[]
}

class ArticleSetting extends React.Component<RouteComponentProps<{ id: string }>, IArticleSettingState> {

    static ADD_ARTICLE_URL = "articles/add"

    readonly state: IArticleSettingState = {
        articles: new Array<Article>(),
        tags: new Array<Tag>(),
        articleDetail: new Array<ArticleWithTag>(),
        editableArticle: [] as EditableArticle[],
        selectRows: [] as EditableArticle[],
    }

    handleDeleteArticle = async (e: React.MouseEvent) => {
        e.preventDefault()
        const { selectRows } = this.state
        if (selectRows.length === 0) return
        let deleteRep = await Promise.all(selectRows.map(async (row) => {
            return await deleteOneArticle(row.id)
        }))
        deleteRep.forEach(rep => {
            if (rep.status !== 200)
                message.error("文章删除出错")
        })
        window.location.reload()
    }

    async fetchData() {
        const defaultValue: string = "default"
        let articles: Article[] | null = await getAllArticles() as Article[]
        return articles.flatMap(async article => {
            return {
                id: article.id!,
                title: article.title,
                author: defaultValue,
                preview: article.preview !== undefined ? article.preview : '',
                content: article.content,
                categories: ((await getAllCategoriesByArticleId(article.id!)).flatMap(category => category.name)),
                comment: defaultValue,
                publishDate: new Date(article.date).toLocaleTimeString(),
                tags: (await getAllTagsByArticleId(article.id!)).flatMap(tag => tag.name)
            }
        })
    }

    async componentDidMount() {
        this.setState({
            editableArticle: await Promise.all(await this.fetchData())
        })
    }

    columns: ColumnProps<EditableArticle>[] = [
        { key: 'title', title: 'title', dataIndex: 'title' },
        { key: 'author', title: 'author', dataIndex: 'author' },
        { key: 'category', title: 'category', dataIndex: 'category' },
        { key: 'tags', title: 'tags', dataIndex: 'tags' },
        { key: 'comment', title: 'comment', dataIndex: 'comment' },
        { key: 'publishDate', title: 'publishDate', dataIndex: 'publishDate' }
    ]

    rowSelection: TableRowSelection<EditableArticle> = {
        onChange: (selectedRowKeys, selectedRows) => {
            this.setState({ selectRows: selectedRows })
        },
    }

    render() {
        return (
            <GenericTable
                settingType={"article"}
                addDataUrl={ArticleSetting.ADD_ARTICLE_URL}
                dataSource={this.state.editableArticle}
                columns={this.columns}
                handleDeleteData={this.handleDeleteArticle}
                rowSelection={this.rowSelection}
                selectedRows={this.state.selectRows}
                handleEdit={() => { }}
                handleModalOk={() => { }}
                setNewItem={{} as any} />
        )
    }
}


const ArticleSettingWithRouter = withRouter(ArticleSetting)
export default ArticleSettingWithRouter
