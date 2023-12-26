import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, InputNumber, Modal, Row, Select, Upload, message } from 'antd';
import { EditOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { callUploadBookImg, editUser, getCateGory, updateBook } from '../../service/api';
const UpdateBookModal = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [category, setCategory] = useState([])
    const [form] = Form.useForm()
    const [isSubmit, setIsSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingSlider, setLoadingSlider] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [dataThumbnail, setDataThumbnail] = useState([])
    const [dataSlider, setDataSlider] = useState([])
    const [slider, setSlider] = useState([])
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const showModal = () => {

        setIsModalOpen(true);
    };
    form.setFieldsValue(props.props)
    const handleCancel = () => {
        setDataSlider([])
        setDataThumbnail([])
        setIsModalOpen(false);
    };
    const onFinish = async (values) => {
        const id = props.props._id
        const { author, category, mainText, price, quantity, sold } = values

        const res = await updateBook(id, author, category, mainText, price, quantity, sold, dataThumbnail[0].name, slider)

        if (res.statusCode === 200) {

            setDataSlider([])
            setDataThumbnail([])
            message.success('Update Sách Thành Công !')
            setIsModalOpen(false)
            props.myFnc()
        }

    };
    const onFinishFailed = (errorInfo) => {

    };
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const beforeUpload = (file) => {

        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size < 5000000;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const handleChange = (info, type) => {
        if (info.file.status === 'uploading') {
            type ? setLoadingSlider(true) : setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, (url) => {
                type ? setLoadingSlider(false) : setLoading(false);
                setImageUrl(url);
            });
        }
    };


    const handleUploadFileThumbnail = async ({ file, onSuccess, onError }) => {
        const res = await callUploadBookImg(file)

        if (res.statusCode === 201) {
            setDataThumbnail([{
                name: res.data.fileUploaded,
                uid: file.uid
            }])
            onSuccess('ok')
        } else {
            onError('Đã có lỗi khi upload file');
        }
    };

    const handleUploadFileSlider = async ({ file, onSuccess, onError }) => {
        const res = await callUploadBookImg(file);

        if (res.statusCode === 201) {
            setDataSlider((dataSlider) => [...dataSlider, {
                name: res.data.fileUploaded,
                uid: file.uid
            }])
            onSuccess('ok')
        } else {
            onError('Đã có lỗi khi upload file');

        }
    };

    const handleRemoveFile = (file, type) => {
        if (type === 'thumbnail') {
            setDataThumbnail([])
        }
        if (type === 'slider') {
            const newSlider = dataSlider.filter(x => x.uid !== file.uid);
            setDataSlider(newSlider);
        }
    }

    const handlePreview = async (file) => {
        getBase64(file.originFileObj, (url) => {
            setPreviewImage(url);
            setPreviewOpen(true);
            setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
        });
    };
    useEffect(() => {

        const getCategory = async () => {
            const res = await getCateGory()
            const categoryApi = res.data
            let d = categoryApi.map((item) => {
                return { value: item, label: item }
            })
            setCategory(d)
        }
        getCategory()
        setSlider(dataSlider.map((item) => {
            return item.name
        }))
    }, [dataSlider])

    return (
        <>
            <Button type="primary" onClick={showModal}>
                <EditOutlined />
            </Button>
            <Modal title="Update Book" open={isModalOpen} onOk={() => { form.submit() }} onCancel={handleCancel}>
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
                        label="Tên"
                        name="mainText"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your main text!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Tác Giả"
                        name="author"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your author!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Thể Loại"
                        name="category"
                        rules={[
                            {
                                required: true,
                                message: 'Vui Lòng Nhập Thể Loại!',
                            },
                        ]}
                    >
                        <Select options={category} defaultValue={'Arts'} ></Select>
                    </Form.Item>

                    <Form.Item
                        label="Số Lượng"
                        name="quantity"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Quantity',
                            },
                        ]}
                    >
                        <InputNumber />

                    </Form.Item>
                    <Form.Item
                        label="Đã Bán"
                        name="sold"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Quantity',
                            },
                        ]}
                    >
                        <InputNumber />

                    </Form.Item>
                    <Form.Item
                        label="Giá"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Quantity',
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                    </Form.Item>

                    <div style={{ display: "flex" }}>
                        <Col >
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Ảnh Thumbnail"
                                name="thumbnail"
                            >
                                <Upload
                                    name="thumbnail"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    maxCount={1}
                                    multiple={false}
                                    customRequest={handleUploadFileThumbnail}
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                    onRemove={(file) => handleRemoveFile(file, "thumbnail")}
                                    onPreview={handlePreview}
                                >
                                    <div>
                                        {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item></Col>
                        <Col style={{ width: "100%" }}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Ảnh Slider"
                                name="slider"
                            >
                                <Upload
                                    multiple
                                    name="slider"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    customRequest={handleUploadFileSlider}
                                    beforeUpload={beforeUpload}
                                    onChange={(info) => handleChange(info, 'slider')}
                                    onRemove={(file) => handleRemoveFile(file, "slider")}
                                    onPreview={handlePreview}
                                >
                                    <div>
                                        {loadingSlider ? <LoadingOutlined /> : <PlusOutlined />}
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </Col>

                    </div>
                </Form>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </Modal>
        </>
    );
};
export default UpdateBookModal;