import React, { useEffect, useState, useRef } from 'react'
import { GenericTable, NewItemType } from "../../../components/GenericTable/GenericTable"
import { getAllTagsWithArticles, addNewTag, deleteTags } from "@/api/api"
import { TableRowSelection } from 'antd/lib/table/interface'
import { ColumnProps } from "antd/es/table"
import Axios from "axios"
import { message } from 'antd'

interface TagSettingState {
    id: number,
    name: string
    description: string
    count: number
    createDate: string
}

export const TagSetting: React.FC = () => {

    const [tags, setTags] = useState<TagSettingState[]>(new Array<TagSettingState>())
    const [selectedRow, setSelectedRow] = useState<TagSettingState[]>(new Array<TagSettingState>())
    const [newItem, setNewItem] = useState<NewItemType>({} as NewItemType)
    const ref = useRef<GenericTable<TagSettingState>>(null)

    const columns: ColumnProps<TagSettingState>[] = [
        { key: 'name', title: 'name', dataIndex: 'name' },
        { key: 'description', title: 'description', dataIndex: 'description' },
        { key: 'count', title: 'count', dataIndex: 'count' },
        { key: 'createDate', title: 'createDate', dataIndex: 'createDate' },
    ]

    const handleRowSelection: TableRowSelection<TagSettingState> = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRow(selectedRows)
        }
    }

    const handleDeleteTags = async (e: React.MouseEvent) => {
        e.preventDefault()
        console.log('selected rows: ')
        console.log(selectedRow)
        let rep = await deleteTags(selectedRow)
        if (rep !== undefined && rep.status === 200) {
            window.location.reload()
        } else {
            message.warn(rep === undefined
                ? 'unable to deleted selected rows'
                : `unable to deleted those selected rows ${rep.data}`
            )
        }
    }

    // TODO
    const handleModalOk = async (e: React.MouseEvent) => {
        e.preventDefault()
        let rep = await addNewTag({
            name: newItem.name,
            description: newItem.description,
        })
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

    useEffect(() => {
        //TODO fix unknown memory leak
        const source = Axios.CancelToken.source()
        const fetchTags = async () => {
            let rep = await getAllTagsWithArticles()
            // console.log(rep)
            const data = rep.flatMap(tag => {
                return {
                    id: tag.id,
                    name: tag.name,
                    description: tag.description ?? "no description",
                    count: tag.count,
                    createDate: tag.createDate
                }
            })
            //check this operation
            setTags(data)
        }

        fetchTags().then(() => {
        })

        return () => {
            source.cancel('cleanup')
            console.log('cleanup')
        }
    }, [])

    return (
        <GenericTable
            ref={ref}
            settingType={"tag"}
            addDataUrl={""}
            dataSource={tags}
            columns={columns}
            handleDeleteData={handleDeleteTags}
            rowSelection={handleRowSelection}
            selectedRows={selectedRow}
            handleModalOk={handleModalOk}
            setNewItem={setNewItem} />
    )
}
