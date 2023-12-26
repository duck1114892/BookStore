import React, { useState } from 'react';
import { Button, Form, Input, Modal, message } from 'antd';
import { createUser } from '../../service/api';
const CreateUser = (props) => {
    const [form] = Form.useForm()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onFinish = async (values) => {

        const { email, fullName, password, phone } = values

        const res = await createUser(fullName, password, email, phone)

        if (res.statusCode === 201) {
            message.success('Tạo Mới Thành Công')
            props.myFnc()
            setIsModalOpen(false);
        }
        else {
            message.error('Vui Lòng Kiểm Tra Lại')
        }
    };
    const onFinishFailed = (errorInfo) => {

    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Thêm Mới
            </Button>
            <Modal title="Thêm Mới" open={isModalOpen} onOk={() => { form.submit() }} onCancel={handleCancel}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="fullName"
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your fullName!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>   <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>


                </Form>
            </Modal>
        </>
    );
};
export default CreateUser;