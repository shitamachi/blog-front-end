import React from "react"
import { Button, Divider, Col, Collapse} from "antd"
import ReactMarkdown from "react-markdown"
import ReactMde from "react-mde"
import "react-mde/lib/styles/css/react-mde-all.css"
import { Input } from 'antd'
import { Article } from "@/components/ArticleList/ArticleList"
import { postNewArticle } from "@/api/api"
import { RouteComponentProps, withRouter, Prompt } from "react-router-dom"
import { EditableArticle } from "./ArticleSetting"

const { Panel } = Collapse

type selectedTab = "write" | "preview"
type EditArticleState = { article: Article, loading: boolean, tab: selectedTab, isNewArticle: boolean }
// type EditArticleProps = RouteComponentProps<{ id: string }> & { article: Article }
type EditArticleProps = RouteComponentProps<{ id: string }> & { article: EditableArticle }


class EditArticle extends React.Component<EditArticleProps, EditArticleState> {

    constructor(props: EditArticleProps) {
        super(props)
        this.state = {
            article: {} as Article,
            tab: "write",
            loading: false,
            isNewArticle: this.props.match.params.id === "add"
        }
    }

    handleValueChange = (value: string) => {
        this.setState((prevState: Readonly<EditArticleState>) => {
            return { article: { ...prevState.article, content: value } } as EditArticleState
        })
    }

    handleTabChange = (tab: "write" | "preview") => {
        this.setState({ tab })
    }

    handleUploadArticle = async () => {
        const id = this.state.isNewArticle ? undefined : this.state.article.id
        this.setState((prevState: Readonly<EditArticleState>) => {
            return { article: { ...prevState.article, id: id, date: new Date(Date.now()).toISOString() } }
        })
        this.setState({ loading: true })
        console.log('handleUploadArticle: new article')
        console.log(this.state.article)
        await postNewArticle(this.state.article)
        this.setState({ loading: false })
    }

    // static getDerivedStateFromProps(nextProps: Readonly<EditArticleProps>, prevState: Readonly<EditArticleState>) {
    static getDerivedStateFromProps(nextProps: EditArticleProps, prevState: EditArticleState): EditArticleState {
        if (nextProps.match.params.id === "add") {
            return { ...prevState, isNewArticle: true }
        }
        if (nextProps.location.state === null || nextProps.location.state === undefined) {
            return prevState
        }
        return { ...prevState, article: nextProps.location.state as Article}
    }

    componentDidMount() {
        console.log(this.props);
        console.log(`state null`)
        this.props.location.state = null
    }

    componentDidUpdate(prevProps: Readonly<EditArticleProps>, prevState: Readonly<EditArticleState>, snapshot?: any): void {
        console.log(this.state)
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        const { article } = this.state
        return (
            <div>
                <Col xs={4} sm={6} md={10} lg={15} xl={18}>
                    <Prompt message="Are you sure you want to leave?" />
                    <Divider orientation="left">Input article title and preview</Divider>
                    <Input
                        value={article.title}
                        addonBefore={"Title: "}
                        placeholder="input article title" allowClear onChange={
                            event => {
                                event.preventDefault()
                                const value = event.target.value
                                this.setState((prevState: Readonly<EditArticleState>) => {
                                    return { article: { ...prevState.article, title: value } }
                                })
                            }
                        } />
                    <Input
                        style={{ marginTop: '10px' }}
                        value={article.preview !== undefined ? article.preview : ""}
                        addonBefore={"Preview: "}
                        placeholder="input article preview" allowClear onChange={
                            event => {
                                event.preventDefault()
                                const value = event.target.value
                                this.setState((prevState: Readonly<EditArticleState>) => {
                                    return { article: { ...prevState.article, preview: value } }
                                })
                            }
                        } />
                    <Divider orientation="left">Edit Content</Divider>
                    <ReactMde
                        value={this.state.article.content}
                        onChange={this.handleValueChange}
                        onTabChange={this.handleTabChange}
                        selectedTab={this.state.tab}
                        generateMarkdownPreview={markdown =>
                            Promise.resolve(<ReactMarkdown source={markdown} />)}
                    />
                    <Divider orientation="right">
                        {<Button type={"primary"}
                            onClick={this.handleUploadArticle}
                            loading={this.state.loading}
                        >
                            Submit
                    </Button>}
                    </Divider>
                </Col>
                <Col xs={20} sm={16} md={12} lg={8} xl={6} style={{ padding: '10px' }}>
                    {/* TODO: finish it */}
                    <Collapse bordered={false}>
                        <Panel header="Category" key="category">
                            {
                                this.props?.article?.categories
                            }
                        </Panel>
                        <Panel header="Tag" key="tag">
                            {
                                this.props?.article?.tags
                            }
                        </Panel>
                        <Panel header="Comment" key="comment">
                            <p> {'comment'}</p>
                        </Panel>
                    </Collapse>
                </Col>
            </div>
        )
    }
}

const EditArticleWithRouter = withRouter(EditArticle)
export default EditArticleWithRouter
