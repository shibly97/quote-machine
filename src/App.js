import React from 'react';
import './App.css';
import {random} from 'lodash';
import { SocialIcon } from 'react-social-icons';


class App extends React.Component {
  /* -------- constructor --------------*/
  constructor(props){
    super(props);
    this.state = {
      quote : [],
      author : [],
      selectedIndex : null,
    }
    this.selectIndex = this.selectIndex.bind(this);
    this.newIndex = this.newIndex.bind(this);
  }

   /* -------- take the data from API --------------*/
  componentDidMount(){
    fetch('https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json')
      .then(data => data.json())

       /* -------- intake those data to states --------------*/
      .then(d => this.setState({quote : d},()=>(
        this.setState({selectedIndex : this.selectIndex()})
       )) )
    
  }

  /* -------- selecting a specific quote from the array --------------*/
  get selectedQuote(){
    if(!this.state.quote.length || !Number.isInteger(this.state.selectedIndex)){
      return undefined;
    }
    return this.state.quote[this.state.selectedIndex]
  }

   /* -------- genarate a random number --------------*/
selectIndex(){
  if(!this.state.quote.length){
    return;
  }
 
  return random(0, this.state.quote.length-1) };

  /* -------- genarate a random number when button click--------------*/

newIndex(){
  this.setState({selectedIndex:this.selectIndex()} )
}

 render(){ 
  return (
    
    
  <div  id = "quote-box" className="App">

   {/* -----select the quote from the object----- */}
   <h3 id="text" class="alert alert-info" >"{this.selectedQuote? this.selectedQuote.quote :'' }"</h3>

    {/* -----select the author from the object----- */}
   <h4 id="author" class="card-title">-- {this.selectedQuote? this.selectedQuote.author :'' } --</h4>

   {/* -----new index----- */}
    <button class="btn btn-primary" id="new-quote"  onClick={this.newIndex}>Next-Quote</button> <br/><br/>

   {/* -----tweet----- */}
   <a id="tweet-quote"  href='twitter.com/intent/tweet'>
   <SocialIcon className="my-social-icon" url='twitter.com/intent/tweet'  /></a> 

    {/* -----tumber----- */}
   <SocialIcon className="my-social-icon" url={'http://facebook.com'} color="currentColor" />
   </div>
  );}
}

export default App;
