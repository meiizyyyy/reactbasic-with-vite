import React, { useEffect, useState } from "react";
import { Button, Drawer } from "antd";
import Input from "antd/es/input/Input";
const ViewUserDetail = (props) => {
    const { dataDetail, setDataDetail, isUserDetailOpen, setIsUserDetailOpen } = props;

    return (
        <>
            <Drawer
                title="User Detail"
                open={isUserDetailOpen}
                onClose={() => {
                    setIsUserDetailOpen(false);
                    setDataDetail(null);
                }}>
                {dataDetail ? (
                    <>
                        <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
                            <div>
                                <span>ID: {dataDetail._id}</span>
                            </div>
                            <div>
                                <span>Full name: {dataDetail.fullName} </span>
                            </div>
                            <div>
                                <span>Email: {dataDetail.email} </span>
                            </div>
                            <div>
                                <span>Phone number: {dataDetail.phone} </span>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <p>Không có dữ liệu</p>
                    </>
                )}
            </Drawer>
        </>
    );
};

export default ViewUserDetail;
