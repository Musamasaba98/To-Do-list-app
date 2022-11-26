const date=document.querySelector("#date")
const btn=document.querySelector(".btn")
const lists=document.querySelector("#lists")
const input=document.querySelector("#text")
const form = document.querySelector("#form")
const edit =document.querySelector('.fa-pen-to-square')
const alert=document.querySelector('.alert')
let listItem=document.querySelector('#lists').childNodes;

//make the todo value to edit global
let currentEditValue=""
//array of todos
let todos=[]

//function that creates list element
let listElement=(todo_task)=>{
    let task=document.createElement('li');
    let icons=document.createElement('div')
    let editInput=document.createElement('input')
    editInput.setAttribute('type', 'text');
    editInput.className = "editInput";
    let button=document.createElement('button')
    button.className = "editBtn";
    button.innerHTML="Edit"
    icons.innerHTML='<i class="fa-regular fa-pen-to-square"></i>'
    icons.innerHTML+='<i class="fa-solid fa-trash-can"></i>'
    task.classList.add('list-item')
    lists.appendChild(task);
    task.textContent=todo_task;
    task.appendChild(editInput)
    task.appendChild(button)
    task.appendChild(icons);
    input.value=""
}

//button functionality
const add=()=>{
      input.addEventListener('input',()=>{
        alert.style.display='none';
      })
      btn.addEventListener('click',()=>{
      if (input.value==="") {
        alert.innerHTML = "Add Task";
        alert.style.display='block';
      }else{
        //conver input value to sentence case
        (function () {
          let stringToConvert = input.value;
          stringToConvert = stringToConvert
            .toLowerCase()
            .replace(/(^|\s)\S/g, (L) => L.toUpperCase());
          if (!todos.includes(stringToConvert)) {
            todos.push(stringToConvert);
            listElement(todos[todos.length - 1]);
          } else {
            alert.innerHTML = "Task already added";
            alert.style.display = "block";
          }
        })();
       
      } 
})  
}
//edit todo
lists.addEventListener('click',(e)=>{
    if (e.target.classList.contains("fa-pen-to-square")) {
        const text=e.target.parentElement.parentElement.childNodes[1]
        let editInput=e.target.parentElement.parentElement.childNodes[1]
        let button=e.target.parentElement.parentElement.childNodes[2]
        editInput.style.display="block";
        button.style.display="block"
        editInput.value=e.target.parentElement.parentElement.childNodes[0].textContent
        e.target.parentElement.parentElement.childNodes[0].textContent=""
        currentEditValue=text.value
    }
})
lists.addEventListener('click',(e)=>{
    if (e.target.classList.contains("editBtn")){
        let editInput=e.target.parentElement.childNodes[1]
        let button=e.target.parentElement.childNodes[2]
        if (editInput.value!=="") {
           let value=editInput.value;
           value=value
           .toLowerCase()
           .replace(/(^|\s)\S/g, (L) => L.toUpperCase());
           e.target.parentElement.childNodes[0].textContent=value;
           editInput.style.display="none";
           button.style.display="none"
           let index=todos.indexOf(currentEditValue)
           todos.splice(index,1,value)
        }   
    }
})
//remove todo
lists.addEventListener('click',(e)=>{
    if (e.target.classList.contains("fa-trash-can")) {
        let text=e.target.parentElement.parentElement.innerText
        let index=todos.indexOf(text);
        todos.splice(index,1)
        e.target.parentElement.parentElement.remove()
    }
})
//completed tasks

//Date functionality
const newDate=()=>{
   let today=new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let dayId =today.getDay()
    switch (dayId) {
        case 0:
          day = "Sunday";
          break;
        case 1:
          day = "Monday";
          break;
        case 2:
          day = "Tuesday";
          break;
        case 3:
          day = "Wednesday";
          break;
        case 4:
          day = "Thursday";
          break;
        case 5:
          day = "Friday";
          break;
        case 6:
          day = "Saturday";
      }

today = `${dd}/${mm}/${yyyy}-${day.slice(0,3)}`;
date.innerHTML=today; 
}
newDate()
add()
/// Change functionality of Enter Key
input.addEventListener('keyup', (e)=>{
    if (e.keyCode === 13) {
        document.querySelector(".btn").click() 
    }
})
/// prevent the form default command/refresh
form.addEventListener('submit',(e)=>{
    e.preventDefault();
})