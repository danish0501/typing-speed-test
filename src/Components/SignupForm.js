import { TextField, Box, Button } from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "../Context/ThemeContext"; 
// import { auth } from 'firebase/auth';




const SignupForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { theme } = useTheme();

    const hamdleSubmit = () => {
        if(!email || !password || !confirmPassword){
            alert("Fill Details");
            return;
        }
        if(password !== confirmPassword){
            alert("Password Mismatch");
            return;
        }
        // auth.createUserWithEmailAndPassword(email, password).then((res)=>{
        //     alert("User Created");
        // }).catch((err) => {
        //     alert("User not created, Try Again");
        // })
    }


    return(
        <Box
          p = {3}
          style = {{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
            <TextField 
               variant="outlined"
               type="email"
               label="Enter Email"
               onChange={(e) => setEmail(e.target.value)}
               InputLabelProps={{
                style: {
                    color: theme.textColor
                }
               }}
               InputProps={{
                style: {
                    color: theme.textColor
                }
               }}
            />
            <TextField 
                variant="outlined"
                type="password"
                label="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                InputLabelProps={{
                    style: {
                        color: theme.textColor
                    }
                   }}
                   InputProps={{
                    style: {
                        color: theme.textColor
                    }
                   }}
            />
            <TextField 
                variant="outlined"
                type="password"
                label="Enter Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputLabelProps={{
                    style: {
                        color: theme.textColor
                    }
                   }}
                   InputProps={{
                    style: {
                        color: theme.textColor
                    }
                   }}
            />
            <Button
               variant="contained"
               size="large"
               style={{backgroundColor: theme.textColor, color: theme.background}}
               onClick={hamdleSubmit}
            >Signup</Button>
        </Box>
    )
}

export default SignupForm;