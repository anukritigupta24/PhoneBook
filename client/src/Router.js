import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import App from "./App";
import CreateContact from "./components/CreateContact"
import EditContact from "./components/EditContact";


const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={App} exact />
            <Route path="/create/contact" component={CreateContact} />
            <Route path="/edit/contact/:id" component={EditContact}/>


        </Switch>

    </BrowserRouter>

)

export default Router