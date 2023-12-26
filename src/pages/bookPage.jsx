import React, { useEffect, useState } from "react";
import { Button, Card, Col, Image, Pagination, Row, Spin, Tabs } from "antd";
import Meta from "antd/es/card/Meta";
import { Content } from "antd/es/layout/layout";
import { Link, useLocation } from "react-router-dom";
import { getBookApi } from "../service/api";
import { useSelector } from "react-redux";
import '../../public/scss/book.css'

const BookPage = () => {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState()
    const [pageSize, setPageSize] = useState(10)
    const [book, setBook] = useState([]);
    const [price, setPrice] = useState()
    const [tab, setTab] = useState('-sold')
    const [isTabFilter, setIsTabFilter] = useState(false)
    let cate = useSelector((state) => state.rootReducer.category);
    let rangeValue = useSelector((state) => state.rootReducer.range)
    let category = cate.join(',')
    const onChange = (key) => {
        if (key) {
            setIsTabFilter(!isTabFilter)
            setTab(key)
        }
    };
    const items = [
        {
            key: '-sold',
            label: 'Bán Chạy',
            children: <></>,
        },
        {
            key: '-updatedAt',
            label: 'Mới Nhất',
            children: <></>,
        },
        {
            key: '-price',
            label: 'Giá Từ Cao Đến Thấp',
            children: <></>,
        },
        {
            key: 'price',
            label: 'Giá Từ Thấp Đến Cao',
            children: <></>,
        }
    ];

    useEffect(() => {
        let getBook = async () => {
            setLoading(true)
            try {
                let dataApi = await getBookApi(page, pageSize, tab, rangeValue, category)
                let data = dataApi.data.result
                setBook(data);
                setTotal(dataApi.data.meta.total)
                let priceFormat = data.map((item) => {
                    let formatNumber = item.price
                    return formatNumber.toLocaleString('vi-VN')
                })
                setPrice(priceFormat)



            } catch (error) {

            }
            finally {
                setLoading(false)
            }

        }
        getBook()
    }, [page, cate, tab, rangeValue]);

    return (
        <Content
            className="site-layout"
            style={{
                marginTop: "5%",
                width: "100%",
                height: "100%",
            }}
        ><Tabs className="tabMobile" style={{ marginLeft: '1%' }} defaultActiveKey="-sold" items={items} onChange={onChange} />
            {loading ? (<Spin><></></Spin>) :
                <> <div >
                    <Row gutter={{
                        xs: 8,
                        sm: 16,
                        md: 24,
                        lg: 32,
                    }}>
                        {book.map((item, index) => (
                            <Col span={{
                                xs: 8,
                                sm: 16,
                                md: 24,
                                lg: 32,
                            }} >

                                <Link to={`/book-detail/${item._id}`}>
                                    <Card
                                        className="cardMobile"
                                        hoverable
                                        style={{
                                            width: "calc(290px)",
                                            margin: "2%",


                                        }}
                                        cover={

                                            <Image className="img" preview={false} style={{ height: '350px' }} src={`${import.meta.env.VITE_BE_URL}/images/book/${item.thumbnail}`} alt={item.mainText} />
                                        }
                                    >
                                        <Meta title={item.mainText} />
                                        <div
                                            style={{
                                                width: "100%",
                                                textOverflow: "ellipsis",
                                                overflow: "hidden",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {item.author}
                                        </div>
                                        <div style={{ fontWeight: 600 }}>{price[index]} VND</div>
                                    </Card>
                                </Link>

                            </Col>
                        ))}
                    </Row>
                </div>
                    <Pagination
                        style={{ width: "100%" }}
                        current={page}
                        onChange={(page) => {
                            setPage(page);
                        }}
                        total={total}
                        pageSize={pageSize}
                    />
                </>
            }

        </Content>
    );
};

export default BookPage;
