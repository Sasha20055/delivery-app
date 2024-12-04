import React from "react";
import {PaperProvider} from "react-native-paper";
import theme from "@/src/styles/theme";
import AppNavigation from "@/src/navigation/AppNavigation";


export default function Index() {
  return (
      <PaperProvider theme={theme}>
        <AppNavigation />
      </PaperProvider>
  );
}
