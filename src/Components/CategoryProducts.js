import { useEffect, useState, useContext } from "react"
import Card from "./Card"
import ShimmerCard from "./ShimmerCard"
import SortContext from "../Context/SortContext"

const CategoryProducts = ({ name }) => {
    const [products, setProduct] = useState([])
    const { sort, setSort, sortAsc, sortDsc } = useContext(SortContext)
    const getProducts = async () => {
        const res = await fetch(`https://dummyjson.com/products/category/${name}?limit=10`)
        const data = await res.json()
        setProduct(() => [...sortAsc(data.products)])
    }

    useEffect(() => {
        getProducts()
    }, [])
    useEffect(() => {
        if (sort && products.length) {
            setProduct((prev) => [...sortAsc(prev)])
        }
        else if (!sort && products.length) {
            setProduct((prev) => [...sortDsc(prev)])
        }
    }, [sort])



    return (

        <>
            <h1 className="font-medium text-xl px-64 mt-8 mb-1">{name.toUpperCase()}</h1>
            <div className="mx-5  px-5 py-3 flex gap-3 items-center justify-center"  >
                {(products) ? (
                    <>
                        {products.map((e) => {
                            return < Card key={e.id} product={e} />

                        })}
                    </>
                ) : (new Array(5).fill('1').map((e, k) => {
                    return <ShimmerCard key={k} />
                }))}
            </div>
        </>
    )
}
export default CategoryProducts