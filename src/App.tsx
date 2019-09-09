import React from 'react'
import './App.css'
import BlogLayout from "./components/BlogLayout/BlogLayout"
import {BrowserRouter as Router} from "react-router-dom"

const App: React.FC = () => {
    return (
        <Router>
            <BlogLayout/>
        </Router>
    )
}

export default App
