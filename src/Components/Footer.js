import React, { useState } from "react";
import Select from "react-select";
import themeOptions from "../Utility/themeOptions";
import { useTheme } from "../Context/ThemeContext";
import { FaArrowRotateRight } from "react-icons/fa6";

const Footer = () => {

    const [value, setValue] = useState({});
    const { setTheme } = useTheme();

    const handleChange = (e) => {
        // console.log(e);
        setValue(e.value);
        setTheme(e.value);
    }

    return (
        <div className="footer">
            <div className="links">
                Links
            </div>
            <div className="refresh-icon">
                <FaArrowRotateRight />
                <div className="reset">
                    <button>esc</button>
                    <span> - </span>
                    <span>reset</span>
                </div>
                <div className="words-span">
                    <button>10</button>
                    <button>50</button>
                    <button>80</button>
                    <button>100</button>
                    <span> - </span>
                    <span>no. of words</span>
                </div>
            </div>
            <div className="themeButton">
                <Select
                    value={value}
                    onChange={handleChange}
                    options={themeOptions}
                    menuPlacement="top"
                />
            </div>
        </div>
    )
}

export default Footer;