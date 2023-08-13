'use strict'
import {
    saveSession,
    restoreSession
} from "./session.js"
import {
    addTask
} from "./tasks-objects.js"
import {
    getQuote
} from "./quote.js"

export const tasksBox = document.querySelector('.tasks')
const addButton = document.querySelector('.add-task')


const setEventsListeners = () => {
    addButton.addEventListener('click', () => {
        addTask()
    })
    tasksBox.addEventListener('input', saveSession());
}
const draggingEvents = () => {
    const currentTask = getCurrentElement('task');
    currentTask.addEventListener('dragstart', (e) => {
        e.target.classList.add('dragging')
    })
    currentTask.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragging')
    })

    const getDragAfterEle = (y) => {
        const stillTasks = Array.from(document.querySelectorAll('.task:not(.dragging)'));
        return stillTasks.reduce((result, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - (box.top);
            if (offset < 0 && offset > result.offset) {
                return {
                    offset: offset,
                    element: child
                }
            } else {
                return result
            }
        }, {
            offset: Number.NEGATIVE_INFINITY
        }).element
    }

    tasksBox.addEventListener('dragover', async (e) => {
        e.preventDefault();
        const dragging = document.querySelector('.dragging')
        const afterElement = getDragAfterEle(e.clientY)
        if (afterElement === undefined) {
            tasksBox.appendChild(dragging);
            setTimeout(saveSession, 0)
        } else {
            tasksBox.insertBefore(dragging, afterElement);
            setTimeout(saveSession, 0)
        }
    })

}
export const addEventListenersForOneTask = () => {
    const currentDeleteButton = getCurrentElement('delete-task');
    const currentCheckButton = getCurrentElement('check-box');
    const currentTaskDiv = getCurrentElement('task');
    const currentCheckMark = getCurrentElement('fa-check');
    const currentText = getCurrentElement('text-content')

    currentDeleteButton.addEventListener('click', () => {
        const undoButton = document.querySelector('button.undo');
        const textContentforUndo = currentText.textContent;
        const taskClassesForUndo = currentDeleteButton.parentElement.classList;
        const checkMarkClassesForUndo = currentCheckMark.classList
        const copyForUndo = {
            innerHTML: textContentforUndo,
            classes: [
                [...taskClassesForUndo],
                [...checkMarkClassesForUndo]
            ]
        }
        sessionStorage.setItem('undo', JSON.stringify(copyForUndo));
        console.log(copyForUndo);
        currentDeleteButton.parentNode.remove();

        if (undoButton.classList.contains('hidden')) {
            undoButton.classList.remove('hidden')
            setUndoButton();
        }
        saveSession();
    })
    currentCheckButton.addEventListener('click', () => {
        currentTaskDiv.classList.toggle('task-done');
        currentCheckMark.classList.toggle('task-done-check-mark')
        saveSession();
    })
    currentTaskDiv.addEventListener('input', () => {
        saveSession();
    })
    draggingEvents();
}


// execution: 
if (localStorage.getItem('session0')) {
    window.onload = restoreSession();

} else {
    addTask();
}
setEventsListeners();
getQuote();


/// small functions: 


function setUndoButton() {
    const undoButton = document.querySelector('button.undo');
    undoButton.addEventListener('click', undoEvent)
    return undoButton;
}

function undoEvent() {
    const undoButton = document.querySelector('button.undo');
    const getContentForUndo = sessionStorage.getItem('undo');
    const JSONUndo = JSON.parse(getContentForUndo);
    const taskClassListString = JSONUndo.classes[0].toString().replace(/,/g, ' ')
    const checkMarkClassListString = JSONUndo.classes[1].toString().replace(/,/g, ' ')
    addTask(taskClassListString, JSONUndo.innerHTML, checkMarkClassListString);


    undoButton.classList.add('hidden');
}

export function getCurrentElement(className) {
    const allElementsWithThisClass = document.querySelectorAll(`.${className}`)
    const arrayLength = allElementsWithThisClass.length
    const currentElement = allElementsWithThisClass[arrayLength - 1];

    return currentElement
}