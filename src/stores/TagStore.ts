import {action, observable, runInAction} from "mobx"
import {getAllTagsByArticleId, getAllTagsWithArticles} from "../api/api"

export interface Tag {
    id: number
    name: string
    num: number
}

export class TagStore {
    @observable public tags: Tag[] = Array<Tag>()
    @observable public tagsWithArticle: Tag[] = Array<Tag>()

    @action
    getAllTagsWithArticles = async (): Promise<void> => {
        let rep: Tag[] = await getAllTagsWithArticles() as Tag[]
        runInAction(() => this.tags = rep)
    }

    @action
    getAllTagsByArticleId = async (id: number): Promise<void> => {
        let rep: Tag[] = await getAllTagsByArticleId(id) as Tag[]
        runInAction(() => this.tagsWithArticle = rep)
    }
}


