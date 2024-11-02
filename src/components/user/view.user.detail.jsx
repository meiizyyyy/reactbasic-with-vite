import React from "react";
import { Drawer, Button } from "antd";
const ViewUserDetail = (props) => {
    const { dataDetail, setDataDetail, isUserDetailOpen, setIsUserDetailOpen } = props;

    return (
        <>
            <Drawer
                width={"30vw"}
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
                                <p>Avatar: </p>
                                <img height={"250px"} width={"250px"} src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} alt="" />
                                <div>
                                    <label
                                        htmlFor="btn-upload"
                                        style={{
                                            display: "block",
                                            width: "fit-content",
                                            marginTop: "15px",
                                            padding: "10px",
                                            background: "orange",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                        }}>
                                        Upload Avatar
                                    </label>
                                    <input type="file" name="" id="btn-upload" hidden />
                                </div>
                            </div>
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
