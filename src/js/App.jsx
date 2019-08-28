import React, { Component } from "react";
import { render } from "react-dom";
import Photo from "./photo";
import "../css/custom.scss";

import axios from "axios";
import photo from "./photo";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      searchTerm:'',
      picCount:'3',
      quote:[]
    };

    this.visionBoardPics = this.visionBoardPics.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearPhotos = this.clearPhotos.bind(this);
    this.quote = this.quote.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log("What are you looking for?");
  }

  visionBoardPics() {
    axios
      .get(`https://pixabay.com/api/?key=${process.env.APIKEY}&q=${this.state.searchTerm}&per_page=${this.state.picCount}&image_type=photo`)
      .then(response => response.data)
      .then(photos => {
        console.log(this.state.searchTerm);
        console.log(this.state.picCount);

        this.setState({ 
            photos: photos.hits,
            searchTerm:'',
            picCount:'3',
            search: 'true'
        });
        console.log(this.state.search)
      })
    }

  quote() {
      axios
        .get('http://api.icndb.com/jokes/random/')
        .then(response => response.data)
        .then( quote => {
            console.log(quote.value.joke)            
            this.setState({ 
                quote: quote.value.joke,
            });
            console.log(this.state.quote);
        })

  }

  clearPhotos(){
        this.setState({photos:[], quote:[]})
  }

  render() {
    console.log(this.state.photos);
    return (
    <div className='container'>
    <div className='jumbotron jumbotron-fluid'>
    <div className='container'>
    <h1 className='display-4 text-center'>🎇Inspiration for your Vision Board🎇</h1>
        <p className='lead text-center'>
            Ever want to create a vision board, but need a little help with your vision? 
            Use this image and quote search to find a little inspiration to make your 🎇visions come true 💫
        
        </p>
    </div>
    </div>
      <div className="container">
          <div className='row'>
          <h5>What kind of images are you looking for?</h5>
          <input
            type="text"
            name="searchTerm"
            value={this.state.searchTerm}
            onChange={this.handleChange}
          />
          <h5>How many Pictures do you wanna see at a time?</h5>
          <select 
          name='picCount'
          value={this.state.picCount}
          onChange={this.handleChange}
          >
            <option value='3' >3 photos</option>
            <option value='6' >6 photos</option>
            <option value='10' >10 photos</option>
            <option value='20' >20 photos</option>
          </select>
          </div>
         
          <br/>
        
        <button className='btn btn-success' onClick={() => {this.visionBoardPics(),this.quote()}} >Search Now </button>
        
        <button className='btn btn-danger' onClick={this.clearPhotos}>New Search</button>
        <br/>

       <div id='QUOTE'><h3>
       {this.state.quote}
       </h3></div>
           
       
        
          <div className='row container'>
            {this.state.photos.map(photos => (
              <Photo
                id={photos.id}
                Image={photos.largeImageURL}
                Comments={photos.comments}
              />
            ))}
          </div>
      </div>
    </div>  
    );
  }
}

export default App;

render(<App />, document.getElementById("root"));
