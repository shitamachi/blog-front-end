import React, { Component } from "react"
import { RouteProps, Route, Redirect, RouteComponentProps } from "react-router-dom"
import { ConnectStore } from "../stores/ConnectStore"
import { observer, inject } from "mobx-react"

interface PrivateRouteProps extends RouteProps {
    // routeProps: RouteProps
    connect?: ConnectStore
}

@inject("connect")
@observer
export class PrivateRoute extends React.Component<PrivateRouteProps> {

    render() {
        const { isAuthenticated } = this.props.connect!
        const { component, connect, ...rest } = this.props

        return (
            <Route {...rest} render={(p: RouteComponentProps<any>): React.ReactNode => {
                if (isAuthenticated)
                    return <Component {...p} />
                return <Redirect to={{
                    pathname: "/login",
                    state: { from: this.props.location }
                }} />
            }} />
        )
    }
}
