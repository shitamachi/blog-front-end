import React, { FormEvent, useEffect, useState, useRef } from 'react'
// import {ICategory} from "../../components/Categories/Categories"
import { ColumnProps } from "antd/es/table/interface"
import { getAllCategoriesWithArticles, addNewCategory, deleteCategories } from "../../../api/api"
// import {ICategoriesList} from "../../components/CategoriesList"
import { GenericTable, NewItemType } from "../../../components/GenericTable/GenericTable"
import { TableRowSelection } from "antd/lib/table"
import { message } from "antd"
import { useHistory } from "react-router-dom"
import { EditState, GlobalSettingState } from "./EditTagCategory"
import Axios from "axios"

interface CategorySettingState extends GlobalSettingState {

}

export const CategorySetting: React.FC = () => {
    const history = useHistory()
    const [categories, setCategories] = useState<CategorySettingState[]>(new Array<CategorySettingState>())
    const [selectedRow, setSelectedRow] = useState<CategorySettingState[]>(new Array<CategorySettingState>())
    const [newItem, setNewItem] = useState<NewItemType>({} as NewItemType)
    const ref = useRef<GenericTable<CategorySettingState>>(null)

    const columns: ColumnProps<CategorySettingState>[] = [
        { key: 'name', title: 'name', dataIndex: 'name' },
        { key: 'description', title: 'description', dataIndex: 'description' },
        { key: 'count', title: 'count', dataIndex: 'count' },
        { key: 'createDate', title: 'createDate', dataIndex: 'createDate' },
    ]

    const handleDeleteCategories = async (e: React.MouseEvent) => {
        e.preventDefault()
        let res = await deleteCategories(selectedRow)
        if (res !== undefined && res.status === 200) {
            window.location.reload()
        } else {
            message.warn(res === undefined
                ? 'unable to deleted selected rows'
                : `unable to deleted those selected rows ${res.data}`
            )
        }
    }

    const handleEditSubmit = (event: FormEvent<HTMLFormElement>, selectedRow: CategorySettingState) => {
        event.preventDefault()
        console.log(selectedRow)
        console.log('send data')
    }

    const handleEditCategory = (e: React.MouseEvent) => {
        e.preventDefault()
        if (selectedRow.length > 1) {
            message.warn('currently, we don\'t support edit multiple categories')
        }
        let state: EditState = { data: selectedRow[0], handleSubmit: handleEditSubmit }
        history.push("/admin/category/edit", state)
    }

    const handleModalOk = async (e: React.MouseEvent) => {
        e.preventDefault()
        let rep = await addNewCategory({
            name: newItem.name,
            description: newItem.description,
        })
        console.log(rep);

        if (rep !== undefined && rep.status === 200) {
            message.info(rep.message)
            setModalVisible(false)
        } else {
            message.warn('failed to add')
        }
    }

    const setModalVisible = (isVisible: boolean) => {
        if (ref !== null && ref.current !== null) {
            ref.current.changeModalVisible(isVisible)
        }
    }

    const handleRowSelection: TableRowSelection<CategorySettingState> = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRow(selectedRows)
        }
    }

    useEffect(() => {
        //TODO fix unknown memory leak
        const source = Axios.CancelToken.source()
        const fetchAllCategories = async () => {
            const res = await getAllCategoriesWithArticles()
            // const data = res.flatMap(ca => {
            setCategories(res.flatMap(ca => {
                return {
                    id: ca.id,
                    name: ca.name,
                    description: ca.name,
                    count: ca.articles.length,
                    createDate: ca.createDate
                }
            }))
        }
        fetchAllCategories().then(() => {
        })
        return () => {
            source.cancel("cleanup")
        }
    }, [])

    return (
        <GenericTable
            ref={ref}
            settingType={"category"}
            addDataUrl={""}
            dataSource={categories}
            columns={columns}
            handleDeleteData={handleDeleteCategories}
            handleEdit={handleEditCategory}
            setNewItem={setNewItem}
            handleModalOk={handleModalOk}
            rowSelection={handleRowSelection}
            selectedRows={selectedRow} />
    )
}
