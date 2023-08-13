'use strict'
import { addEventListenersForOneTask, tasksBox } from "./main.js";
import { saveSession } from "./session.js";


export const addTask = (taskClasses = 'task', content = '', checkClasses = 'fa-check fa-solid') => {
    const task = createOneTask(taskClasses, content, checkClasses);
    tasksBox.appendChild(task);
    addEventListenersForOneTask();
    saveSession();
}

function createOneTask(taskClasses = 'task',  content = '', checkClasses = 'fa-check fa-solid'){
    const addMultipleClasses = (string, element) => string.split(' ').forEach(singleClass => element.classList.add(singleClass));
    const task = document.createElement('div');
    addMultipleClasses(taskClasses, task);
    task.setAttribute('draggable', 'true');
    const checkBox = document.createElement('div')
    checkBox.classList.add('check-box');
    const i = document.createElement('i');
    addMultipleClasses(checkClasses, i);
    checkBox.appendChild(i);
    const pInput = document.createElement('p');
    pInput.contentEditable = 'true'
    pInput.classList.add('text-content');
    pInput.setAttribute('data-placeholder', 'type here...')
    pInput.textContent = content;
    const deleteBtn = document.createElement('p');
    deleteBtn.classList.add('delete-task')
    deleteBtn.innerText = 'x'; 
    task.appendChild(checkBox) 
    task.appendChild(pInput) 
    task.appendChild(deleteBtn) 
    return task; 
}


