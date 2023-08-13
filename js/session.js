'use strict'

import { addTask } from "./tasks-objects.js";
import { getCurrentElement } from "./main.js";

export const saveSession = () => {
    const allTextContents = Array.from(document.querySelectorAll('.text-content'));
    const allTasksTexts = allTextContents.map(task => task.textContent); // <- zwraca tablice stringów z tekstem z inputu 1
    const allTasks = Array.from(document.querySelectorAll('.task'));
    const tasksClasses = allTasks.map(task => task.classList); // <- zwraca tablice stringów z klasami 2 
    const allCheckMarks = Array.from(document.querySelectorAll('.fa-check'));
    const checkMarksClasses = allCheckMarks.map(checkMark => checkMark.classList) // <- zwraca tablicę stringów z klasami 3 

    const session = {
       tasksInnerText: allTasksTexts,
       myTasksClasses: tasksClasses,
       myCheckMarksClasses: checkMarksClasses,
    }

    const sessionJSON = JSON.stringify(session);
    localStorage.setItem('session0', sessionJSON);
}

export const restoreSession = () => { 
    const getSession = JSON.parse(localStorage.getItem('session0'));
    const sessionTasksClasses = getSession.myTasksClasses;
    const sessionCheckClasses = getSession.myCheckMarksClasses;
    const sessionInnerTexts = getSession.tasksInnerText;
    const getTaskClasses = (index) =>  Object.values(sessionTasksClasses[index]);
    const getCheckMarkClasses = (index) => Object.values(sessionCheckClasses[index]);
    const getInnerTexts = (index) => sessionInnerTexts[index];
    if (sessionTasksClasses[0] === undefined) return; // <- prevents this function
    // from trying to restore empty session
    sessionTasksClasses.forEach((_, index) => {
        addTask();
        const currentTask = getCurrentElement('task');
        const currentCheck = getCurrentElement('fa-check');
        const currentText = getCurrentElement('text-content');
        const classesForTask = getTaskClasses(index);
        const classesForTaskStr = classesForTask.toString().replace(/,/g, ' ');
        const classesForCheck = getCheckMarkClasses(index);
        const classesForCheckStr = classesForCheck.toString().replace(/,/g, ' ');
        currentTask.classList = classesForTaskStr;
        currentCheck.classList = classesForCheckStr;
        currentText.textContent = getInnerTexts(index);
    })
}