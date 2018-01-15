import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import SearchLocation from './SearchLocation.jsx';
import AddPrice from './AddPrice.jsx';
import Header from './navHeader.jsx';
import AddCategory from './AddCategory.jsx';
import axios from 'axios';
import TripView from './TripView.jsx';

class App extends React.Component {
  constructor(props) {
    console.log('index');
    super(props);
    this.state = {
      location: '',
      price: '',
      activities: [],
      sleep: [],
      eat: [],
      party: [],
      explore: [],
      view: 'home',
    };
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.setActivities = this.setActivities.bind(this);
    this.go = this.go.bind(this);
    this.getExploreData = this.getExploreData.bind(this);
    this.getEatData = this.getEatData.bind(this);
    this.getPartyData = this.getPartyData.bind(this);
    this.getSleepData = this.getSleepData.bind(this);
    this.changeTripView = this.changeTripView.bind(this);
  }

  onChangeLocation(destination) {
    this.setState({
      location: destination,
    }, ()=>{console.log('Destination has been set!', this.state.location);});

  }

  onChangePrice(value) {
    this.setState({
      price: value,
    }, ()=>{console.log('Price has been set!', this.state.price);});
    this.setActivities = this.setActivities.bind(this);
  }

  setActivities(data) {
    this.setState({
      activities: data,
    });
  }

  go() {
    console.log('activities list', this.state.activities);
    if (this.state.activities.includes('explore') && this.state.location !== '' && this.state.price !== '') {
      axios.post('/explore', {
        location: this.state.location,
        price: this.state.price,
      })
        .then(response => {
          console.log('explore data from server', response);
           this.getExploreData(response.data);
        })
        .catch(error => {
          console.log('error..!!', error);
        });
    }

     if (this.state.activities.includes('sleep') && this.state.location !== '' && this.state.price !== '') {
      axios.post('/sleep', {
        location: this.state.location,
        price: this.state.price,
      })
        .then(response => {
           console.log('sleep data from server', response);
           this.getSleepData(response.data);
        })
        .catch(error => {
          console.log('error..!!', error);
        });
    }

     if (this.state.activities.includes('eat') && this.state.location !== '' && this.state.price !== '') {
      console.log('eat');
      axios.post('/eat', {
        location: this.state.location,
        price: parseInt(this.state.price),
      })
        .then(response => {
           console.log('eat data from server', response);
           this.getEatData(response.data);
        })
        .catch(error => {
          console.log('error..!!', error);
        });
    }

      if (this.state.activities.includes('party') && this.state.location !== '' && this.state.price !== '') {
        console.log('party if condition');
      axios.post('/party', {
        location: this.state.location,
        price: this.state.price,
      })
        .then(response => {
           console.log('party data from server', response.data);
           this.getPartyData(response.data);
        })
        .catch(error => {
          console.log('error..!!', error);
        });
    }
    this.changeTripView();
  }


  changeTripView() {
    this.setState({
      view: 'trip',
    }, () => {  console.log('change trip view') });
  }

  getExploreData(data) {
    this.setState({
      explore: data,
    });
  }

  getEatData(data) {
    this.setState({
      eat: data,
    });
  }

  getPartyData(data) {
    this.setState({
      party: data,
    });
  }

  getSleepData(data) {
    this.setState({
      sleep: data,
    });
  }

  render() {
    console.log('im invoked');
    const { view } = this.state;
    console.log('state view', this.state.view);
    if (view === 'trip') {
      return <TripView eat={this.state.eat} party={this.state.party} sleep={this.state.sleep} explore={this.state.explore}/ >
    } else if (view === 'home') {
        return (
      <div>
        <div className="headers">
          <h1>Voyage</h1>
          <h5>Ready to plan out your next getaway?</h5>
        </div>
        <div className="searchContainer">
          <div>
            <div>
              <SearchLocation changeLoc={this.onChangeLocation} />
              <AddPrice changeBudget={this.onChangePrice} />
              <AddCategory setActivities={this.setActivities} />
            </div>
          </div>
        </div>
        <div className="goButton">
          <button type="button" className="btn btn-primary mb-2" onClick={this.go} > Lets Go! </button>
        </div>
      </div>
    );
    }
  }
}

//   render() {
//     return (
//       <div>
//         <div>
//           <h1>Trip collab</h1>
//           <div>
//             <SearchLocation changeLoc={this.onChangeLocation} />
//             <AddPrice changeBudget={this.onChangePrice} />
//             <AddCategory setActivities={this.setActivities} />
//           </div>
//         </div>
//         <div>
//           <button type="button" className="btn btn-primary mb-2" onClick={this.go} > GO </button>
//         </div>
//       </div>
//     );
//   }
// }


ReactDOM.render(<App />, document.getElementById('app'));

export default App;
