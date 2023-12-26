import { Button, Checkbox, Form, Input, Layout, message } from "antd"
import { Content, Footer, Header } from "antd/es/layout/layout";
import '../../styles/reset.css'
import '/public/scss/login.css'
import { useState } from "react";
import { registerApi } from "../../service/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const SignUpPage = () => {
    let [loading, setLoading] = useState(false)
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const onFinish = async (values) => {
        setLoading(true)
        const data = await registerApi(values.username, values.email, values.phone, values.password)
        if (data.statusCode === 201) {
            message.success(`Đã Đăng Ký ${data.data.email}`)

            navigate('/login')

        }
        else {
            message.error(data.message)
            setLoading(false)
        }
    };
    const onFinishFailed = (errorInfo) => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
        setLoading(true)

    };
    return (
        <Layout style={{ minHeight: '100vh' }} >

            <Header style={{
                color: "Blacks",
                backgroundColor: 'white',
                textAlign: 'center',
                fontSize: "30px"
            }}>Đăng Ký</Header>
            <Content
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Form
                    name="basic"
                    layout="vertical"
                    className="form"
                    labelCol={{
                        span: 8,

                    }}
                    wrapperCol={{
                        span: 24,

                    }}

                    style={{
                        display: 'flex',
                        width: '100%',
                        flexDirection: "column",
                        alignItems: 'center'

                    }}
                    initialValues={{
                        remember: true,
                    }}

                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        style={{ width: "60%" }}
                        name="username"
                        label='Tên Tài Khoản'
                        className="form-item"
                        rules={[
                            {
                                required: true,
                                message: 'Vui Lòng Nhập Tên Tài Khoản !',
                            },
                        ]}
                    >

                        <Input className="input" />
                    </Form.Item>
                    <Form.Item
                        style={{ width: "60%" }}
                        name="email"
                        label='Email'
                        className="form-item"
                        rules={[
                            {
                                required: true,
                                message: 'Vui Lòng Nhập Email !',
                            },
                        ]}
                    >

                        <Input className="input" />
                    </Form.Item>
                    <Form.Item
                        label='Số Điện Thoại'
                        style={{ width: "60%" }}
                        name="phone"
                        className="form-item"
                        rules={[
                            {
                                required: true,
                                message: 'Vui Lòng Nhập Số Điện Thoại!',
                            },
                        ]}
                    >

                        <Input className="input" />
                    </Form.Item>
                    <Form.Item
                        label='Mật Khẩu'
                        style={{ width: "60%" }}
                        name="password"
                        className="form-item"
                        rules={[
                            {
                                required: true,
                                message: 'Vui Lòng Nhập Mật Khẩu !',
                            },
                        ]}
                    >

                        <Input.Password className="input" />
                    </Form.Item>



                    <Form.Item

                        style={{ marginTop: '10px' }}
                    >
                        <Button className="btn" style={{ height: '40px', width: '100px' }} type="primary" htmlType="submit" loading={loading}>
                            Đăng Ký
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
            <Footer style={{ color: 'black' }}></Footer>
        </Layout>
    )
}
export default SignUpPage