import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import GroupsIcon from '@mui/icons-material/Groups';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Notification from '../dialogBoxs/Notification';
import style from './style.module.scss';
function Header() {
 const [isNotification,setIsNotifcation]=useState(false);

  const BtnClicked =()=>{
    alert("btn clicked");
  }
  const openNotfication =()=>{
    setIsNotifcation((prev)=>(!prev))
  }
  return (
    <>
    <div className={style.Header_container}>
        <div className={style.Header_container_logo} >
            <p>LOGO</p>
        </div>
        <div className={style.Header_container_menu}>
            <ul>
                <li onClick={BtnClicked}><SearchIcon/></li>
                <li onClick={BtnClicked}><PersonAddAltIcon/></li>
                <li onClick={BtnClicked}><GroupsIcon/></li>
                <li onClick={openNotfication}><NotificationsNoneOutlinedIcon/></li>
            </ul>
            <button className={style.Mobile_Menu}>show</button>
        </div>
    </div>
    {isNotification && <Notification/>}
    </>
  )
}

export default Header