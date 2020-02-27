import { Article } from "../components/ArticleList/ArticleList";
import { ICategory } from "../components/Categories/Categories";
import { Tag } from "./TagState";

export interface SpecificArticle {
    article: Article
    tags: Tag[]
    categories: ICategory[]
}
