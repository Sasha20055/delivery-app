import React, { createContext, useState } from "react";

const ViewedProductsContext = createContext();

export const ViewedProductsProvider = ({ children }) => {
    const [recentlyViewed, setRecentlyViewed] = useState([]);

    const addViewedProduct = (product) => {
        setRecentlyViewed((prevProducts) => {
            const updatedProducts = prevProducts.filter((p) => p.id !== product.id);
            return [product, ...updatedProducts].slice(0, 5);
        });
    };

    const clearRecentlyViewed = () => {
        setRecentlyViewed([]);
    };

    return (
        <ViewedProductsContext.Provider
            value={{
                recentlyViewed,
                addViewedProduct,
                clearRecentlyViewed,
            }}
        >
            {children}
        </ViewedProductsContext.Provider>
    );
};

export default ViewedProductsContext;