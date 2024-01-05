import { useContext, useState } from "react"
import CartContext from "../Context/CartContext"
import { Link } from "react-router-dom";
import UserContext from "../Context/UserContext";

//Error To handle of try Catch
// Max Quantity Case Needs to be Handle


const Cart = () => {

    const { cart, setCart, method } = useContext(CartContext)
    const { userInfo, setUserInfo } = useContext(UserContext)

    const [qty, setQty] = useState(0)
    const [loading, setLoading] = useState(false)
    let controller;

    const updateQty = async (id, quantity) => {
        setLoading(true)
        if (controller) {
            controller.abort();
        }

        controller = new AbortController();
        const signal = controller.signal;

        let payload, url;

        if (method == 'PUT') {
            url = `${process.env.CART_URL}${cart[0].id}`
        }
        else {
            url = `${process.env.CART_URL}add`
            payload = {
                userId: userInfo.id
            }

        }

        if (quantity > 0) {


            payload = {
                ...payload,
                products: [...cart[0].products,
                {
                    id: id,
                    quantity: quantity,
                },
                ]
            }
        }
        else {
            payload = { ...payload, products: cart[0].products.filter((product) => (product['id'] != id)) }
        }
        try {

            const res = await fetch(url, {
                signal,
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            const data = await res.json();
            setCart([data])

        }
        catch (err) {
            //Handle Errors
        }
        setLoading(false)
    }

    return (
        <div className="w-full min-h-[90vh] flex flex-col gap-4 items-center p-5 text-xl bg-slate-900 ">
            <h1 className="text-4xl text-yellow-300 font-medium mb-4 ">Cart</h1>
            <div className="my-2 text-gray-300 text-xl h-6">
                {
                    (loading) ? ('Loading...') : ('')
                }
            </div>

            <div className="grid grid-cols-4 gap-2 w-[60vw] text-2xl font-medium text-gray-100">
                <span className="px-5" >Items</span>
                <span className="" >Price</span>
                <span className="" >Quantity</span>
                <span className="" >Amount</span>
            </div>
            <div className="h-0.5 w-[60vw] bg-gray-200 mx-[2vw] mb-4"></div>

            {

                (cart?.length != undefined) ? ((cart?.length && cart[0]?.products?.length) ? (

                    <>
                        {

                            cart[0]?.products.map((e) => {
                                return (
                                    <div className="grid grid-cols-4 gap-4 w-[60vw] text-xl font-medium overflow-hidden text-slate-300" key={e.id}>
                                        <span className="w-[90%] whitespace-nowrap text-ellipsis overflow-hidden px-2">{e.title}</span>
                                        <span>{e.price}</span>
                                        <div className="flex items-center text-white">
                                            <button onClick={() => {
                                                if (!loading)
                                                    updateQty(e.id, (e.quantity-- < 0 ? 0 : e.quantity))
                                            }} className="  bg-red-500  px-2 rounded pb-1 hover:brightness-125">-</button>
                                            <input type="text" value={e.quantity} disabled className="w-[20%] bg-white rounded-md text-center outline-none appearance-none p-1 text-black" />
                                            <button onClick={() => {
                                                if (!loading)

                                                    updateQty(e.id, ++e.quantity)
                                            }} className=" bg-green-600  px-2 rounded pb-1 hover:brightness-125 ">+</button>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <span className="w-[50%]">{e.total}
                                            </span>
                                            <button onClick={() => {
                                                if (!loading)
                                                    updateQty(e.id, 0)
                                            }} ><svg className="fill-white hover:fill-gray-400" xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg></button></div>
                                    </div>
                                )
                            })
                        }
                        <div className="h-0.5 w-[60vw] bg-gray-200 mx-[2vw] mb-4"></div>
                        <div className="grid grid-cols-2 gap-4 w-[60vw] text-xl font-medium overflow-hidden text-right text-gray-200 ">
                            <span>
                                {`Total Quantity : ${cart[0].totalQuantity}`}
                            </span>
                            <div className="flex gap-2 items-baseline justify-center">
                                <span>Total:</span>
                                <span className="text-green-400 ">
                                    {`₹ ${cart[0].discountedTotal}`}
                                </span>
                                <span className="line-through text-gray-400 text-base">
                                    {`₹${cart[0].total}`}
                                </span>
                            </div>
                        </div>

                    </>

                ) : (<span className="text-gray-400">No Product Added, Go to <Link to='/' className="text-gray-50 font-medium text-xl">Home Page</Link></span>)) : (<span>Loading</span>)
            }
        </div >)
}
export default Cart