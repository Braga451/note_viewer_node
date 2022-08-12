import React from "react";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import Index from "./components/index_components/Index"
import UserPage from "./components/user_components/UserPage"
import Config from "./components/config_components/Config"

function Router(){
        return(
                <BrowserRouter>
                        <Routes>
                          <Route element = {<Index />} path = "/" exect />
                          <Route element = {<UserPage />} path="/user/*" />
                          <Route element = {<Config />} path="/config" />
                        </Routes>  
                </BrowserRouter>
        )
}

export default Router
