/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Menu } from "antd";
import {HomeOutlined,GroupOutlined,DashboardOutlined, ReadOutlined} from '@ant-design/icons'
import "./MenuList.css"


const MenuList = () => {
    return(
        <Menu theme="light" mode="inline" className="menu">
            <Menu.Item key="home-manager" icon = {<DashboardOutlined />} className="menu-item">
                Trang chủ
            </Menu.Item>
            <Menu.Item key="area-list-manager" icon = {<GroupOutlined /> } className="menu-item">Khu ký túc xá</Menu.Item>
            <Menu.Item key="room-manager" icon = {<HomeOutlined />} className="menu-item">
                Phòng
            </Menu.Item>
            <Menu.Item key="report-manager" icon = {<ReadOutlined />} className="menu-item">
                Báo cáo
            </Menu.Item>
            
        </Menu>
    )    
}

export default MenuList
