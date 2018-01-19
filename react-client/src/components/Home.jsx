import React from 'react';
import { Route, Link } from 'react-router-dom';
import SearchLocation from './SearchLocation.jsx';
import Results from './Results.jsx';
// import Board from './Board.jsx';  // uncomment when created


class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  // Only render results if search location provided
  // or if one of the categories does not have an
  // empty array
  displaySearch() {
    let display = null;
    if (this.props.info.location ||
        (this.props.info.categories.restaurants.length !== 0 ||
         this.props.info.categories.hotels.length !== 0 ||
         this.props.info.categories.events.length !== 0)) {
      display =
        <div>
          <hr/>
          <Results info={ this.props.info } />
          <hr/>
        </div>;
    }
    return display;
  }

  // If User logged in, render Board component
  displayBoard() {
    let display = null;
    if (this.props.info.isSignedIn) {
      display =
        <div>
          <Board />
        </div>;
    }
    return display;
  }

  render() {
    return (
      <div>
        <SearchLocation go={ this.props.go }/>
        { this.displaySearch() }
        { this.displayBoard() }
      </div>
    );
  }
}

export default Home;
