import React from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import '../app.css'
import Header from './Header'
import Facts from './Facts'

const Home = (props) => {
   
    return (
    <div className='row'>
        <Header />
        
        <Facts/>   
        
    </div>
    )
}

export default withRouter(Home)

