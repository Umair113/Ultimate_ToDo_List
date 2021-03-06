import React, { Component } from 'react';
import TaskItem from '../taskItem/TaskItem';
import {connect} from 'react-redux';
import {getTasks , deleteTask , updateTask , doneTask} from '../../store/actions/todoActions';
import UpdateDialog from '../dialog/Dialog';
import Spinner from '../spinner/Spinner';
class TaskList extends Component {
  constructor(props){
    super(props)
    this.state = {
      task : {
        id : '',
        title : '',
        description : ''
      },
      dialog : false
    }
    this.props.getTasks()
  }

  openDialog = (task)=>{
    this.setState({
      dialog : true,
      task : {...task}
    })
  }
  closeDialog = () =>{
    this.setState({dialog : false})
  }
  componentWillReceiveProps(props){
    this.props.getTasks()
  }

  render() {
    const {tasks} = this.props;
    let content;

    if(!tasks){
      content = (
        <Spinner/>
      )
    }else{
      content =(
        tasks.map((task) =>{
          return(
            <TaskItem
             doneTask = {this.props.doneTask}
             openDialog = {this.openDialog} 
             deleteTask = {this.props.deleteTask} 
             key={task.id} 
             id = {task.id} 
             task = {task}
             />
          )
        })
      )
    }

    return (
      <div style = {styles.taskContainer} >
         {content}
         {this.state.dialog ?  <UpdateDialog updateTask = {this.props.updateTask} task = {this.state.task} closeDialog = {this.closeDialog} /> : <span></span> }
      </div>
    )
  }
};
const mapStateToProps = (state) =>{
  return {
    tasks  : state.TaskReducer.tasks
  }
}

const styles = {
  taskContainer : {
    width : '100%',
    display : 'flex',
    flexDirection : 'column',
    alignItems: 'center',
    padding : '60px'
  },
 
}
export default connect(mapStateToProps , {getTasks , doneTask , deleteTask , updateTask})(TaskList);
