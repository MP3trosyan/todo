let addMessage = document.querySelector(".todo_input")
let addButton = document.querySelector(".accept_btn")
let todo = document.querySelector(".todo")
// let closButton = document.querySelector(".close")

let todoList = []

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}

addButton.addEventListener('click', () => {
    let newTodo = {
        todo: addMessage.value,
        checked: false,
    }

    if(newTodo.todo) {
        todoList.push(newTodo)
    }

    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
})

function displayMessages() {
    let showMessage = ""
    todoList.forEach((item, i) => {
        showMessage += `
        <li>
            <input type="checkbox" id="item_${i}" ${item.checked ? 'checked' : ""}>
            <label for="item_${i}">${item.todo}</label>
            <button class="close">x</button>
        </li>
        `;  
        todo.innerHTML = showMessage;  
    });
}

todo.addEventListener('change', (event) => {
    let inputId = event.target.getAttribute('id')
    let valueOfLabel = todo.querySelector('[for=' + inputId + ']').innerHTML

    todoList.forEach(item => {
        if(item.todo === valueOfLabel) {
            item.checked = !item.checked
            localStorage.setItem('todo', JSON.stringify(todoList))
        }
    })
})