import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../styles/listcards.css'



class ListCards extends Component {
    state = {
        posts: []
    }
    

    deleteViewPenguin = async e => {
        const id = e.target.id
        try {
          await axios.delete('http://localhost:5000/kinds/'+ id);
        } catch (err) {
          console.log("Ошибка:" + err);
        }
      };

    async componentDidMount() {
        const { data } = await axios.get('http://localhost:5000/kinds');
        this.setState({
            posts: data
 
        });
    }

    render() {
        const { posts } = this.state;

        const postList = posts.length ? (
            posts.map(post => {
                return (
                    <div className="col s4" key={post._id} >
                        <div className="card">
                            <div className="card-image">
                            <Link to={'/listcards/'+post._id} >
                                <img className="listImg" src={post.img} />
                                <span className="card-title">{post.title}</span>
                            </Link>
                            </div>
                            <div className="card-content listsCard">
                                <p>{post.description.substring(0,140)}...</p>
                            </div>
                            <div className="card-action">
                                <a href="#">This is a link</a>
                                <i className="right material-icons" id={post._id} onClick={this.deleteViewPenguin}>delete</i>
                            </div>
                        </div>
                    </div>
                )
            })
        ) : (
                <div className="center">No post yet</div>
            )
        return (
            <div className="container">
                <div className="center">
                    <h3>Views  penguins</h3>
                </div>
                <div className="center viewBut">
                    <Link to={'../kinds/add'} className="waves-effect waves-light btn-large blue-grey darken-3" >
                    Add views penguins</Link>
                </div>
                <div className="row">
                    {postList}
                </div>
            </div>
        )
    }
}


export default ListCards
