import React from "react"
// import {BrowserRouterProps, } from "react-router-dom"
import {RouteComponentProps} from "react-router-dom"

// TODO finish it
const RegisterResult = ({location}: RouteComponentProps) => {
    const searchParams = new URLSearchParams(location.search.substring(1))
    console.log(searchParams)
    // switch (searchParams.get("")) {
    //
    // }
    return(
        <div>

        </div>
    )
}

export default RegisterResult
