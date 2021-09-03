const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');
let todoArray = [];
let i = 0;
input.focus();

const handleSubmit = (e) => {
  e.preventDefault();
  const todo = input.value;
  i = i + 1;
  todo.id = i;
  if (todo === '') {
    return;
  }
  addTodo(todo, i);
  saveTodo(todo, i);
  input.value = ``;
};

const addTodo = (data, i) => {
  const todo = document.createElement('li');
  todo.id = i;
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
  const target = e.target.parentElement;
  const todoJSON = localStorage.getItem('todos');
  const todoObj = JSON.parse(todoJSON);
  todoObj.forEach((todo) => {
    if (Number(target.id) !== Number(todo.id)) {
      todoArray.push(todo);
    }
  });
  console.log(todoArray);
  localStorage.setItem('todos', JSON.stringify(todoArray));
};

const saveTodo = (todo, i) => {
  const todoObj = { todo: todo, id: i };
  todoArray.push(todoObj);
  localStorage.setItem('todos', JSON.stringify(todoArray));
};

const loadTodo = () => {
  const todosJSON = localStorage.getItem('todos');
  if (todosJSON === '' || todosJSON === null) {
    return;
  }
  const todos = JSON.parse(todosJSON);
  todos.forEach((todo) => {
    addTodo(todo.todo, todo.id);
  });
};

form.addEventListener('submit', handleSubmit);
loadTodo();
