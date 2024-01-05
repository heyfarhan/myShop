import { useContext, useEffect, useState } from "react"
import CartContext from "../Context/CartContext"
import UserContext from "../Context/UserContext"

const Card = ({ product }) => {
    const { cart, setCart, method } = useContext(CartContext)
    const { userInfo, setUserInfo } = useContext(UserContext)
    const [qty, setQty] = useState(0)
    const [loading, setLoading] = useState(false)
    let controller;


    useEffect(() => {
        if (cart[0]?.products?.length != undefined && cart[0]?.products?.length != 0) {

            if (cart[0].products.filter((e) => e['id'] == product.id).length) {
                setQty(cart[0].products.filter((e) => e['id'] == product.id)[0]['quantity'])
            }
        }

    }, [cart])

    const addToCart = async (id, quantity) => {
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
        payload = {
            ...payload, products: [
                {
                    id: id,
                    quantity: quantity
                }]
        }

        if (cart[0]?.products?.length) {
            if (method == 'PUT') {

                payload = {
                    ...payload, products: [...cart[0].products, ...payload.products],
                }
            }
            else {
                let remainingProduct = cart[0].products.filter((product) => product.id != id)
                payload = {
                    ...payload, products: [...remainingProduct, ...payload.products],
                }

            }
        }
        const res = await fetch(url, {
            signal,
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        const data = await res.json();
        setCart([data])
        setQty((prev) => prev + 1)
        setLoading(false)
    }

    return (
        <div className="h-84 w-64 boder-2 border border-gray-700 m-1 p-2 flex flex-col gap-1 ">
            <img className='h-[25vh] object-cover bg-gray-300 ' src={product?.thumbnail} />
            <div className="flex justify-between">
                <h1 className="font-medium whitespace-nowrap w-24 overflow-hidden">{product?.title}</h1>
                <span className="font-medium text-md text-red-700"> ⭐ {product?.rating}</span>

            </div>
            <div className="flex items-baseline">
                <span className="font-medium text-lg text-green-800">Price : ₹{product?.price}</span>
                <span className=" text-sm text-green-700 px-1 line-through mr-auto"> ₹{Math.floor(Number(product?.price) + Number(product?.price) * (Number(product?.discountPercentage) / 100))}</span>


                <button className="ml-auto text-md font-medium   text-white " onClick={() => {
                    if (!loading) {

                        addToCart(product?.id, qty + 1)
                    }
                }}>
                    {
                        (cart.length != undefined) ? (
                            <span className="px-2 pt-0.5 pb-1 bg-orange-700 hover:bg-orange-900  rounded-lg ">
                                {(!loading) ? (
                                    (qty) ? (`Added ${qty}`) : ('Add')
                                ) : ('Adding')

                                }
                            </span>
                        ) : (false)
                    }
                </button>
            </div>
        </div >
    )
}
export default Card