import { createContext, useState, Children } from "react";

const SortContext = createContext(null);

export default SortContext

const SortContextProvider = ({ children }) => {

    const [sort, setSort] = useState(true)  //true for ascending Price means Low To High & false for High to Low
    function sortAsc(products) {
        return products?.sort((a, b) => a?.price - b?.price);
    }
    function sortDsc(products) {
        return products?.sort((a, b) => b?.price - a?.price);
    }

    return (
        <SortContext.Provider value={{ setSort, sort, sortAsc, sortDsc }} >
            {children}
        </SortContext.Provider>
    )

}
export { SortContextProvider }