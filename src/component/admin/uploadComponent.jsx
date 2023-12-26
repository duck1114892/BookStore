import React, { useState } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Modal, Upload } from 'antd';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const UploadComponent = () => {

    return (
        <>
            <Upload
                action="/your-upload-endpoint" // Đặt URL của máy chủ để xử lý việc tải lên file
                method="post"
                name="image"
                listType="picture-card" // Để hiển thị hình ảnh xem trước
            >
                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
        </>
    );
};
export default UploadComponent;