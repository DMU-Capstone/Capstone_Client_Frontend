import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { selectClasses } from "@mui/material";
import MemberListScreen from "./MemberList";
import QueueList from "./QueueList";
//import AdManager from "./AdManager";

const AdminMain = () => {
    const [selectedMenu, setSelectedMenu] = useState("회원관리");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarWidth = 280;
    const navigate = useNavigate();
  
    const handleMenuSelect = (menu: string) => {
        if (sidebarOpen) {
          if (menu === selectedMenu) {
            setSidebarOpen(false);
          } else {
            setSelectedMenu(menu);
          }
        } else {
          setSelectedMenu(menu);
          setSidebarOpen(true);
        }
      };
      const renderContent = () => {
          switch (selectedMenu) {
          case "회원관리":
            return <MemberListScreen />;
          case "대기열관리":
            return <QueueList />;
          default:
            return null;
        }
      };
  
    return (
        <div>
        <Sidebar
            selectedMenu={selectedMenu}
            onSelectMenu={handleMenuSelect} // 메뉴 선택 시 상태 변경
            width={sidebarWidth}
            isOpen={sidebarOpen}

        />
        <div
          className="contentArea"
          style={{
            marginLeft: `${sidebarOpen ? sidebarWidth + 50 : 50}px`,
            transition: "margin 0.4s ease",
            padding: "20px"
          }}
        >
            {renderContent()}
        </div>
        </div>
    );
};
  
export default AdminMain;