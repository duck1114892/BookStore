import { Steps, Form, InputNumber, Row, Col, Button, Input, message, Empty, Image } from 'antd';
import '../../public/scss/payment.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isAddCart, isDeleteCart, isUpdateCart } from '../redux/cart/action';
import { useForm } from 'antd/es/form/Form';
import { callOrder, getBookDetail, getBookManeger } from '../service/api';
import { ArrowLeftOutlined, CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import AvataComponent from '../component/avataComponent';

const PayPage = () => {
    const cartData = useSelector((state) => state.addCartReducer);
    const [total, setTotal] = useState()
    const [quantity, setQuantity] = useState()
    const dispatch = useDispatch();
    const [form] = Form.useForm()
    const [book, setBook] = useState()
    const [remain, setRemain] = useState()
    const onChange = async (value, itemId, remain) => {
        const dataApi = await getBookDetail(itemId);
        const cart = {
            quantity: value,
            _id: itemId,
            remain: remain,
            price: dataApi.data.price,
        };
        dispatch(isUpdateCart(cart));
        const totalValue = cartData.cart.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.quantity * currentItem.price;
        }, 0);
        setTotal(totalValue)
    };

    const item = [
        {
            title: 'Đơn Hàng',
        },
        {
            title: 'Đặt Hàng',
        },
        {
            title: 'Thành Công',
        },
    ];

    const deleteCart = (id) => {
        dispatch(isDeleteCart(id))
        message.success('Đã Xóa Đơn Hàng')
    }
    useEffect(() => {
        const totalValue = cartData.cart.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.quantity * currentItem.price;
        }, 0);
        setTotal(totalValue)
        const fetchBookData = async () => {
            try {
                const response = await getBookManeger();
                setBook(response.data || []);
            } catch (error) {
                console.error('Error fetching book data:', error);
                setBook([]); // Set book to an empty array or handle the error appropriately
            }
        };

        fetchBookData();
    }, [cartData.cart])
    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };
    const items = item.map((item) => ({
        key: item.title,
        title: item.title
    }));
    const handelOrder = async (value) => {
        const order = {
            name: value.user,
            address: value.address,
            phone: value.phone,
            totalPrice: total,
            detail: cartData.cart.map((item) => {
                return {
                    bookName: item.detail.name,
                    quantity: item.quantity,
                    _id: item._id
                }
            })
        }
        const res = await callOrder(order)
        if (res.statusCode === 201) {
            next()
            dispatch(deleteCart(cartData.cart.map((item) => {
                return item._id
            })))
        } else {
            message.error(res.message)
        }


    }

    const handleQuantity = (id) => {
        try {
            const res = book.find((item) => {
                return item._id === id;
            });
            const quantity = res ? res.quantity : 0;
            return quantity;
        } catch {

        }

    }



    return (
        <>

            <div className="containers">
                <div className="headers" style={{ display: "flex", justifyContent: "space-around", marginTop: "2%", height: "4vh", backgroundColor: "white" }}>

                    <Link to="/"><Button shape='circle' style={{
                        position: "absolute",
                        left: '100px'
                    }}><ArrowLeftOutlined /></Button></Link>

                    <Steps className='step' size='small' current={current} style={{ width: "50%" }} items={items}></Steps>
                    <AvataComponent></AvataComponent>
                </div>
                {current === item.length - 1 ? (
                    <div style={{ width: "100%", height: "60vh", display: "flex", justifyContent: "center" }}>
                        <div style={{ flexDirection: "column", height: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <CheckCircleOutlined style={{ fontSize: "80px", marginBottom: "10px" }} />
                            <div style={{ marginBottom: "10px" }}>Success</div>
                            <Link to='/history'> <Button>Xem Lịch Sử</Button></Link>
                        </div></div>
                ) : (<>
                    {
                        cartData.cart.length === 0 ? <Empty></Empty> : (<><div className="body"><div className="list">
                            {cartData.cart.map((item, index) => {
                                const itemForm = `form-${index}`;
                                return (
                                    <Row style={{
                                        display: 'flex',

                                    }} key={index}>
                                        {item.length === 0 ? (
                                            <></>
                                        ) : (
                                            <>
                                                <Col span={12}>
                                                    <div
                                                        className="value"
                                                    >

                                                        <div
                                                            className='mainTexts'

                                                        >
                                                            {item.detail.name}
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col span={4} style={{ height: '100%' }}>
                                                    <Form
                                                        name={itemForm}
                                                        onFinish={(value) => onFinish(value, item._id, item.remain)}
                                                    >
                                                        <Form.Item

                                                            name="quantity"

                                                            initialValue={item.quantity}

                                                        >
                                                            <InputNumber
                                                                name="quantity"
                                                                className='quantity'
                                                                min={0}
                                                                max={handleQuantity(item._id)}
                                                                onChange={(value) => onChange(value, item._id)}
                                                            />
                                                        </Form.Item>
                                                        <Form.Item
                                                            name="id"
                                                            style={{ marginTop: '15%', display: 'none' }}
                                                            initialValue={item._id}

                                                        >
                                                            <Input name="id" />
                                                        </Form.Item>

                                                    </Form>
                                                </Col>
                                                <Col className='price' span={6} style={{ height: '100%' }}>
                                                    <div style={{ fontSize: '20px', color: "red" }}>{(item.quantity * item.price)?.toLocaleString('vn-VN', { style: 'currency', currency: 'VND' })}</div>
                                                </Col>
                                                <Col span={1} style={{ height: '100%' }}>
                                                    <Button type='primary' shape='circle' danger onClick={() => deleteCart(item._id)}><DeleteOutlined /></Button>
                                                </Col>
                                            </>
                                        )
                                        }
                                    </Row>
                                );
                            })}
                        </div>
                            <div className="detail">
                                <div
                                    className='detailMobile'
                                    style={{
                                        height: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                        justifyContent: 'space-around',
                                    }}
                                >
                                    {current < item.length - 2 && (
                                        <> <div style={{ fontSize: '30px' }}>Tổng:</div>
                                            <div style={{ fontSize: '30px', color: 'red' }}>{total?.toLocaleString('vn-VN', { style: 'currency', currency: 'VND' })}</div>
                                            <Button style={{ width: "50%", height: "5vh" }} danger disabled={cartData.cart.length === 0 || total === 0 ? true : false} onClick={() => { next() }}>Đặt Hàng</Button></>
                                    )}
                                    {current === item.length - 2 && (<>

                                        <> <Form
                                            name="basic"
                                            layout="vertical"
                                            style={{ width: "80%", height: "50%" }}
                                            onFinish={handelOrder}

                                        >
                                            <div style={{ fontSize: '25px' }}>TỔNG: <span style={{ color: 'red' }}>{total?.toLocaleString('vn-VN', { style: 'currency', currency: 'VND' })}</span></div>
                                            <Form.Item
                                                name="user"
                                                label="Tên"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your name!',
                                                    },
                                                ]}
                                            >
                                                <Input></Input>
                                            </Form.Item>
                                            <Form.Item
                                                name="address"
                                                label="Địa Chỉ"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your address!',
                                                    },
                                                ]}>
                                                <TextArea style={{ maxHeight: "50px" }} />
                                            </Form.Item>
                                            <Form.Item
                                                name="phone"
                                                label="SĐT"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your phone!',
                                                    },
                                                ]}
                                            >
                                                <InputNumber style={{ width: "100%" }}></InputNumber>
                                            </Form.Item>
                                            <Form.Item>
                                                <Button disabled={cartData.cart.length === 0 || total === 0 ? true : false} danger type='primary' style={{ width: "100%", height: "50px" }} htmlType="submit">Thanh Toán</Button>
                                            </Form.Item>
                                        </Form>
                                        </>
                                    </>
                                    )}


                                </div>
                            </div> </div></>)
                    }


                </>)}

            </div >
        </>
    );
};

export default PayPage;
