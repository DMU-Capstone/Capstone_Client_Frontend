import React, { useEffect, useRef, useState, ReactNode, use } from "react";
import  "../../styles/Admin_Sidebar.css";

interface SidebarProps {
    width?: number;
    selectedMenu?: string;
    isOpen?: boolean;
    onSelectMenu?: (menu: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ width = 280, onSelectMenu, selectedMenu, isOpen = false }) => {
    const xPosition = isOpen ? 0 : -width;

    return (
      <div className="container">
      <div className="sidebar" style={{ width: `${width}px`, height: '100%',  transform: `translatex(${xPosition}px)`}}>
          {/*<button onClick={() => toggleMenu()} className="button" >
            {isOpen ? 
            <span>X</span> : <img src="images/avatar.png" alt="contact open button" className="openBtn"/>
            }
          </button>*/}
        <div className="content">
          <ul className="menu-list">
            {["회원관리", "대기열관리", "광고관리"].map((menu) => (
              <li
                key={menu}
                className={ `menu-item ${ selectedMenu === menu ? "active" : "" }` }
                onClick={() => onSelectMenu?.(menu)}
              >
                {menu}
              </li>
            ))}
          </ul>
        </div> 
      </div>
    </div>
    );
};

export default Sidebar;