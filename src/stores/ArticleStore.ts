import {Article} from "../components/ArticleList/ArticleList"
import {action, observable, runInAction} from "mobx"
import {getAllArticles} from "../api/api"

export class ArticleStore {
    @observable
    public articles: Article[] = Array<Article>()

    @action
    getArticle = async (): Promise<void> => {
        let rep = await getAllArticles() as Article[]
        runInAction(() => this.articles = rep)
    }
}

