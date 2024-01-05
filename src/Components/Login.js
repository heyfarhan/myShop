import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from "../Context/UserContext"

const Login = () => {
    const navigate = useNavigate();
    const { userInfo, setUserInfo } = useContext(UserContext)

    const [errorMsg, setErrorMsg] = useState(null)

    const updateInput = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e) => {
        // e.preventDefault();
        setErrorMsg(null)
        const res = await fetch(process.env.LOGIN_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                username: userInfo.username,
                password: userInfo.password,
                expiresInMins: 60, // optional
            })
        })

        const { username, image, firstName, token, id, message } = await res.json()
        setErrorMsg(message)

        if (token) {

            localStorage.setItem('token', token)
            //temporarily storing this removing later
            localStorage.setItem('id', id)
            localStorage.setItem('image', image)
            localStorage.setItem('firstName', firstName)
            localStorage.setItem('username', username)
            //
            setUserInfo({ username, image, firstName, token, id })
            navigate('/', { replace: true })
        }
        else {
        }


    }
    useEffect(() => {
        (userInfo.token) ? (navigate('/', { replace: true })) : (false)
    }, [])

    return ((userInfo.token) ? (true) : (
        <div className="flex items-center justify-center w-full py-24 px-8  h-[90vh] bg-gray-900">
            <div className="bg-gray-700 flex flex-col  gap-4 rounded-2xl text-white  font-semibold py-12 px-12  " >
                <div className="flex gap-3 flex-col justify-center items-center">

                    <span className=" text-4xl">LOGIN</span>

                    {(errorMsg) ? (
                        <span className="text-orange-300">{errorMsg}</span>
                    ) : (false)}
                </div>
                <div className="h-1 w-full bg-white rounded-lg my-3"></div>
                <label className="text-xl" htmlFor='username'>Username</label>
                <input type="text" id="username" placeholder="Username" className="bg-gray-400 rounded-md p-2 text-white outline-none placeholder-gray-200" name="username" onChange={updateInput} />
                <label className="text-xl" htmlFor='password'>Password</label>
                <input type="password" id="password" placeholder="Password" onChange={updateInput} name="password" className="bg-gray-400 rounded-md p-2 text-white outline-none placeholder-gray-200" />
                <button className="bg-gray-900 px-4 py-1 rounded-lg mx-4 mt-4 text-white text-lg hover:bg-gray-950  " onClick={handleLogin}>Login</button>

            </div>
        </div>
    ))
}
export default Login