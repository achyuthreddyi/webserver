// const clickbutton = document.getElementById("clickbutton")

// clickbutton.addEventListener("click" ,() =>{
//     alert("working here!!!!!")
// })

// selectors
const todoInput = document.querySelector('.todo-input');
const todobutton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filteroption = document.querySelector('.filter-todo')
// event listeners
document.addEventListener('DOMContentLoaded',gettodos)
todobutton.addEventListener('click',addTodo)
todoList.addEventListener('click',deletecheck)
filteroption.addEventListener('click',filertodo)


// functions
function addTodo(event){
    //  prevent form from submitting
    event.preventDefault()
    console.log(todoInput.value);    
    // todo div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add("todo")
    //  create li
    const newtodo = document.createElement('li');
    newtodo.innerText = todoInput.value;
    // add todo to local storage
    savelocaltodo(todoInput.value)
    newtodo.classList.add('todo-item');
    todoDiv.appendChild(newtodo);
    //  complted and delete button
    const completed = document.createElement('button')   
    completed.innerHTML = '<i class = "fas fa-check"></i> '
    completed.classList.add("complete-btn")
    todoDiv.appendChild(completed)
    // delete button
    const deletebutton = document.createElement('button')   
    deletebutton.innerHTML = '<i class = "fas fa-trash"></i> '
    deletebutton.classList.add("trash-btn")
    todoDiv.appendChild(deletebutton)
    //  append to list
    todoList.appendChild(todoDiv);
    clearTodo()
}
//  clear the input fields
function clearTodo(){
    todoInput.value = ''
}
function deletecheck(e){
    // e.preventDefault()
    // console.log(e.target);
    const item = e.target
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        console.log(item.parentElement);
        //  add animation
        todo.classList.add("fall")   
        removelocaltodo(todo)
                     
        todo.addEventListener('transitionend',function(){
            todo.remove()

        })
    }
    if(item.classList[0] === "complete-btn"){
        // console.log(item.parentElement);
        const todo = item.parentElement;
        todo.classList.toggle('completed')             
    }
      

}

function filertodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                    if(todo.classList.contains('completed')){
                        todo.style.display = 'flex';
                    }
                    else{
                        todo.style.display="none"
                    }
                    break;
            case "uncompleted":
                if (!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display="none"
                }
                break;
                    
        }
    })
}

function savelocaltodo(todo){
    let todos;
    if(localStorage.getItem('todos')=== null){
        todos =[];

    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos',JSON.stringify(todos))
      
}

function gettodos(){
    let todos;
    if(localStorage.getItem('todos')=== null){
        todos =[];

    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function(todo){

                // todo div
            const todoDiv = document.createElement('div')
            todoDiv.classList.add("todo")
            //  create li
            const newtodo = document.createElement('li');
            newtodo.innerText = todo;
         
            newtodo.classList.add('todo-item');
            todoDiv.appendChild(newtodo);
            //  complted and delete button
            const completed = document.createElement('button')   
            completed.innerHTML = '<i class = "fas fa-check"></i> '
            completed.classList.add("complete-btn")
            todoDiv.appendChild(completed)
            // delete button
            const deletebutton = document.createElement('button')   
            deletebutton.innerHTML = '<i class = "fas fa-trash"></i> '
            deletebutton.classList.add("trash-btn")
            todoDiv.appendChild(deletebutton)
            //  append to list
            todoList.appendChild(todoDiv);
            // clearTodo()

    

    })

}

function removelocaltodo(todo){
    let todos;
    if(localStorage.getItem('todos')=== null){
        todos =[];

    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos',JSON.stringify(todos))
    

}