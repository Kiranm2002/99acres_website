import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import App from "./App";
import { store } from "./app/store";
import { getDesignTokens } from "./app/theme";
import { BrowserRouter } from "react-router-dom";

function Root() {
  const [mode, setMode] = useState("light");

  const theme = useMemo(
    () => createTheme(getDesignTokens(mode)),
    [mode]
  );

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
         <App/>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
