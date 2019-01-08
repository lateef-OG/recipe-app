import React, { Component } from 'react';
import './App.css';
import {recipes} from './tempList';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';

class App extends Component {
  state = {
    recipes: recipes,
    url: 'https://www.food2fork.com/api/search?key=ae0b1601dec71336b61b6a5b2f6aeef1',
    base_url: 'https://www.food2fork.com/api/search?key=ae0b1601dec71336b61b6a5b2f6aeef1',
    details_id: 35384,
    pageIndex: 1,
    search: '',
    query: '&q=',
    error: ''
  }
  async getRecipes(){
    try{
      const data = await fetch(this.state.url);
      const jsonData = await data.json();
      if(jsonData.recipes.length === 0){
        this.setState(()=>{
          return{error: 'sorry, your search did not return any result.'}
        })
      }else(
        this.setState(()=>{
          return{recipes: jsonData.recipes}
        })
      )
    }catch(error){
      console.log(error);
    }
  }
  componentDidMount(){
    this.getRecipes();
  }
  displayPage = (index) => {
    switch(index){
      default: 
      case 1:
        return(<RecipeList 
                error={this.state.error}
                recipes={this.state.recipes}
                handleDetails={this.handleDetails}
                value={this.state.saerch}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}/>)
      case 0:
        return(<RecipeDetails 
                id={this.state.details_id}
                handleIndex={this.handleIndex}/>)
    }
  }
  handleIndex = (index) =>{
    this.setState({
      pageIndex: index
    })
  }
  handleDetails = (index, id) => {
    this.setState({
      pageIndex: index,
      details_id: id
    })
  }
  handleChange = (e) => {
    this.setState({
      search: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const {base_url, query, search} = this.state;
    this.setState(()=>{
      return {url: `${base_url}${query}${search}`, search:''}
    },()=>{
      this.getRecipes();
    })
  }
  render() {
    // console.log(this.state.recipes);
    return (
      <React.Fragment>
        {this.displayPage(this.state.pageIndex)}
      </React.Fragment>
    );
  }
}

export default App;
