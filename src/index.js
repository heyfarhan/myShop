import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import Header from "./Components/Header";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Protected from "./Utils/Protected";
import { UserContextProvider } from "./Context/UserContext"
import { CartContextProvider } from "./Context/CartContext"
import Cart from "./Components/Cart";
import Search from "./Components/Search";
import { SortContextProvider } from "./Context/SortContext";
import Footer from "./Components/Footer";
const root = ReactDOM.createRoot(document.getElementById('root'))

const App = () => {
    return (

        <UserContextProvider>
            <CartContextProvider>
                <SortContextProvider>
                    <Header />
                    <Outlet />
                    <Footer />
                </SortContextProvider>
            </CartContextProvider>
        </UserContextProvider>

    )
}

const routes = createBrowserRouter([{
    path: '/',
    element: <App />,
    children: [
        {
            path: '/',
            element: <Protected children={<Home />} />
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/cart',
            element: <Protected children={<Cart />} />
        },
        {
            path: '/search/:searchText',
            element: <Protected children={<Search />} />
        },

    ]


}])

root.render(<RouterProvider router={routes} />)
