import React from "react";
import { Route, Switch } from "react-router";
import { SignIn } from "./login/SignIn";

// for debug and test
export const Test = (props: any) => {
    console.log(props);
    console.log(props.match.path);

    return (
        <div>
            <Switch>
                <Route exact path={`${props.match.path}/show`} component={SignIn} />
            </Switch>
        </div>
    )
}
