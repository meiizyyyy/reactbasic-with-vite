import React, { useState } from "react";
import { Button, Drawer } from "antd";

const BookDetail = (props) => {
    const { isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail } = props;

    // console.log("Check data", dataDetail);

    return (
        <>
            <Drawer
                width={"30vw"}
                title="Book Details"
                onClose={() => {
                    setIsDetailOpen(false);
                    setDataDetail(null);
                }}
                open={isDetailOpen}>
                {dataDetail ? (
                    <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
                        <div>
                            <span>ID: {dataDetail._id}</span>
                        </div>
                        <div>
                            <span>Tiêu đề: {dataDetail.mainText} </span>
                        </div>
                        <div>
                            <span>Tác giả: {dataDetail.author} </span>
                        </div>
                        <div>
                            <span>Thể loại: {dataDetail.category} </span>
                        </div>
                        <div>
                            <span>Giá tiền: {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(dataDetail.price)} </span>
                        </div>
                        <div>
                            <span>Số lượng: {dataDetail.quantity} </span>
                        </div>
                        <div>
                            <span>Đã bán: {dataDetail.sold} </span>
                        </div>

                        <div>
                            <h3>Image:</h3>
                            <div
                                style={{
                                    marginTop: "10px",
                                    height: "250px",
                                    width: "250px",
                                    border: "solid 1px #ccc",
                                    objectFit: "contain",
                                }}>
                                <img height={"100%"} width={"100%"} src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetail.thumbnail}`} alt="" />
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <h2>Không có dữ liệu</h2>
                    </>
                )}
            </Drawer>
        </>
    );
};

export default BookDetail;
