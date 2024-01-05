import { createContext, useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";

const CartContext = createContext(null);

export default CartContext;

const CartContextProvider = ({ children }) => {

    const [cart, setCart] = useState({});
    const [method, setMethod] = useState('PUT');
    const { userInfo } = useContext(UserContext)
    const getCart = async () => {
        if (userInfo.id) {
            const res = await fetch(`https://dummyjson.com/carts/user/${userInfo.id}`)
            let data = await res.json();
            if (data?.carts?.length == 0) {
                setMethod(() => 'POST')
            }
            else {
                setMethod(() => 'PUT')

            }
            setCart(data.carts)
        }
        else {
            setCart('')
        }
    }



    useEffect(() => {

        getCart();


    }, [userInfo.id])




    return (
        <CartContext.Provider value={{ cart, setCart, method }}>
            {children}
        </CartContext.Provider>
    )
}

export { CartContextProvider }