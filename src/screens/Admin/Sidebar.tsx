import React, { useEffect, useRef, useState, ReactNode } from "react";
import  "../../styles/Admin_Sidebar.css";


interface SidebarProps {
    width?: number;
    children: ReactNode;
    onToggle?: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ width = 280, children, onToggle }) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [xPosition, setX] = useState<number>(-width);
    const side = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        if (xPosition < 0) {
            setX(0);
            setOpen(true);
            onToggle?.(true);
        } else {
            setX(-width);
            setOpen(false);
            onToggle?.(false);
        }
    };

    const handleClose = async (e: MouseEvent) => {
        let sideArea = side.current;
        let sideChildren = sideArea?.contains(e.target as Node);
        if (isOpen && (!sideArea || !sideChildren)) {
            setX(width);
            setOpen(false);
        }
    };

    useEffect(()=> {
        //window.addEventListener("click", handleClose);
        return () => {
          window.removeEventListener("click", handleClose);
        };
      }, [isOpen]);

    return (
        <div className="container">
      <div ref={side}  className="sidebar" style={{ width: `${width}px`, height: '100%',  transform: `translatex(${xPosition}px)`}}>
          <button onClick={() => toggleMenu()}
          className="button" >
            {isOpen ? 
            <span>X</span> : <img src="images/avatar.png" alt="contact open button" className="openBtn"/>
            }
          </button>
        <div className="content">{children}</div> 
      </div>
    </div>
    );
};

export default Sidebar;