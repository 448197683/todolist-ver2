const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');
let todoArray = [];

input.focus();

const handleSubmit = (e) => {
  e.preventDefault();
  const todo = input.value;
  if (todo === '') {
    return;
  }
  addTodo(todo);
  savrTodo(todo);
  input.value = ``;
};

const addTodo = (data) => {
  const todo = document.createElement('li');
  const deleteBtn = document.createElement('span');
  todo.innerHTML = data;
  deleteBtn.innerHTML = `🗑`;
  ul.append(todo);
  todo.append(deleteBtn);
  deleteBtn.addEventListener('click', deleteTodo);
};

const deleteTodo = (e) => {
  todoArray = [];
  e.target.parentElement.remove();
  const value = e.target.parentElement.firstChild.data;
  const loadList = localStorage.getItem('todos');
  const loadArray = loadList.split(',');
  loadArray.forEach((todo) => {
    if (todo !== value) {
      todoArray.push(todo);
    }
  });
  localStorage.setItem('todos', todoArray);
};

const savrTodo = (todo) => {
  todoArray.push(todo);
  localStorage.setItem('todos', todoArray);
};

const loadTodo = () => {
  const todos = localStorage.getItem('todos');
  if (todos === null || todos === '') {
    return;
  }
  const todoList = todos.split(',');
  todoList.forEach((todo) => {
    addTodo(todo);
    todoArray.push(todo);
  });
};

form.addEventListener('submit', handleSubmit);
loadTodo();
