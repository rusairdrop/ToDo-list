let todoInput = document.querySelector('.todo_text');
let todoBtn = document.querySelector('.todo_btn');
let todo = document.querySelector('.todo');
let completed = document.querySelector('.completed');
let overlay = document.querySelector('.overlay');
let confirmModal = document.querySelector('.confirm_modal');
let confirmBtn = document.querySelector('.confirm_btn');
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

function addNewTask() {
  let newTodo = {
    id: Date.now(),
    todo: todoInput.value,
    checked: false,
  }
  
  todoList.unshift(newTodo);
  displayTodoList();
  displayControlsList()
  
  localStorage.setItem('todo', JSON.stringify(todoList));
  todoInput.value = '';
}

todoBtn.addEventListener('click', function () {
  if (!todoInput.value) return;
  addNewTask();
});

todoInput.addEventListener('keydown', function (e) {
  if (e.keyCode === 13 && todoInput.value) {
    addNewTask();
  }
});

function displayTodoList() {
  if (todoList.length === 0) todo.innerHTML = 'no active tasks';
  
  let displayTodo = '';
  todoList.map(function (item, index) {
    displayTodo += `
      <li class="todo_item" data-attr="todo_${index}">
        <input type="checkbox" data-attr="${index}" id="${item.id}" ${item.checked ? 'checked' : ''}>
        <label class="todo_label" for="${item.id}" style="${item.checked ? 'text-decoration: line-through' : ''}" >${item.todo}</label>
        <span class="btn_edit material-icons">edit</span>
        <span class="btn_delete material-icons" data-attr="todo_${index}">delete_forever</span>
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
        <input type="checkbox" data-attr="${index}" id="${item.id}" ${item.checked ? 'checked' : ''}>
        <label class="todo_label" for="${item.id}" style="${item.checked ? 'text-decoration: line-through' : ''}" >${item.todo}</label>
        <span class="btn_edit material-icons">edit</span>
        <span class="btn_delete material-icons" data-attr="completed_${index}">delete_forever</span>
      </li>
      `;
    completed.innerHTML = displayCompleted;
  });
}

function openModal() {
  overlay.classList.add('overlay_active');
  confirmModal.classList.add('confirm_modal_active');
}

function closeModal() {
  overlay.classList.remove('overlay_active');
  confirmModal.classList.remove('confirm_modal_active');
}

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('btn_delete')) {
    openModal();
    
    confirmBtn.onclick = () => {
      
      let listAttributes = event.target.getAttribute('data-attr').split('_');
      let listType = listAttributes[0];
      let index = parseInt(listAttributes[1]);
      
      if (listType === 'todo') {
        todoList.splice(index, 1);
      }
      
      if (listType === 'completed') {
        completedList.splice(index, 1);
      }
      
      displayTodoList();
      displayCompletedList();
      displayControlsList();
      
      localStorage.setItem('todo', JSON.stringify(todoList));
      localStorage.setItem('completed', JSON.stringify(todoList));
      
      closeModal();
    }
  }
});

todo.addEventListener('change', function (event) {
  let idInput = parseInt(event.target.getAttribute('id'));
  let forLabelTodo = todo.querySelector('[for="' + idInput + '"]');
  let DataAtr = event.target.getAttribute('data-attr');
  
  todoList.forEach(function (item) {
    
    if (item.id === idInput) {
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
  displayControlsList()
  localStorage.setItem('todo', JSON.stringify(todoList));
  localStorage.setItem('completed', JSON.stringify(completedList));
});

completed.addEventListener('change', function (event) {
  
  let idCompleted = parseInt(event.target.getAttribute('id'));
  let forLabelCompleted = completed.querySelector('[for="' + idCompleted + '"]');
  let DataAtr = event.target.getAttribute('data-attr');
  
  completedList.forEach(function (item) {
    if (item.id === idCompleted) {
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
  displayControlsList()
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

function displayControlsList() {
  for (let i = 0; i < controlsList.length; i++) {
    const controlsAttr = controlsList[i].getAttribute('data-ctrl');
    if (controlsAttr === 'ctrl_1') {
      controlsList[i].textContent = `All (${todoList.length + completedList.length})`
    }
    if (controlsAttr === 'ctrl_2') {
      controlsList[i].textContent = `Active (${todoList.length})`
    }
    if (controlsAttr === 'ctrl_3') {
      controlsList[i].textContent = `Completed (${completedList.length})`
    }
  }
}

displayControlsList();