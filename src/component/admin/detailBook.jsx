import React, { useEffect, useState } from 'react';
import { Badge, Button, Descriptions, Drawer, Modal, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
const BookDetail = (props) => {

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    useEffect(() => {
        const thumbnail = {
            uid: uuidv4(),
            name: props.props.mainText,
            status: 'done',
            url: `${import.meta.env.VITE_BE_URL}/images/book/${props.props.thumbnail}`,

        }
        const sliderimg = props.props.slider
        const silder = sliderimg.map((item) => {
            return {
                uid: uuidv4(),
                name: props.props.mainText,
                status: 'done',
                url: `${import.meta.env.VITE_BE_URL}/images/book/${item}`,
            }
        })
        setFileList([thumbnail, ...silder])
    }, [props])
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    return (
        <>
            <a type="primary" onClick={showDrawer}>
                {props.props._id}
            </a>
            <Drawer title="Chi tiết" placement="right" onClose={onClose} open={open}>
                <div> Tên: {props.props.mainText} </div>
                <div> Thể Loại : {props.props.category} </div>
                <div>Giá : {props.props.price} VND </div>
                <>
                    <Upload

                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                    >

                    </Upload>
                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                        <img
                            alt="example"
                            style={{
                                width: '100%',
                            }}
                            src={previewImage}
                        />
                    </Modal>
                </>
            </Drawer>
        </>
    );
};
export default BookDetail;