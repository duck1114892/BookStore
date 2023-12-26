import { useEffect, useState } from "react"
import { callHistory } from "../service/api"
import { Button, Col, Layout, List, Row, Table, Typography } from "antd"
import { Link } from "react-router-dom"
import { ArrowLeftOutlined } from "@ant-design/icons"
import AvataComponent from "../component/avataComponent"
import '../../public/scss/viewOrder.css'
import { Content, Footer, Header } from "antd/es/layout/layout"
const ViewOrder = () => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await callHistory()
                setData(res.data)
                setLoading(true)

            } catch (error) {

            }
            finally {
                setLoading(false)
            }

        }
        getData()
    }, [])
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'phone',
            dataIndex: 'phone',
        },
        {
            title: 'Detail',
            dataIndex: 'detail',
            render: (detail) => (
                <>
                    {detail.map((item) => (
                        <div className="listItem" key={item._id}>
                            {item.bookName} x {item.quantity}
                        </div>
                    ))}
                </>
            ),
        },
        {
            title: 'Total',
            dataIndex: 'totalPrice',
            sorter: {
                compare: (a, b) => a.totalPrice - b.totalPrice,
                multiple: 1,
            },
            render: (e) => {

                return <span> {e.toLocaleString('vn-VN', { style: 'currency', currency: 'VND' })}</span>
            }
        },
    ];
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    return (
        <>
            <Layout style={{ height: "100vh", width: "100vw" }}>
                <Header style={{ height: "7vh", width: "100%", backgroundColor: "white" }}>
                    <Row style={{ display: 'flex', justifyContent: "center", width: "100%", textAlign: "center" }}>
                        <Col span={8}> <Link to="/"><Button className="backBtn" style={{

                        }}>
                            <ArrowLeftOutlined ></ArrowLeftOutlined></Button>
                        </Link></Col>
                        <Col span={8}>  <div className="text" style={{ fontSize: "40px", }}>History</div></Col>
                        <Col span={8}> <AvataComponent props={true}></AvataComponent></Col>
                    </Row>
                </Header>
                <Content style={{}}>
                    <Table style={{ width: "100vw" }} columns={columns} dataSource={data} onChange={onChange} />
                </Content>

            </Layout>
        </>
    )
}
export default ViewOrder