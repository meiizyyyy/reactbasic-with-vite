import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, notification, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import { deleteBookAPI, fetchAllBookAPI } from "../../services/api.service";
import BookDetail from "./view.book.detail";
import CreateBookControl from "./create.book.control";
import CreateBookUnControl from "./create.book.uncontrolled";
import UpdateBookControl from "./update.book.control";

const BookTable = () => {
    const [dataBook, setDataBook] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);

    const [dataDetail, setDataDetail] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [dataUpdate, setDataUpdate] = useState(null);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

    useEffect(() => {
        loadBook();
    }, [current, pageSize]);

    const loadBook = async () => {
        const res = await fetchAllBookAPI(current, pageSize);
        if (res.data) {
            setDataBook(res.data.result);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }
    };

    const handleDeleteBook = async (id) => {
        const resDel = await deleteBookAPI(id);
        if (resDel) {
            notification.success({
                message: "Delete Book",
                description: "Xóa sách thành công",
            });
            loadBook();
        } else {
            notification.error({
                message: "Delete Book",
                description: "Xóa sách thất bại",
            });
        }
    };

    const onChange = (pagination, filters, sorter, extra) => {
        // setCurrent, setPageSize
        //nếu thay đổi trang : current
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current);
            }
        }

        //nếu thay đổi tổng số phần tử : pageSize
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize);
            }
        }
    };

    const columns = [
        {
            title: "STT",
            render: (_, record, index) => {
                return <>{index + 1 + (current - 1) * pageSize}</>;
            },
        },

        {
            title: "Id",
            dataIndex: "_id",
            render: (_, record) => {
                return (
                    <a
                        href="#"
                        onClick={() => {
                            // alert("check")
                            //dữ liệu lấy từ record
                            setDataDetail(record);
                            setIsDetailOpen(true);
                        }}>
                        {record._id}
                    </a>
                );
            },
        },
        {
            title: "Tiêu đề",
            dataIndex: "mainText",
        },
        {
            title: "Giá tiền",
            dataIndex: "price",
            render: (text, record, index, action) => {
                if (text) return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(text);
            },
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
        },

        {
            title: "Tác giả",
            dataIndex: "author",
        },

        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined
                        onClick={() => {
                            setDataUpdate(record);
                            setIsModalUpdateOpen(true);
                        }}
                        style={{ cursor: "pointer", color: "orange" }}
                    />
                    <Popconfirm
                        title="Xóa book"
                        description="Bạn chắc chắn xóa book này ?"
                        onConfirm={() => handleDeleteBook(record._id)}
                        okText="Yes"
                        cancelText="No"
                        placement="left">
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <>
            <div
                style={{
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                }}>
                <h3>Table Book</h3>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>
                    Create Book
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={dataBook}
                rowKey={"_id"}
                pagination={{
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    total: total,
                    showTotal: (total, range) => {
                        return (
                            <div>
                                {" "}
                                {range[0]}-{range[1]} trên {total} rows
                            </div>
                        );
                    },
                }}
                onChange={onChange}
            />
            {/* <CreateBookControl isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} loadBook={loadBook} /> */}
            <CreateBookUnControl isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} loadBook={loadBook} />
            <UpdateBookControl
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                loadBook={loadBook}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
            <BookDetail isDetailOpen={isDetailOpen} setIsDetailOpen={setIsDetailOpen} dataDetail={dataDetail} setDataDetail={setDataDetail} />
        </>
    );
};

export default BookTable;
