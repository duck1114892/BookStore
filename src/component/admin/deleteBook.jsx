import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm, message } from 'antd';
import { deleteBook, deleteUser } from '../../service/api';
const DeleteBook = (props) => {
    const confirm = async () => {
        const res = await deleteBook(props.props._id)

        if (res.statusCode === 200) {
            message.success('Xóa Thành Công');
            props.myFnc()
        }

    };
    const cancel = (e) => {

        message.error('Click on No');
    };
    return (<>  <Popconfirm
        title="Bạn Có Muốn Xóa Sách Này !"
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
export default DeleteBook