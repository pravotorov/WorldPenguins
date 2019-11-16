import React, { Component } from 'react'
import axios from 'axios'
import Facts from '../facts.jpg'
import MapKinds from './MapKinds'
import '../styles/facts.css'


class Post extends Component {
    state = {
        posts: null
    }
    
    async componentDidMount() {
        let id = this.props.match.params.post_id;
        const { data } = await axios.get('http://localhost:5000/facts/'+ id);
        this.setState({
            posts: data 
        });
    }

    render() {

        const post = this.state.posts ? (
            <div className="post">
            <h4 className="center">{this.state.posts.title}</h4>
            <p className="textFacts">{this.state.posts.description}</p>
            </div>
        ):(
            <div className="center">Loading post...</div>
        )

        return (
            <div className="container">
                <div className="row">
                <div className="center">
                <img src={Facts} className="imgFactsPost" />
                </div>
                {post}                
                </div>
            </div>
        )
    }
}

export default Post 
