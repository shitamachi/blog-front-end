import React from "react"
import { Switch, Route } from "react-router"
import AdminLayout from "./AdminLayout"
import BlogLayout from "./BlogLayout"

export const BasicLayout = (props: any) => {

    return(
        <Switch>
            <Route path="/admin" component={AdminLayout} />
            <Route component={BlogLayout} />
        </Switch>
    )
}