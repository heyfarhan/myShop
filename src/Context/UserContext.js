import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
    const user = useContext(UserContext);


    const [userInfo, setUserInfo] = useState(
        {
            id: localStorage.getItem('id'),
            username: localStorage.getItem('username'),
            image: localStorage.getItem('image'),
            firstName: localStorage.getItem('firstName'),
            token: localStorage.getItem('token')
        });

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo }} >
            {children}
        </UserContext.Provider>
    )
}
export default UserContext