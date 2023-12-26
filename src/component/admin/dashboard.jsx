import { Col, Row, Spin, Statistic } from "antd"
import { useEffect, useState } from "react"
import { callDashboard } from "../../service/api"

const Dashboard = () => {
    const [data, setData] = useState({ countUser: 0, countOrder: 0 })
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        const getData = async () => {
            try {
                const res = await callDashboard()
                setData(res.data)
            } catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }

        }
        getData()
    }, [])
    return (<Row gutter={16}>
        {loading ? <Spin>Loading...</Spin> : <>  <Col span={12}>
            <Statistic title="Tổng Người Dùng" value={data.countUser} />
        </Col>
            <Col span={12}>
                <Statistic title="Tổng Đơn Hàng" value={data.countOrder} />

            </Col></>}


    </Row>)

}
export default Dashboard