import React from 'react'
import { ICategory } from './Categories/Categories'
import { Tabs } from 'antd'
import { Article } from './ArticleList/ArticleList'
import { getAllCategoriesWithArticles } from '../api/api'
import { Link } from 'react-router-dom'

const { TabPane } = Tabs

export interface ICategoriesList extends ICategory {
    articles: Article[]
}

interface ICategoriesListState {
    categories: ICategoriesList[]
}

class CategoriesList extends React.Component<{}, ICategoriesListState> {

    readonly state = { categories: Array<ICategoriesList>() }

    async componentDidMount(): Promise<void> {
        let rep: ICategoriesList[] = await getAllCategoriesWithArticles() as ICategoriesList[]
        this.setState({ categories: rep })
    }

    render() {
        return (
            <Tabs>
                {this.state.categories.map((category: ICategoriesList, index: number) =>
                    <TabPane tab={category.name} key={index.toString()}>
                        {
                            category.articles.map((article: Article) =>
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

export default CategoriesList