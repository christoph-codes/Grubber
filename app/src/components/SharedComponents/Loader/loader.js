import React from "react";
import loaderIcon from "app/src/assets/food-icon.svg"
import "./loader.css";

export default function Loader() {
    return (
        <div>
            <img src={loaderIcon} className="loader" alt="loading" />
        </div>
    );
}