import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import UserContext from "../Context/UserContext"


const Protected = ({ children }) => {
    const navigate = useNavigate();
    const { userInfo } = useContext(UserContext)


    useEffect(() => {
        if (!userInfo.token)
            navigate('/login', { replace: true })

    }, [userInfo])

    return children
}
export default Protected