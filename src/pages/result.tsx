import React from "react"
import {BrowserRouterProps, RouteComponentProps} from "react-router-dom"

const RegisterResult = ({location}: RouteComponentProps) => {
    const searchParams = new URLSearchParams(location.search.substring(1))
    switch (searchParams.get("")) {

    }
}
