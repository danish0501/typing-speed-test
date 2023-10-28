import React, { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { AppBar, Modal, Tabs, Tab } from "@mui/material";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useTheme } from "../Context/ThemeContext"; 


const Header = () => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    const { theme } = useTheme();

    const handleModalOpen = () =>  {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleValueChange = (e, val) => {
      setValue(val);
    }

    return (
        <div className="header">
           <div className="logo">
               TypeCat
           </div>
           <div className="user-icon">
              <FaRegCircleUser onClick = {handleModalOpen}/>

              <Modal 
                open = {open}
                onClose = {handleClose}
                style = {{
                  display : "flex",
                  alignItems : "center",
                  justifyContent : "center"
                }}
              >
                <div style={{width: "400px"}}>
                  <AppBar position="static" style={{background : "transparent"}}>
                     <Tabs 
                        value={value}
                        onChange={handleValueChange}
                        variant="fullWidth">
                        <Tab label= "login" style={{color: theme.textColor}}></Tab>
                        <Tab label= "signup" style={{color: theme.textColor}}></Tab>
                     </Tabs>
                  </AppBar>
                  {value === 0 && <LoginForm />}
                  {value === 1 && <SignupForm />}
                </div>
              </Modal>
           </div>
        </div>
    )
}

export default Header;