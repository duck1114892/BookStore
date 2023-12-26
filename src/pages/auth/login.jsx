import { Button, Checkbox, Form, Input, Layout, message, notification } from "antd"
import { Content, Footer, Header } from "antd/es/layout/layout";
import '../../styles/reset.css'
// import '/public/scss/login.css'
import { loginApi } from "../../service/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { store } from "../../redux/store";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const useNagi = useNavigate()
    const onFinish = async (values) => {
        const data = await loginApi(values.username, values.password)

        if (data.statusCode === 201) {
            message.success(`Xin Chào ${data.data.user.email}`)
            localStorage.setItem('access_token', data.data.access_token)
            useNagi('/')
            window.location.reload()
        }
        else {
            message.error(data.message)
        }
    };
    const onFinishFailed = (errorInfo) => {

    };
    const emailState = useSelector(state => state.rootReducer.email)
    const passwordState = useSelector(state => state.rootReducer.password)


    useEffect(() => {
        setEmailValue(emailState);
        setPasswordValue(passwordState);
    }, [emailState, passwordState]);

    const initialValues = {
        username: emailValue,
        password: passwordValue
    };
    return (
        <Layout style={{ minHeight: '100vh' }} >
            <Header style={{
                color: "Blacks",
                backgroundColor: 'white',
                textAlign: 'center',
                fontSize: "30px"
            }}>Đăng Nhập</Header>
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
                    defaultValue={{
                        username: emailValue,
                        password: passwordValue
                    }}

                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="on"
                >
                    <Form.Item
                        style={{ width: "60%" }}
                        name="username"
                        label='Email'
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

                        <Input.Password className="input" value={passwordValue} />
                    </Form.Item>

                    <Form.Item
                        style={{ marginTop: '10px' }}
                    >
                        <Button className="btn" style={{ height: '40px', width: '100px' }} type="primary" htmlType="submit">
                            Đăng Nhập
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
            <Footer style={{ color: 'black' }}>Bạn Chưa Có Tài Khoản ? <Link to='/sign-up' relative="path">Đăng Ký</Link></Footer>
        </Layout>
    )
}
export default LoginPage