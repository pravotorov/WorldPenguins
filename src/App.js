import React, { Component } from 'react';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import ListCards from './components/ListCards'
import Register from './components/Register'
import SignIN from './components/SignIn'
import Post from './components/Post'
import PostFacts  from './components/PostFacts'
import Account from './components/Account'
import addViewPenguin from './components/addViewPenguin'
import axios from 'axios';



class App extends Component {
  state = {
    user: '',
    isValidToken: false
  };
  
  getValidityToken = async () => {
    
  // await axios.get(`http://localhost:5000/user/validity`, { params: { token: localStorage.getItem('token') } })
  //   .then(res => {
  //     console.log('RES',res)
  //       if (!this.state.isValidToken) {
  //         this.setState({ user: res.data });
  //         console.log(this.state.user);
  //         } 
  //        this.state.isValidToken || this.setState({ isValidToken: true });
  //         })
  //   .catch(err => {
  //         !this.state.isValidToken || this.setState({ isValidToken: false });
  //   })

    try {
      const {data} = await axios.get(`http://localhost:5000/user/validity`, { params: { token: localStorage.getItem('token') } });
      !this.state.isValidToken && this.setState({ user: data, isValidToken: true });
      // this.state.isValidToken || this.setState({ isValidToken: true }); // 3 render
      
    } catch(err) {
      !this.state.isValidToken || this.setState({ isValidToken: false });
    }
  }

  deleteToken = () => {
    localStorage.clear();
  }

  componentDidUpdate = () => {
    this.getValidityToken();
  }

  componentDidMount = () => {
    this.getValidityToken();
  } 
  

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar deleteToken={this.deleteToken} user={this.state.user} isValidToken={this.state.isValidToken} />
          <Switch >
            <Route exact path="/" component={Home} />
            <Route exact path="/listCards" component={ListCards} />
            <Route exact path='/user/register' component={Register} />
            <Route exact path="/user/sign" component={SignIN}/>
            <Route exact path="/user/account" render={(props)=> <Account {...props} user={this.state.user}/> }/>
            <Route exact path="/listCards/:post_id" component={Post} />
            <Route exact path="/kinds/add" component={addViewPenguin}/>
            <Route exact path="/facts/:post_id" component={PostFacts}/>
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }

}

export default App;
