import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm, message } from 'antd';
import { deleteUser } from '../../service/api';
const DeleteUser = (props) => {
    const confirm = async () => {
        const res = await deleteUser(props.props._id)

        if (res.statusCode === 200) {
            message.success('Xóa Người Dùng Thành Công');
            props.myFnc()
        }

    };
    const cancel = (e) => {

        message.error('Click on No');
    };
    return (<>  <Popconfirm
        title="Bạn Có Muốn Xóa Người Dùng Này"
        description="Are you sure to delete this?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
    >
        <Button danger><DeleteOutlined></DeleteOutlined></Button>
    </Popconfirm>
    </>)
}
export default DeleteUser