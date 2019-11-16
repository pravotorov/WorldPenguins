import React, { Component } from 'react';
import axios from 'axios';
import '../styles/addViewPenguin.css';


export default class addViewPenguin extends Component {
  state = {
    title: '',
    description: '',
    file: '',
    img: '',
    imagePreviewUrl: false
  };


  handleSubmit = (e) => {
    e.preventDefault();

    console.log('handle uploading-', this.state.file);
  }

 
  handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file);
  }  
 


  onChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };
  
  addViewPenguin = async user => {
    try{
      
      const formData = new FormData();
      formData.append(
        'image',
        this.state.file,
        this.state.file.name
      );
      
      const {data} = await axios.post('http://localhost:5000/kinds/image-upload', formData);
      
      user.img = data; 
      console.log(data);

    } catch(err){
      console.log("Ошибка:" + err);
    }

    try {
      console.log(user);
      await axios.post('http://localhost:5000/kinds/add', user);
    } catch (err) {
      console.log("Ошибка:" + err);
    }
  };

  onSubmit = e => {
    e.preventDefault();
       
    const user = {
      title: this.state.title,
      description: this.state.description,
      img: ''
    }
    this.addViewPenguin(user);
    
    this.setState({
        title: '',
        description: '',
        file: '',
        imagePreviewUrl: ''
    });
  };

  render() {
    
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className='container'>
        <div className='row z-depth-4 WindowCont'>
          <div className='col s12'>
            <h4 className='center titleAdd'>Add view penguin</h4>
            
            
            <div className='col s5'>
                      
              <div className="center z-depth-5 ImgUpload imgPreview">
                  {$imagePreview}
              </div>
              
              <div className="previewComponent">
                <form className="file-field input-field" onSubmit={(e)=>this.handleSubmit(e)}>
                  <div className="btn">
                    <span>File</span>
                    <input type="file" onChange={(e)=>this.handleImageChange(e)} multiple />
                  </div>
                  <div className="file-path-wrapper">
                    <input onClick={(e)=>this.handleSubmit(e)} className="file-path validate" type="text" placeholder="Upload one or more files"/>
                  </div>
                </form>
              </div>
            </div>
            
  
            <form className='col s7' onSubmit={this.onSubmit}>
            <div className="row WindowPole"> 
              <div className="input-field col s12">
                <h6 className="center EnterTitle">Title </h6>
                <input
                    name='title'
                    id='title'
                    type='text'
                    className='col 10'
                    required
                    value={this.state.title}
                    onChange={this.onChange}
                    placeholder="Enter view title"
                  />
              </div>
              <div className="col s12">
                <h6 className="center EnterTitle">Description </h6>
                <textarea 
                name='description'
                id='description'
                required
                className='Descript'
                value={this.state.description}
                onChange={this.onChange}
                placeholder="Enter view descriptions">
                </textarea>
              </div>
            </div>
            <div className='row WindowPole'>
                <div className='col s12 center'>
                  <input
                    type='submit'
                    value='Add'
                    className='btn waves-effect waves-light'
                  />
                </div>
              </div>
            </form>
            
          </div>
        </div>
      </div>
    );
  }
}