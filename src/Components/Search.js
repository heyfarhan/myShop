import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import Card from "./Card";


const Search = () => {
    const { searchText } = useParams();
    const [products, setProducts] = useState([]);
    const [max, setMax] = useState(0);
    const [pg, setPg] = useState(0);
    const [loading, setLoading] = useState(0);
    const searchProducts = async (pg) => {
        setLoading(() => true)
        let skip = pg * 10 || 0;
        const res = await fetch(`${process.env.SEARCH_URL}?q=${searchText}&limit=10&skip=${skip}`)
        const data = await res.json()
        setProducts((prev) => [].concat(prev, data?.products))
        setMax(() => data?.total)
        setPg((prev) => prev + 1)
        setLoading(() => false)

    }

    useEffect(() => {
        setProducts(() => [])
        setMax(() => 0)
        setPg(0)
        searchProducts()
    }, [searchText])



    return (
        <div className="flex flex-col">

            <h1 className="ml-48 text-3xl font-medium my-4"> {searchText.toUpperCase().split('-').join(' ')}</h1>

            <div className="mx-5  px-5 py-3 flex flex-wrap gap-y-5 gap-2 items-center justify-center "  >
                {
                    (products?.length) ? (
                        products?.map((e, k) => {
                            return (

                                <Card product={e} key={e?.id} />

                            )
                        })
                    ) : (false)
                }
            </div>
            <div className="flex items-center justify-center">
                {
                    (products?.length < max) ? (
                        <button className='px-3 py-1.5 bg-red-600 font-medium text-lg hover:bg-red-800 rounded-xl text-white' onClick={() => {
                            if (!loading)
                                searchProducts(pg)
                        }}>
                            {(!loading) ? ('Load More') : ('Loading...')}
                        </button>
                    ) : ((!loading) ? (<span className="text-gray-700 font-medium">No Product Added, Go to <Link to='/' className="text-gray-900 font-bold text-xl">Home Page</Link></span>) : (false))
                }
            </div>
        </div >

    )
}
export default Search