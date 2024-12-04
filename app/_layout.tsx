import React from "react";
import AppNavigation from "@/src/navigation/AppNavigation";
import {CartProvider} from "@/src/context/CartContext";
import theme from "@/src/styles/theme";
import {PaperProvider} from "react-native-paper";
import {OrderProvider} from "@/src/context/OrderContext";
import {ViewedProductsProvider} from "@/src/context/ViewedProductsContext";


export default function Index() {
  return (
      <PaperProvider theme={theme}>
          <ViewedProductsProvider>
              <OrderProvider>
                  <CartProvider>
                      <AppNavigation/>
                  </CartProvider>
            </OrderProvider>
          </ViewedProductsProvider>
      </PaperProvider>
  );
}

