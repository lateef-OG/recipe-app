import React, { Component } from 'react';
import {recipe} from '../tempDetails';

export default class RecipeDetails extends Component {
    constructor(props){
        super(props)
        this.state = {
            recipe: recipe,
            url: `https://www.food2fork.com/api/get?key=ae0b1601dec71336b61b6a5b2f6aeef1&rId=${this.props.id}`
        }
    }
    async componentDidMount(){
        try{
            const data = await fetch(this.state.url);
            const jsonData = await data.json();
            this.setState({
              recipe: jsonData.recipe
            })
        }catch(error){
            console.log(error);
        }
    }
  render() {
    const {
        image_url,
        publisher_url,
        publisher,
        source_url,
        title,
        ingredients
    } = this.state.recipe;

    const { handleIndex } = this.props;
    return (
      <React.Fragment>
          <div className="container">
              <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3">
                    <button className="btn btn-warning mb-5 text-captalize" onClick={() => handleIndex(1)}>back to recipe list</button>
                    <img src={image_url} alt="recipe" className="d-block w-100"/>
                </div>
                <div className="col-10 mx-auto col-md-6 my-3">
                    <h6 className="text-uppercase">{title}</h6>
                    <h6 className="text-warning text-captitalize">provided by {publisher}</h6>
                    <a href={publisher_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-2 text-capitalize">publisher webpage</a>
                    <a href={source_url} target="_blank" rel="noopener noreferrer" className="btn btn-success mt-2 mx-3 text-capitalize">recipe url</a>
                    <ul className="list-group mt-4">
                        <h2 className="mt-3 mb-4">
                            {
                                ingredients.map((item, index) => {
                                    return(
                                        <li className="list-group-item" key={index}>{item}</li>
                                    )
                                })
                            }
                        </h2>
                    </ul>
                </div>
              </div>
          </div>
      </React.Fragment>
    )
  }
}
