import React from "react";
// import logo from "./logo.svg";
import "./App.css";
// import Item from "./MyItem";

class FilmItemRow extends React.Component {
  render() {
    return (
      <li>
        <a href={this.props.url}>{this.props.url}</a>
      </li>
    );
  }
}

class StarWars extends React.Component {
  constructor() {
    super();
    this.state = {
      image: null,
      loadedCharacter: false,
      name: null,
      height: null,
      homeworld: null,
      films: [],
    };
    // this.characterImages = {
    //   "Luke Skywalker":
    //     "https://vignette.wikia.nocookie.net/starwars/images/2/20/LukeTLJ.jpg",
    //   "Wilhuff Tarkin":
    //     "https://vignette.wikia.nocookie.net/starwars/images/c/c1/Tarkininfobox.jpg",
    // };
  }
  getNewCharacter() {
    const randomNumber = Math.round(Math.random() * 88);
    const url = `https://akabab.github.io/starwars-api/api/id/${randomNumber}.json`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        this.setState({
          image: data.image,
          name: data.name,
          height: data.height,
          homeworld: data.homeworld,
          films: data.films || [],
          loadedCharacter: true,
        });
      });
  }
  render() {
    const movies = this.state.films.map((url, i) => {
      return <FilmItemRow key={i} url={url} />;
    });

    return (
      <div>
        {this.state.loadedCharacter && (
          <div>
            <img src={this.state.image} alt={this.state.name} />
            <h1>{this.state.name}</h1>
            <p>{this.state.height}</p>
            <p>
              <a href={this.state.homeworld}>HomeWorld</a>
            </p>

            <ul>{movies}</ul>
          </div>
        )}

        <button
          type="button"
          onClick={() => this.getNewCharacter()}
          className="btn"
        >
          Randomize Character
        </button>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <StarWars />
      </header>
    </div>
  );
}

export default App;
