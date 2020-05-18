import React, { SetStateAction, Dispatch } from 'react'
import { ColumnProps } from "antd/es/table"
import { Button, Divider, Table, Modal, Input } from "antd"
import { Link } from "react-router-dom"
import { TableRowSelection } from 'antd/lib/table/interface'

type OwnIdType = { id: string | number }
type SettingType = "article" | "tag" | "category"
export type NewItemType = { name: string, description: string }

interface GenericTableProps<T extends OwnIdType> {
    settingType: SettingType
    addDataUrl: string
    dataSource: T[]
    columns: ColumnProps<T>[]
    handleDeleteData: (e: React.MouseEvent) => void
    handleEdit?: (e: React.MouseEvent) => void
    handleModalOk: (e: React.MouseEvent) => void
    setNewItem: Dispatch<SetStateAction<NewItemType>>
    rowSelection: TableRowSelection<T>
    selectedRows: T[]
}

interface GenericTableState<T extends OwnIdType> {
    selectRows: T[]
    newItem: T
    visible: boolean
    confirmLoading: boolean
}

export class GenericTable<T extends OwnIdType> extends React.Component<GenericTableProps<T>, GenericTableState<T>> {

    readonly state: GenericTableState<T> = {
        selectRows: [] as T[],
        newItem: {} as T,
        visible: false,
        confirmLoading: false
    }

    rowSelection: TableRowSelection<T> = {
        onChange: (selectedRowKeys, selectedRows) => {
            this.setState({ selectRows: selectedRows })
        },
        getCheckboxProps: () => ({})
    }

    EditSelectedRowLink = () => {
        const { settingType: settingName } = this.props
        //TODO
        if (settingName === 'article') {
            return (
                <Link to={{
                    pathname: `/admin/articles/${this.props.selectedRows[0].id}`,
                    // search: ``,
                    state: this.props.selectedRows[0]
                }}>Edit {settingName}</Link>
            )
        } else {
            return (
                <Link to={{
                    pathname: "/admin/edit",
                    search: `?type=${this.props.settingType.toLocaleLowerCase()}`,
                    state: this.props.selectedRows[0]
                }}>
                    Edit {settingName}
                </Link>
            )
        }
    }

    handleClickNewItemButton = (e: React.MouseEvent) => {
        e.preventDefault()
        if (this.props.settingType === "article") {
            window.location.href = "/admin/articles/add"
        } else {
            this.setState({ visible: true })
        }
    }

    changeModalVisible = (isVisible: boolean) => {
        this.setState({ visible: isVisible })
    }

    handleCancel = (e: React.MouseEvent) => {
        e.preventDefault()
        this.changeModalVisible(false)
    }

    handleModalOnChange = (value: string, type: keyof NewItemType) => {
        const { setNewItem } = this.props
        if (type === 'name') {
            setNewItem(prevState => ({ ...prevState, name: value }))
        } else {
            setNewItem(prevState => ({ ...prevState, description: value }))
        }
    }

    render() {
        const { settingType: settingName, handleModalOk } = this.props
        const { visible, confirmLoading } = this.state
        return (
            <React.Fragment>
                <Button type={"primary"}
                    onClick={this.handleClickNewItemButton}>
                    New {settingName}
                </Button>
                <Divider orientation={"left"}>Details</Divider>
                <Table
                    title={
                        () => (
                            this.props.selectedRows.length > 0
                                ? (<React.Fragment>
                                    <Button type={"danger"}
                                        onClick={async (e) => {
                                            await this.props.handleDeleteData(e)
                                        }}>
                                        Delete Selected {settingName}
                                    </Button>
                                    <Button
                                        type={"primary"}
                                        style={{ marginLeft: "7px" }}
                                        // onClick={this.props.handleEdit}
                                        disabled={this.props.selectedRows.length > 1}
                                    >
                                        {this.EditSelectedRowLink()}
                                    </Button>
                                </React.Fragment>)
                                : <h3>Select {settingName}</h3>
                        )
                    }
                    dataSource={this.props.dataSource}
                    columns={this.props.columns}
                    rowSelection={this.props.rowSelection}
                    rowKey={record => record.id as string}
                />
                <Modal
                    title={`create new ${settingName}`}
                    visible={visible}
                    onOk={handleModalOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <Input addonBefore={"name"} onChange={(e) => {
                        this.handleModalOnChange(e.target.value, 'name')
                    }} />
                    <Input addonBefore={"description"} onChange={(e) => {
                        this.handleModalOnChange(e.target.value, 'description')
                    }} />
                </Modal>
            </React.Fragment>
        )
    }
}


