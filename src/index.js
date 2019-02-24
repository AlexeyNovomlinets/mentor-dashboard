import React, { Component } from 'react';
import { render } from 'react-dom';
import logo from './img/github-logo.jpg';
import './index.css';
import TableScore from './components/TableScore/TableScore';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataScore: [],
      mentorList: [],
      mentor: [],
      mentorName: '',
      isHide: false,
      isErrorJson: false,
      isErrorAuth: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  componentDidMount() {
    fetch('./dataScore.json')
    .then(res => res.json())
    .then(res => this.setState({ dataScore: res}))
    .catch(() => this.setState({ isErrorJson: true }));
  };

  handleChange = (event) => {
    const mentorName = event.target.value.toLowerCase();

    this.setState({
      mentorName: mentorName,
      isErrorAuth: false,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const dataScore = this.state.dataScore;
    const mentorName = this.state.mentorName;

    const mentorList = dataScore.map( item => item.gitName);
    const mentor = dataScore.filter( item =>
      item.gitName.toLowerCase() === mentorName);
    const isErrorAuth = mentor.length ? false : true;
    const isHide = mentor.length ? true : false;

    this.setState({
      mentorList: mentorList,
      mentor: mentor[0],
      isErrorAuth: isErrorAuth,
      isHide: isHide,
    });
  };

  render () {

    const mentorName = this.state.mentorName;

    const isHide = this.state.isHide;
    const isErrorJson = this.state.isErrorJson;
    const isErrorAuth = this.state.isErrorAuth;

    return (
      <div className='app'>
        <h1>Mentor Dashboard</h1>
        { !isErrorJson && !isHide &&
          <form autoComplete='off' onSubmit={ this.handleSubmit }>
            <img src={ logo } alt=''/>
            <label htmlFor='name'>GitHub name</label>
            <input type='text' placeholder='Enter GitHub name' 
              id='name' onChange={this.handleChange} required></input>
            <button>Get it</button>
            {isErrorAuth && <p>Mentor { mentorName } is't found!</p>}
          </form>
        }
        { isErrorJson && <h2>Error reading json file!</h2> }
        { isHide && <TableScore dataScore={ this.state.dataScore } mentorList={this.state.mentorList}
           mentor={ this.state.mentor}  mentorName={ mentorName } />}
      </div>
    );
  };
};

render(<App/>, document.getElementById('root'));
