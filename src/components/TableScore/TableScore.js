import React, { Component } from 'react';
import './TableScore.css';

export default class TableScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataScore: [],
      mentorList: [],
      mentor: [],
      mentorName: '',
      isErrorAuth: false,
      isNullAuth: false,
    };
    this.getStatus = this.getStatus.bind(this);
    this.handleChange = this.handleChange.bind(this);
  };

  componentDidMount() {
    this.setState({
      dataScore: this.props.dataScore,
      mentorList : this.props.mentorList,
      mentor: this.props.mentor,
      mentorName: this.props.mentorName,
    });
  };

  handleChange = (event) => {
    const mentorName = event.target.value.toLowerCase();
    const dataScore = this.state.dataScore;
    const mentor = dataScore.filter( item => item.gitName.toLowerCase() === mentorName);
    const isErrorAuth = mentor.length ? false : true;
    const isNullAuth = mentorName ? false : true;
    
    this.setState({
      mentorName: mentorName,
      mentor: mentor[0] || [],
      isErrorAuth: isErrorAuth,
      isNullAuth,
    });
  };

  getStatus = (task, student) => {
    const status = task.status;
    const taskName = task.name;
  
    switch(status) {
      case 'ToDo':
        return 'todo';
      case 'In Progress':
        return 'progress';
      case 'Checking':
        const task_1 = student.taskList.filter(item => item.name === taskName).shift();
        if (!task_1)
          return 'checking';
        else {
          if(task_1.PR && task_1.score) return 'checked';
          else return 'checking';
        }
      case 'Checked':
        const task_2 = student.taskList.filter(item => item.name === taskName).shift();
        if (!task_2)
          return 'timeGone';
        else {
          if(task_2.PR && task_2.score) return 'checked';
          else return 'timeGone';
        }
      default:
        return 'timeGone';
    }
  };

  render() {

    const mentorList = this.state.mentorList;
    const mentor = this.state.mentor;
    const mentorName = this.state.mentorName;
    const errorAuth = this.state.isErrorAuth;
    const nullAuth = this.state.isNullAuth;

    const taskList = mentor.taskList;
    const students = mentor.students;

    return (
      <div className='tableScore'>
        <h2>Mentor</h2>
        <input list='mentorList' defaultValue={ mentorName } onChange={this.handleChange} />
        <datalist id="mentorList">
          { mentorList.map( (item, key) => {
            return(
              <option value={ item } key={ key }></option>
            );
          })}
        </datalist>

        { !errorAuth && 
          <table>
            <thead>
              <tr>
                <th>Task List</th>
                { mentor.students && mentor.students.map( (item, key) => {
                    return (
                      <th key={ key }><a href={ item.gitLink }>{ item.gitName }</a></th>
                    );
                  })
                }
              </tr>
            </thead>
            <tbody>
              { taskList && taskList.map( (item, key)  => {
                  return(
                    <tr key={ key }>
                      <td key={ key }><a href={ item.link }>{ item.name }</a></td>
                      { students && students.map((itemSt, keySt) => {
                        return(
                          <td key={ keySt } className={ this.getStatus(item, itemSt) }></td>
                        );
                      })}
                    </tr>
                  );
                })
              }
            </tbody>
          </table> 
        }

        { errorAuth && <p>Mentor { mentorName || '' } is't found! { nullAuth && '(Please enter the name)'}</p> }
      </div>
    );
  };
};
