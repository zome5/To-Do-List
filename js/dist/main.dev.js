'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentElement = getCurrentElement;
exports.addEventListenersForOneTask = exports.tasksBox = void 0;

var _session = require("./session.js");

var _tasksObjects = require("./tasks-objects.js");

var _quote = require("./quote.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var tasksBox = document.querySelector('.tasks');
exports.tasksBox = tasksBox;
var addButton = document.querySelector('.add-task');

var setEventsListeners = function setEventsListeners() {
  addButton.addEventListener('click', function () {
    (0, _tasksObjects.addTask)();
  });
  tasksBox.addEventListener('input', (0, _session.saveSession)());
};

var draggingEvents = function draggingEvents() {
  var currentTask = getCurrentElement('task');
  currentTask.addEventListener('dragstart', function (e) {
    e.target.classList.add('dragging');
  });
  currentTask.addEventListener('dragend', function (e) {
    e.target.classList.remove('dragging');
  });

  var getDragAfterEle = function getDragAfterEle(y) {
    var stillTasks = Array.from(document.querySelectorAll('.task:not(.dragging)'));
    return stillTasks.reduce(function (result, child) {
      var box = child.getBoundingClientRect();
      var offset = y - box.top;

      if (offset < 0 && offset > result.offset) {
        return {
          offset: offset,
          element: child
        };
      } else {
        return result;
      }
    }, {
      offset: Number.NEGATIVE_INFINITY
    }).element;
  };

  tasksBox.addEventListener('dragover', function _callee(e) {
    var dragging, afterElement;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            e.preventDefault();
            dragging = document.querySelector('.dragging');
            afterElement = getDragAfterEle(e.clientY);

            if (afterElement === undefined) {
              tasksBox.appendChild(dragging);
              setTimeout(_session.saveSession, 0);
            } else {
              tasksBox.insertBefore(dragging, afterElement);
              setTimeout(_session.saveSession, 0);
            }

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  });
};

var addEventListenersForOneTask = function addEventListenersForOneTask() {
  var currentDeleteButton = getCurrentElement('delete-task');
  var currentCheckButton = getCurrentElement('check-box');
  var currentTaskDiv = getCurrentElement('task');
  var currentCheckMark = getCurrentElement('fa-check');
  var currentText = getCurrentElement('text-content');
  currentDeleteButton.addEventListener('click', function () {
    var undoButton = document.querySelector('button.undo');
    var textContentforUndo = currentText.textContent;
    var taskClassesForUndo = currentDeleteButton.parentElement.classList;
    var checkMarkClassesForUndo = currentCheckMark.classList;
    var copyForUndo = {
      innerHTML: textContentforUndo,
      classes: [_toConsumableArray(taskClassesForUndo), _toConsumableArray(checkMarkClassesForUndo)]
    };
    sessionStorage.setItem('undo', JSON.stringify(copyForUndo));
    console.log(copyForUndo);
    currentDeleteButton.parentNode.remove();

    if (undoButton.classList.contains('hidden')) {
      undoButton.classList.remove('hidden');
      setUndoButton();
    }

    (0, _session.saveSession)();
  });
  currentCheckButton.addEventListener('click', function () {
    currentTaskDiv.classList.toggle('task-done');
    currentCheckMark.classList.toggle('task-done-check-mark');
    (0, _session.saveSession)();
  });
  currentTaskDiv.addEventListener('input', function () {
    (0, _session.saveSession)();
  });
  draggingEvents();
}; // execution: 


exports.addEventListenersForOneTask = addEventListenersForOneTask;

if (localStorage.getItem('session0')) {
  window.onload = (0, _session.restoreSession)();
} else {
  (0, _tasksObjects.addTask)();
}

setEventsListeners();
(0, _quote.getQuote)(); /// small functions: 

function setUndoButton() {
  var undoButton = document.querySelector('button.undo');
  undoButton.addEventListener('click', undoEvent);
  return undoButton;
}

function undoEvent() {
  var undoButton = document.querySelector('button.undo');
  var getContentForUndo = sessionStorage.getItem('undo');
  var JSONUndo = JSON.parse(getContentForUndo);
  var taskClassListString = JSONUndo.classes[0].toString().replace(/,/g, ' ');
  var checkMarkClassListString = JSONUndo.classes[1].toString().replace(/,/g, ' ');
  (0, _tasksObjects.addTask)(taskClassListString, JSONUndo.innerHTML, checkMarkClassListString);
  undoButton.classList.add('hidden');
}

function getCurrentElement(className) {
  var allElementsWithThisClass = document.querySelectorAll(".".concat(className));
  var arrayLength = allElementsWithThisClass.length;
  var currentElement = allElementsWithThisClass[arrayLength - 1];
  return currentElement;
}