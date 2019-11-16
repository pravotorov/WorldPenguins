import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

class Facts extends Component {
    state = {
        posts: []
    };

    async componentDidMount() {
        const { data } = await axios.get('http://localhost:5000/facts');
        this.setState({
            posts: data
        });
    }

    render() {
        const { posts } = this.state;

        const postList = posts.length ? (
            posts.map(post => {
                return (

                    <div className="col s4 items" key={post._id} >
                        <div className="card">
                            <div className="card-image">
                            <Link to={'/facts/'+post._id} >
                                <img className="factsImg"src={post.img} />
                                <span className="card-title">{post.title}</span>
                            </Link>
                            </div>
                            <div className="card-content factsContent">
                                <p>{post.description.substring(0, 140)}...</p>
                            </div>
                            <div className="card-action">
                                <a href="#">This is a link</a>
                            </div>
                        </div>
                    </div>
                )
            })
        ) : (
                <div className="center">No post yet</div>
            )
        return (
            <div className="row">
                <div className='container-fluid addMenuFact blue-grey darken-3'>
                    <h2 className='center transition'>{posts.length} facts about penguins</h2>

                </div>
                
                <div className="container">
                    <div className="center viewBut">
                        <Link to={'/listcards'} className="waves-effect waves-light btn-large blue-grey darken-3" >
                            Show all kinds</Link>
                    </div>
                </div>

                <div className="container">
                    {postList}
                </div>

            </div>
        )
    }
}



export default Facts
