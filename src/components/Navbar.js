import React from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import '../app.css'
import '../styles/navbar.css'

const Navbar = (props) => {
   
    const Nav = props.isValidToken? (
    <ul className="right menu">
            <li>
                <NavLink to='/user/account'>{props.user.login}</NavLink>
            </li>
            <li>
                <a href="/user/sign" onClick={props.deleteToken}>Log Out</a>
            </li>
            <li>
                <NavLink to={'/listcards'} >
                <i className="large material-icons">apps</i>
                </NavLink>
            </li>
        </ul>        
    ) : (
        <ul className="right menu">
        <li>
            <NavLink to='/user/sign'>Sign In</NavLink>
        </li>
        <li>
            <NavLink to='/user/register'>Sign Up</NavLink>
        </li>
        <li>
            <NavLink to={'/listcards'} >
            <i className="large material-icons">apps</i>
            </NavLink>
        </li>
     </ul>
     );
    


    return (
        <nav className="nav-wrapper  blue-grey darken-3 ">
            <div className="container z-depth-5">
                <div className="brand-logo">
                <Link to={'/'}>WorldPenguins</Link> 
                </div>       
                           
                {Nav}
            </div>           
        </nav>
    )
}

export default withRouter(Navbar)
