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

  editInput.type = "text";
  editInput.className = "task";

  editButton.innerText = "Edit";
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

function addTask() {
  console.log("Add Task...");
  //Create a new list item with the text from the #new-task:
  if (!newTask.value) return;
  let listItem = createNewTask(newTask.value);

  //Append listItem to incompleteTaskHolder
  notCompletedTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  newTask.value = "";
}

//Edit an existing task.

function editTask() {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  let listItem = this.parentNode;

  let editInput = listItem.querySelector("input[type=text]");
  let label = listItem.querySelector("label");
  let editBtn = listItem.querySelector(".edit");
  let containsClass = listItem.classList.contains("edit-mode");
  //If class of the parent is .editmode
  if (containsClass) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle("edit-mode");
}

//Delete task.
function deleteTask() {
  console.log("Delete Task...");

  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
}

//Mark task completed
function taskCompleted() {
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  let listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

function taskIncomplete() {
  console.log("Incomplete Task...");
  let listItem = this.parentNode;
  notCompletedTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  //select ListItems children
  let checkBox = taskListItem.querySelector("input[type=checkbox]");
  let editButton = taskListItem.querySelector("button.edit");
  let deleteButton = taskListItem.querySelector("button.delete");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < notCompletedTaskHolder.children.length; i++) {
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(notCompletedTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
