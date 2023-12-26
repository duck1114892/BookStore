import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Button, Checkbox, Col, Form, Input, InputNumber, Layout, Menu, Row, theme } from 'antd';
import { getCateGory } from "../service/api";
import { filter, isFilter, isRange, setDefault } from '../redux/filter/action';
import { MenuFoldOutlined, MenuUnfoldOutlined, RedoOutlined, RollbackOutlined } from '@ant-design/icons';

const SiderComponent = () => {
    const [form] = Form.useForm();
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [restField, setResetField] = useState(false)
    const dispatch = useDispatch();
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const onChange = (checkedValues) => {
        dispatch(filter(checkedValues));
        if (checkedValues.length !== 0) {
            dispatch(isFilter(true))
            setResetField(true)

        }
        else {
            dispatch(isFilter(false))
            setResetField(false)

        }
    };

    const { token: { colorBgContainer } } = theme.useToken();
    const onFinish = (values) => {



        if (values) {
            setResetField(true)

            let string = `price>=${values?.from}&price<=${values?.to}`
            dispatch(isRange(string))


        }


    };
    const cancelForm = () => {
        setResetField(!restField)
        dispatch(setDefault())
        form.resetFields()
    }
    useEffect(() => {
        const getCategoryApi = async () => {
            setLoading(true);
            try {
                const data = await getCateGory();
                setResult(data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        getCategoryApi();
    }, []);

    return (
        <Layout.Sider
            style={{
                background: colorBgContainer,
                paddingTop: "90px",
                height: "100vh"
            }}
            width={300}
        >
            {restField ? (<Button shape='circle' style={{ position: 'absolute', right: '10px' }} onClick={() => cancelForm()}>
                <RedoOutlined />
            </Button>) : <></>}

            <Form
                name='range'
                form={form}
                onFinish={onFinish}>
                <div style={{ fontSize: "20px", textAlign: 'center' }}>Thể Loại :</div>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <Form.Item name="checkbox" >
                        <Checkbox.Group
                            style={{
                                width: '100%',
                            }}
                            onChange={onChange}
                        >
                            <Row>
                                {result.map((item) => (
                                    <Col span={20} key={item}>
                                        <Checkbox style={{ marginLeft: '10%', fontSize: "17px" }} value={item}>{item}</Checkbox>
                                    </Col>
                                ))}
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>)}
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: "20px", textAlign: 'center', width: '100%' }}>Khoảng Giá :</div>

                    <Row gutter={8}>
                        <Col span={11}>
                            <Form.Item
                                name="from"

                            >
                                <InputNumber name='from ' placeholder='Từ' />
                            </Form.Item>
                        </Col>
                        <Col span={2}>-</Col>
                        <Col span={11}>
                            <Form.Item
                                name="to"
                            >
                                <InputNumber name='to' placeholder='Đến' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                    >
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button type='primary' onClick={() => form.submit()}>
                                Áp Dụng
                            </Button>
                        </div>
                    </Form.Item>
                </div>
            </Form>

        </Layout.Sider>
    );
}

export default SiderComponent;
