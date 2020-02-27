import React from "react"
import { Tag as AntdTag } from 'antd'
import { ThunkDispatch } from "redux-thunk"
import { AppState } from "@/stores"
import { Action } from "redux"
import { fetchAllTagsByArticleId } from "@/actions/tag"
import { connect } from "react-redux"
import { TagState, Tag } from "@/models/TagState"
import { getAllTagsByArticleId } from "@/api/api"

export const colors: string[] = ["magenta", "red", "volcano", "orange",
    "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"]

interface TagsProps {
    articleId: number
    tags: TagState
    fetchAllTagsByArticleId: (articleId: number) => void
}

class Tags extends React.Component<TagsProps, { tags: Tag[] }> {

    readonly state: { tags: Tag[] } = { tags: Array<Tag>() }

    async componentDidMount() {
        //TODO: use redux to refactor
        //eslint-disable-next-line
        const { fetchAllTagsByArticleId, articleId, tags } = this.props
        const rep = await getAllTagsByArticleId(articleId)
        this.setState({ tags: rep })
    }

    handleClick = (e: React.MouseEvent, tagId?: number) => {
        e.preventDefault()
        window.location.href = '/tags'
    }

    render() {
        console.log('props tags');
        const { tags } = this.props
        console.log(tags);

        return (
            <div style={{ marginTop: "10px", marginBottom: "7px" }}>
                {
                    this.state.tags.map((tag: Tag, index: number) =>
                        //TODO tag's color should bind to a constant special one in database
                        <AntdTag color={colors[Math.floor(Math.random() * 10 + 1)]}
                            key={index}
                            onClick={this.handleClick}
                        >
                            {tag.name}
                        </AntdTag>)
                }
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    tags: state.tag
})

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, null, Action<string>>) => ({
    fetchAllTagsByArticleId: (articleId: number) => {
        dispatch(fetchAllTagsByArticleId(articleId))
    }
})

export default connect<ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps>,
    { articleId: number },
    AppState>
    (mapStateToProps, mapDispatchToProps)(Tags)