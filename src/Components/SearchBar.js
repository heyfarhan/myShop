import { useEffect, useState } from "react"

import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
const SearchBar = () => {
    const [text, setText] = useState('');
    const navigate = useNavigate()

    return (
        <div className="flex mr-5">
            <input type="text" className="bg-gray-50 h-8 appearance-none outline-none text-black rounded-l-md px-2 " placeholder="What are Looking For .. ?" value={text} onChange={(e) => {
                setText(() => e.target.value)
            }}
                onKeyDown={(e) => {

                    if (e.key === 'Enter') {
                        navigate(`${(text.trimEnd().split(' ').join('-').toLowerCase() != '') ? (`/search/${text.trimEnd().split(' ').join('-').toLowerCase()}`) : ('/')}`)

                    }
                }}

            ></input>
            <Link to={`${(text.trimEnd().split(' ').join('-').toLowerCase() != '') ? (`/search/${text.trimEnd().split(' ').join('-').toLowerCase()}`) : ('/')}`}>
                <div className="h-8  bg-pink-600 px-3 fill-white rounded-r-md flex items-center"><svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg></div>
            </Link>
        </div >
    )
}
export default SearchBar