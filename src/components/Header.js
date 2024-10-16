import React from 'react'
import './header.css'
import { IoIosSearch } from "react-icons/io";

const Header = () => {
    return (
        <div className="header">
            <img src="/images/logo.png" alt="logo" />
            <div className="menu">
                <h2>HOME</h2>
                <h2>ANIME LIST</h2>
                <h2>NEW SEASON</h2>
                <h2>MOVIES</h2>
                <h2>POPULAR</h2>
            </div>
            <div className="search-container">
                <IoIosSearch />
            </div>
        </div>
    )
}

export default Header