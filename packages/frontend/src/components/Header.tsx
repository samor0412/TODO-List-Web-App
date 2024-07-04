import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    title: string
    backToHome?: boolean
}
const Header: React.FC<Props> = ({ title, backToHome }) => {
    const navigate = useNavigate();
    return (
        <div className="navbar px-6 flex justify-between">
            <div className="text-xl font-bold">{title}</div>
            {backToHome && <button onClick={() => {navigate('/')}} className="btn btn-ghost btn-sm btn-outline">Back to Home</button>}
        </div>
    )
}

export default Header;