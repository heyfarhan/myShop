import { Link } from "react-router-dom"
import { useContext } from "react"
import UserContext from "../Context/UserContext"
import CartContext from "../Context/CartContext"
import SearchBar from "./SearchBar"

const Header = () => {
    const { userInfo, setUserInfo } = useContext(UserContext)
    const { cart, setCart } = useContext(CartContext)
    const logout = () => {
        setUserInfo({ username: null, image: null, firstName: null, token: null });
        setCart({})
        localStorage.clear()

    }

    return (
        <div className="h-16 w-full bg-black flex text-white py-2 px-5 items-center text-lg">
            <Link to='/'>
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-white rounded-full flex justify-center text-3xl pt-1">
                        🎁
                    </div>
                    <span className="text-yellow-300 font-bold text-2xl mr-2 pb-1">MyShop</span>
                </div>
            </Link>
            <div className="flex gap-4 mr-auto">
                <span>Links</span>
                <span>Links</span>
                <span>Links</span>
                <span>Links</span>
            </div>
            {

                (userInfo.token) ? (
                    <div className="mx-4 flex gap-4 justify-center items-center">
                        <SearchBar />

                        <img className='h-8 w-8 rounded-2xl bg-white' src={userInfo.image} />
                        <span className="text-lg font-medium mr-2">{userInfo.firstName}</span>
                        <Link to='/cart' className="flex items-center gap-1">
                            <svg className="fill-white " xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512">
                                <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" /></svg>
                            <span className="text-lg font-medium ">{
                                (cart) ? ((cart.length) ? (`${cart[0]?.totalQuantity}`) : ('0')) : ('')

                            }</span>
                            <span className="text-lg font-medium ml-3 ">{
                                (cart) ? ((cart.length) ? (`₹ ${cart[0]?.discountedTotal}`) : ('₹ 0')) : ('')

                            }</span>
                        </Link>
                        <div className="h-10 w-[1px] bg-gray-500 rounded-lg"></div>
                        <button className="bg-pink-600 px-4 py-1 rounded-lg " key='logout' onClick={logout}>Logout</button>
                    </div>

                ) : (<Link to='/login'>
                    <button className="bg-pink-600 px-4 py-1 rounded-lg mx-4" key='login'>Login</button>
                </Link>)
            }
        </div >
    )
}
export default Header