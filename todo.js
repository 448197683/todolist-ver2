const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');
const todoArray = [];

input.focus();

const handleSubmit = (e) => {
  e.preventDefault();
  const todo = input.value;
  addTodo(todo);
  saveTodo(todo);
  input.value = ``;
};

const saveTodo = (todo) => {
  todoArray.push(todo);
  localStorage.setItem('todos', todoArray);
};

const loadTodo = () => {
  const todos = localStorage.getItem('todos');
  const todoArray = todos.split(',');
  todoArray.forEach((todo) => {
    addTodo(todo);
    todoArray.push(todo);
  });
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
  e.target.parentElement.remove();
};

form.addEventListener('submit', handleSubmit);
loadTodo();
