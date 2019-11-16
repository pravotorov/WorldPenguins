import React from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'


const Navbar = (props) => {  
  return (
          <div className="center signImg">
      <div className='container regist'>
        <div className='row z-depth-4 windowRegist'>
          <div className='col s12'>
            <h3 className='center titleSign'>Hello</h3>
            <h5 className='center titleSign'>{props.user.login}</h5>
            <div className="row"> 
              <div className="input-field col s12 fieldSign">
                {/* <i className="material-icons prefix">phone</i> */}
                <p>Phone: {props.user.phone}</p>
              </div>
              <div className="input-field col s12 fieldSign">
                {/* <i className="material-icons prefix">email</i> */}
                <p className="center">Email: {props.user.email}</p>
              </div>
             
            </div>
          </div>
        </div>
      </div>
      </div>
    )
}

export default withRouter(Navbar)
