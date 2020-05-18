import React from 'react'
import {Col, List, Row, Statistic, Tabs} from 'antd'

const {TabPane} = Tabs
export const Dashboard: React.FC = () => {
    return (
        <div>
            <Row justify="start">
                <Col span={4}>
                    <Statistic title="Articles" value={112893}/>
                </Col>
                <Col span={4}>
                    <Statistic title="Comments" value={112893}/>
                </Col>
                <Col span={4}>
                    <Statistic title="Total Visitor" value={112893}/>
                </Col>
                <Col span={4}>
                    <Statistic title="Run Time" value={112893}/>
                </Col>
                <Tabs defaultActiveKey="ra">
                    <TabPane tab="recent article" key="ra"><List></List></TabPane>
                    <TabPane tab="recent comment" key="rc"><List></List></TabPane>
                </Tabs>
                <p>操作记录</p>
            {/* TODO 快速草稿*/}
            {/* TODO 最近活动*/}
            </Row>
        </div>
    )
}
