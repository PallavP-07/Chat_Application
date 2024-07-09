import React from 'react'
import Header from '../Components/header/Header'
import style from '../Styles/HomePage.module.scss'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
function Home() {
const chats =[
  {
    name:"Pallav",
    status:"09:30 PM",
  
  },
  {
    name:"Kumar",
    status:"08:30 Am",
    
  },
  {
    name:"Kumar",
    status:"08:30 Am",
    
  },
  {
    name:"Kumar",
    status:"08:30 Am",
    
  },
  {
    name:"Kumar",
    status:"08:30 Am",
    
  },
  {
    name:"Kumar",
    status:"08:30 Am",
    
  },
  {
    name:"Kumar",
    status:"08:30 Am",
    
  },
  {
    name:"Kumar",
    status:"08:30 Am",
    
  }, {
    name:"Kumar",
    status:"08:30 Am",
    
  }, {
    name:"Kumar",
    status:"08:30 Am",
    
  }, {
    name:"Kumar",
    status:"08:30 Am",
    
  }, {
    name:"Kumar",
    status:"08:30 Am",
    
  }, {
    name:"Kumar",
    status:"08:30 Am",
    
  }, {
    name:"Kumar",
    status:"08:30 Am",
    
  }, {
    name:"Kumar",
    status:"08:30 Am",
    
  }, {
    name:"Kumar",
    status:"08:30 Am",
    
  }, {
    name:"Kumar",
    status:"08:30 Am",
    
  },

]

  return (
    <>
    <Header/>
    <div className={style.Main_container}>
      <div className={style.Chat_Section}>
        <div className={style.chat_list_container} >
          {chats.map((item,index)=>{
            return <div key={index} className={style.chat_list}>
              <p>{item.name}</p>
              <p>{item.status}</p>
              </div>
          })}

        </div>
      </div>
      <div className={style.Message_Section}>
        <h1>Message</h1>
      </div>
      <div className={style.Profile_Section}>
        <div>
          <AccountCircleRoundedIcon/>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore deleniti rerum sed minim</p>
          <h3>username:sgg@fh2</h3>
          <h3>name:pallav</h3>
          <h4>a year ago joined</h4>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home