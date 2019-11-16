import React, { Component } from 'react'
import axios from 'axios'
import MapKinds from './MapKinds'


class Post extends Component {
    state = {
        posts: null,
        img: 'Penguin'
    }
    
    async componentDidMount() {
        let id = this.props.match.params.post_id;
        const { data } = await axios.get('http://localhost:5000/kinds/'+ id);
        this.setState({
            posts: data,
            img: data.img
        });
    }

    render() {

        const post = this.state.posts ? (
            <div className="post">
            <h4 className="center">{this.state.posts.title}</h4>
            <p>{this.state.posts.description}</p>
            </div>
        ):(
            <div className="center">Loading post...</div>
        )

        return (
            <div className="container">
                <div className="row">
                    <div className="left col s3">
                        <img src={this.state.img} className="imgPost" />
                    </div>
                    <div className="right col s8">
                        {post}   
                    </div>                
                </div>
                <div className="container">
                <MapKinds kinds={this.state.posts}/>
                </div>
            </div>
        )
    }
}

export default Post 
