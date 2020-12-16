import { ThemeProvider } from "@shopify/restyle";
import React from "react";
import { RecoilRoot } from "recoil";

import AppContainer from "./navigation/AppContainer";
import theme from "./theme/default";

const App = () => {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <AppContainer />
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;
