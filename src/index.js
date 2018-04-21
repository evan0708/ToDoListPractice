import React from 'react';
import { render } from 'react-dom';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { done: false };
    this.onClickBtn = this.onClickBtn.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onClickBtn() {
    this.setState(prevState => {
      console.log('before state change: state = ' + prevState.done);
      return {
        done: !prevState.done
      }
    });
  }

  onDelete() {
    this.props.handleDelete(this.props.index);
  }

  render() {
    const textStyle = { 'textDecorationLine': this.state.done ? 'line-through' : 'none' };
    const btnText = this.state.done ? 'Undo' : 'Done';
    return (
      <div>
        <button onClick={this.onClickBtn}>{btnText}</button>
        <span style={textStyle}>{this.props.text}</span>
        <button onClick={this.onDelete}>x</button>
      </div>
    );
  }
}

class TodoList extends React.Component {
  render() {
    return(
      <div>
        {this.props.todos.map((str, i) => {
          return <TodoItem 
                  handleDelete={this.props.handleDelete} 
                  key={i} 
                  index={i}
                  text={str}/>
        })}
      </div>
    );
  }
}

class UserInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: ''
    }
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onClick() {
    this.props.handleAppTodo(this.state.userInput);
    this.setState({userInput: ''});
  }

  onChange(e) {
    //console.log(e.target.value);
    //console.log(e.target);
    this.setState({userInput: e.target.value})
  }

  render() {
    return(
      <div>
        <input onChange={this.onChange} value={this.state.userInput} type="text"/>
        <button onClick={this.onClick}>Add</button>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      todos: ['one', 'two', 'three', 'four', 'five']
    };
    this.handleAppTodo = this.handleAppTodo.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleAppTodo(text) {
    this.setState(prevState => {
      return {
        todos: [...prevState.todos, text]
      }
    })
  }

  handleDelete(index) {
    this.setState(prevState => {
      return {
        todos: [
          ...prevState.todos.slice(0, index), 
          ...prevState.todos.slice(index + 1, prevState.todos.length)
        ]
      }
    })
  }
  render() {
    return(
      <div> 
        <TodoList handleDelete={this.handleDelete} todos={this.state.todos}/>
        <UserInput handleAppTodo={this.handleAppTodo}/>
      </div>
    );
  }
}

render(<App/>, document.getElementById('root'));
