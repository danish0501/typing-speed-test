import { TextField, Box, Button } from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "../Context/ThemeContext"; 

const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { theme } = useTheme();

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
            <Button
               variant="contained"
               size="large"
               style={{backgroundColor: theme.textColor, color: theme.background}}
            >Login</Button>
        </Box>
    )
}

export default LoginForm;