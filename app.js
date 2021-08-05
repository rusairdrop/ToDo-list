let todoInput = document.querySelector('.todo_text');
let todoBtn = document.querySelector('.todo_btn');
let todo = document.querySelector('.todo');
let todoList = [];

if (localStorage.getItem('todo')) {
  todoList = JSON.parse(localStorage.getItem('todo'));
  displayTodoList();
}

todoBtn.addEventListener('click', function () {
  if (!todoInput.value) return;
  
  let newTodo = {
    todo: todoInput.value,
    checked: false,
  }
  
  todoList.push(newTodo);
  displayTodoList();
  
  localStorage.setItem('todo', JSON.stringify(todoList));
  
  todoInput.value = '';
});

function displayTodoList() {
  if (todoList.length === 0) todo.innerHTML = '';
  
  let displayTodo = '';
  todoList.map(function (item, index) {
    displayTodo += `
      <li class="todo_item" data-attr="${index}">
        <input type="checkbox" id="item_${index}" ${item.checked ? 'checked' : ''}>
        <label for="item_${index}">${item.todo}</label>
        <img class="btn_close" src="./img/close.svg" alt="" data-attr="${index}">
      </li>
      `;
    
    todo.innerHTML = displayTodo;
  });
}

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('btn_close')) {
    let btnAttr = event.target.getAttribute('data-attr');
    
    todoList.forEach(function (item, index) {
      
      if (index === +btnAttr) {
        todoList.splice(index, 1);
      }
      displayTodoList();
    });
  }
});