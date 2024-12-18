const newTask = document.getElementById("new-task");
const addButton = document.getElementById("add-button");
const notCompletedTaskHolder = document.getElementById("not-completed-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");

//New task list item
function createNewTask(taskString) {
  let listItem = document.createElement("li");
  let checkBox = document.createElement("input");
  let label = document.createElement("label");
  let editInput = document.createElement("input");
  let editButton = document.createElement("button");
  let deleteButton = document.createElement("button");
  let deleteButtonImg = document.createElement("img");

  label.innerText = taskString;
  label.className = "task";

  checkBox.type = "checkbox";
  checkBox.className = "type-checkbox";

  editInput.type = "text";
  editInput.className = "task type-text";

  editButton.innerText = "Edit";
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.className = "remove-img";
  deleteButton.appendChild(deleteButtonImg);
  listItem.className = "list-item";
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

function addTask() {
  if (!newTask.value) return;
  let listItem = createNewTask(newTask.value);

  notCompletedTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  newTask.value = "";
}

function editTask() {
  let listItem = this.parentNode;
  let editInput = listItem.querySelector(".type-text");
  let label = listItem.querySelector("label");
  let editBtn = listItem.querySelector(".edit");
  let containsClass = listItem.classList.contains("edit-mode");

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("edit-mode");
}

function deleteTask() {
  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  ul.removeChild(listItem);
}

function taskCompleted() {
  let listItem = this.parentNode;
  listItem.querySelector(".task").classList.add("completed-task");
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

function taskIncomplete() {
  let listItem = this.parentNode;
  listItem.querySelector(".task").classList.remove("completed-task");
  notCompletedTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  let checkBox = taskListItem.querySelector(".type-checkbox");
  let editButton = taskListItem.querySelector("button.edit");
  let deleteButton = taskListItem.querySelector("button.delete");

  editButton.addEventListener("click", editTask);
  deleteButton.addEventListener("click", deleteTask);

  checkBox.onchange = checkBoxEventHandler;
}

addButton.addEventListener("click", addTask);

for (let i = 0; i < notCompletedTaskHolder.children.length; i++) {
  bindTaskEvents(notCompletedTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
