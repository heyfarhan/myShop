import { useContext } from "react"
import UserContext from "../Context/UserContext"
import Category from '../Utils/Category.json'
import CategoryProducts from "./CategoryProducts"
import SortContext from "../Context/SortContext"

const Home = () => {

    const { userInfo } = useContext(UserContext)
    const { sort, setSort } = useContext(SortContext)

    return (
        <>
            <div className="h-14 py-4 px-8 items-center text-2xl mb-4">
                Happy Shopping 🎁, {userInfo.firstName} !
            </div>
            <div className="h-0.5 w-[96vw] bg-gray-500 mx-[2vw] mb-4"></div>

            <div className="flex gap-2 items-center justify-end mr-16">
                <span className="font-medium text-xl">Sort By :</span>
                <input type="radio" className="appearance-none peer/asc" name="sort" id="asc" defaultChecked onClick={(e) => {
                    if (e.target.checked == true)
                        setSort(true)
                }} /><label htmlFor='asc' className=" border-gray-800 px-2 py-1 bg-gray-50 border-2 rounded peer-checked/asc:bg-gray-950 peer-checked/asc:font-medium peer-checked/asc:text-white ">Low to High</label>
                <input className="appearance-none peer/dsc" type="radio" name="sort" id="dsc" onClick={(e) => {
                    if (e.target.checked == true)
                        setSort(false)
                }
                } /> <label htmlFor='dsc' className=" border-gray-800 px-2 py-1 bg-gray-50 border-2 rounded peer-checked/dsc:bg-gray-950 peer-checked/dsc:font-medium peer-checked/dsc:text-white ">High to Low</label>
            </div>

            {
                (Category) ? (
                    <>
                        {Category.map((e, key) => {
                            return <CategoryProducts key={key} name={e} />

                        })}
                    </>
                ) : (false)
            }
        </>
    )
}
export default Home