import React, { createContext, useState } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);

    const addOrder = (orderData) => {
        setOrders((prevOrders) => [
            {
                id: (prevOrders.length + 1).toString(),
                orderNumber: `ORD${10000 + prevOrders.length + 1}`,
                status: "В процессе",
                name: orderData.name || "Не указан",
                estimatedTime: null,
                address: orderData.address || "Не указан",
                items: orderData.items || [],
                isConfirmed: false,
            },
            ...prevOrders,
        ]);
    };

    const removeOrder = (id) => {
        setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    };

    const updateOrder = (id, updatedOrder) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === id ? { ...order, ...updatedOrder } : order
            )
        );
    };

    const clearOrders = () => {
        setOrders([]);
    };

    const toggleOrderConfirmation = (id) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === id ? { ...order, isConfirmed: !order.isConfirmed } : order
            )
        );
    };

    return (
        <OrderContext.Provider
            value={{
                orders,
                addOrder,
                removeOrder,
                updateOrder,
                clearOrders,
                toggleOrderConfirmation,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
};

export default OrderContext;