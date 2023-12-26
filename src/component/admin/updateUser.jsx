import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { editUser } from '../../service/api';
const UpdateModal = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm()
    const showModal = () => {

        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onFinish = async (values) => {
        const id = props.props._id

        const fullName = values.fullName
        const phone = values.phone
        const res = await editUser(id, fullName, phone)
        if (res.statusCode === 200) {
            message.success('Update User Thành Công !')
            setIsModalOpen(false)
            props.myFnc()
        }

    };
    const onFinishFailed = (errorInfo) => {

    };
    useEffect(() => {
        form.setFieldsValue(props.props)
    })
    return (
        <>
            <Button type="primary" onClick={showModal}>
                <EditOutlined />
            </Button>
            <Modal title="Update User" open={isModalOpen} onOk={() => { form.submit() }} onCancel={handleCancel}>
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
                        label="Full Name"
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Full Name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!',
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
                                message: 'Please input your Phone',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default UpdateModal;