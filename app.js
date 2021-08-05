let todoInput = document.querySelector('.todo_text');
let todoBtn = document.querySelector('.todo_btn');
let todo = document.querySelector('.todo');

let todoList = [];

todoBtn.addEventListener('click', function () {
  if (!todoInput.value) return;
  
  let newTodo = {
    todo: todoInput.value,
    checked: false,
  }
  todoList.push(newTodo);
  
  displayTodoList()
  
  todoInput.value = '';
});

function displayTodoList() {
  let displayTodo = '';
  todoList.map(function (item, index){
    displayTodo += `
      <li>
        <input type="checkbox" id="item_${index}">
        <label for="item_${index}">${item.todo}</label>
      </li>
    `;
    todo.innerHTML = displayTodo;
    console.log(displayTodo);
  });
}
