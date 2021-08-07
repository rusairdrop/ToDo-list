let todoInput = document.querySelector('.todo_text');
let todoBtn = document.querySelector('.todo_btn');
let todo = document.querySelector('.todo');
let completed = document.querySelector('.completed');
let todoList = [];
let completedList = [];

if (localStorage.getItem('todo')) {
  todoList = JSON.parse(localStorage.getItem('todo'));
  displayTodoList();
}
if (localStorage.getItem('completed')) {
  completedList = JSON.parse(localStorage.getItem('completed'));
  displayCompletedList();
}

todoBtn.addEventListener('click', function () {
  if (!todoInput.value) return;
  
  let newTodo = {
    todo: todoInput.value,
    checked: false,
  }
  
  todoList.unshift(newTodo);
  displayTodoList();
  
  localStorage.setItem('todo', JSON.stringify(todoList));
  
  todoInput.value = '';
});

function displayTodoList() {
  if (todoList.length === 0) todo.innerHTML = 'нет активных задач';
  
  let displayTodo = '';
  todoList.map(function (item, index) {
    displayTodo += `
      <li class="todo_item" data-attr="todo_${index}">
        <input type="checkbox" data-attr="${index}" id="todo_${index}" ${item.checked ? 'checked' : ''}>
        <label class="todo_label" for="todo_${index}" style="${item.checked ? 'text-decoration: line-through' : ''}" >${item.todo}</label>
        <img class="btn_close" src="./img/close.svg" alt="" data-attr="todo_${index}">
      </li>
      `;
    
    todo.innerHTML = displayTodo;
  });
}

function displayCompletedList() {
  if (completedList.length === 0) completed.innerHTML = '';
  
  let displayCompleted = '';
  completedList.map(function (item, index) {
    displayCompleted += `
      <li class="todo_item" data-attr="completed_${index}">
        <input type="checkbox" data-attr="${index}" id="completed_${index}" ${item.checked ? 'checked' : ''}>
        <label class="todo_label" for="completed_${index}" style="${item.checked ? 'text-decoration: line-through' : ''}" >${item.todo}</label>
        <img class="btn_close" src="./img/close.svg" alt="" data-attr="completed_${index}">
      </li>
      `;
    completed.innerHTML = displayCompleted;
  });
  
}

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('btn_close')) {
    let btnAttr = event.target.getAttribute('data-attr');
    
    todoList.forEach(function (item, index) {
      
      if ('todo_' + index === btnAttr) {
        todoList.splice(index, 1);
      }
      displayTodoList();
      localStorage.setItem('todo', JSON.stringify(todoList));
    });
    
    completedList.forEach(function (item, index) {
      
      if ('completed_' + index === btnAttr) {
        completedList.splice(index, 1);
      }
      displayCompletedList();
      localStorage.setItem('completed', JSON.stringify(completedList));
    });
  }
});

todo.addEventListener('change', function (event) {
  let idInput = event.target.getAttribute('id');
  let forLabelTodo = todo.querySelector('[for="' + idInput + '"]');
  let valueLabelTodo = forLabelTodo.innerHTML;
  let DataAtr = event.target.getAttribute('data-attr');
  
  todoList.forEach(function (item) {
    
    if (item.todo === valueLabelTodo) {
      item.checked = !item.checked
    }
    
    localStorage.setItem('todo', JSON.stringify(todoList));
  });
  
  if (event.target.checked) {
    forLabelTodo.style.textDecoration = 'line-through'
    completedList.unshift(todoList.splice(DataAtr, 1)[0]);
  }
  
  displayTodoList();
  displayCompletedList();
  localStorage.setItem('todo', JSON.stringify(todoList));
  localStorage.setItem('completed', JSON.stringify(completedList));
});

completed.addEventListener('change', function (event) {
  
  let idCompleted = event.target.getAttribute('id');
  let forLabelCompleted = completed.querySelector('[for="' + idCompleted + '"]');
  let valueLabelCompleted = forLabelCompleted.innerHTML;
  let DataAtr = event.target.getAttribute('data-attr');
  
  completedList.forEach(function (item) {
    if (item.todo === valueLabelCompleted) {
      item.checked = !item.checked
    }
    
    localStorage.setItem('completed', JSON.stringify(completedList));
  });
  
  if (!event.target.checked) {
    forLabelCompleted.style.textDecoration = ''
    todoList.push(completedList.splice(DataAtr, 1)[0]);
    forLabelCompleted.style.textDecoration = 'line-through'
  }
  
  localStorage.setItem('todo', JSON.stringify(todoList));
  localStorage.setItem('completed', JSON.stringify(completedList));
  displayTodoList();
  displayCompletedList();
});


const controlsList = document.querySelectorAll('.controls_item');

for (let i = 0; i < controlsList.length; i++) {
  
  controlsList[i].onclick = function () {
    
    for (let k = 0; k < controlsList.length; k++) {
      controlsList[k].classList.remove('controls_item_active');
    }
    this.classList.add('controls_item_active');
    
    const controlsAttr = this.getAttribute('data-ctrl');
    
    if (controlsAttr === 'ctrl_1') {
      todo.classList.add('todo_active');
      completed.classList.add('completed_active', 'completed_active_border');
    }
    if (controlsAttr === 'ctrl_2') {
      todo.classList.add('todo_active');
      completed.classList.remove('completed_active');
    }
    if (controlsAttr === 'ctrl_3') {
      todo.classList.remove('todo_active');
      completed.classList.remove('completed_active_border');
      completed.classList.add('completed_active');
    }
  }
}