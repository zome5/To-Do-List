'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addTask = void 0;

var _main = require("./main.js");

var _session = require("./session.js");

var addTask = function addTask() {
  var taskClasses = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'task';
  var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var checkClasses = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'fa-check fa-solid';
  var task = createOneTask(taskClasses, content, checkClasses);

  _main.tasksBox.appendChild(task);

  (0, _main.addEventListenersForOneTask)();
  (0, _session.saveSession)();
};

exports.addTask = addTask;

function createOneTask() {
  var taskClasses = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'task';
  var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var checkClasses = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'fa-check fa-solid';
  var task = document.createElement('div');

  var addMultipleClasses = function addMultipleClasses(string, element) {
    return string.split(' ').forEach(function (singleClass) {
      return element.classList.add(singleClass);
    });
  };

  addMultipleClasses(taskClasses, task);
  task.setAttribute('draggable', 'true');
  var checkBox = document.createElement('div');
  checkBox.classList.add('check-box');
  var i = document.createElement('i');
  addMultipleClasses(checkClasses, i);
  checkBox.appendChild(i);
  var pInput = document.createElement('p');
  pInput.contentEditable = 'true';
  pInput.classList.add('text-content');
  pInput.setAttribute('data-placeholder', 'type here...');
  pInput.textContent = content;
  var deleteBtn = document.createElement('p');
  deleteBtn.classList.add('delete-task');
  deleteBtn.innerText = 'x';
  task.appendChild(checkBox);
  task.appendChild(pInput);
  task.appendChild(deleteBtn);
  return task;
}