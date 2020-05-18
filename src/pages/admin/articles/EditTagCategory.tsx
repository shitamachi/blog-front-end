import React, { FormEvent, useEffect, useState } from 'react'
import { BlockOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input } from "antd";
import { FormComponentProps } from '@ant-design/compatible/es/form';
import TextArea from "antd/es/input/TextArea"
import { RouteComponentProps } from "react-router"
import { withRouter } from 'react-router-dom'
import { BASE_URL } from "../../../api/api"
import Axios from "axios"

export interface GlobalSettingState {
    id: number,
    name: string
    description: string
    count: number
    createDate: string
}

export interface EditState {
    data: GlobalSettingState
    handleSubmit: (event: FormEvent<HTMLFormElement>, selectedRow: GlobalSettingState) => void
}

interface EditTagCategoryProps extends FormComponentProps {
    // interface EditTagCategoryProps<T> extends FormComponentProps<T> {
    item: GlobalSettingState
}

type CurrentEditSettingType = "tags" | "categories"
type Props = RouteComponentProps<{ id: string }> & EditTagCategoryProps

export const EditTagCategory: (props: Props) => React.ReactElement<Props> = (props) => {

    const { form: { getFieldDecorator }, location: { search } } = props

    const currentEditSetting = search.replace('?type=', '')

    const [editedData, setEditedData] = useState<GlobalSettingState>(props.item)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // props.form.getFieldsValue()
        const postUrl: CurrentEditSettingType = currentEditSetting === "tag" ? "tags" : "categories"
        let rep = await Axios.post(`${BASE_URL}/${postUrl}/${props.item.id}`, editedData)
        if (rep.data.status === 200) window.location.reload()
    }

    useEffect(() => {
        console.log(props)
        // const { form } = props
        const { name, description } = props.form.getFieldsValue()
        setEditedData(prevState => ({ ...prevState, name: name, description: description }))
    // }, [props.form])
    },[props])

    return <>
        <Form layout={"vertical"} onSubmit={handleSubmit}>
            <Form.Item label={`${currentEditSetting} name`}>
                {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'please input a name' }]
                })(
                    <Input
                        prefix={<BlockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder={`${props.location.search}`}
                    />
                )}
            </Form.Item>
            <Form.Item label={`${currentEditSetting} description`}>
                {getFieldDecorator('description', {
                    rules: [{ required: true, message: 'please input a name' }]
                })(
                    <TextArea
                        autoSize
                        placeholder={"description"}
                    />
                )}
            </Form.Item>
            <Button type={"primary"} htmlType={"submit"}>
                Save Change
            </Button>
        </Form>
    </>;
}

export const EditTagCategoryTable = Form.create<EditTagCategoryProps>({
    mapPropsToFields: (props) => {
        return props.item ? {
            name: Form.createFormField({
                value: props.item.name
            }),
            description: Form.createFormField({
                value: props.item.description
            }),
        } : {}
    }
})(withRouter(EditTagCategory))
export default EditTagCategoryTable


