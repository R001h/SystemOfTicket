const taskMain = document.getElementById("taskMain");
const addJ = document.getElementById("add1");
const containerTask = document.getElementById("containerTask");
const prioritySelect = document.getElementById("prioritySelect");
const typeSelect = document.getElementById("typeSelect");
const eventDate = document.getElementById("eventDate");
const dateLabel = document.getElementById("dateLabel");

typeSelect.addEventListener("change", function() {
    if (typeSelect.value === "event") {
        eventDate.style.display = "inline";
        dateLabel.style.display = "inline";
    } else {
        eventDate.style.display = "none";
        dateLabel.style.display = "none";
    }
});

addJ.addEventListener("click", function() {
    const taskS = taskMain.value;
    const selectedType = typeSelect.value;
    const selectedPriority = prioritySelect.value;
    const eventDateValue = eventDate.value;

    if (taskS.trim() === "") {
        alert("Please introduce task or event.");
        return;
    }

    const divHijo = document.createElement("div");
    divHijo.classList.add("task-item");

    const ptask = document.createElement("p");
    ptask.classList.add("task-content");

    if (selectedType === "task") {
        ptask.innerHTML = "Task: " + taskS + " (Priority: " + selectedPriority + ")";
    } else {
        ptask.innerHTML = "Event: " + taskS + " (Date: " + eventDateValue + ")";
    }

    const btnDelete = document.createElement("button");
    btnDelete.innerHTML = "Delete";
    btnDelete.addEventListener("click", function() {
        containerTask.removeChild(divHijo);
        saveTasks();
    });

    const btnEdit = document.createElement("button");
    btnEdit.innerHTML = "Edit";
    btnEdit.addEventListener("click", function() {
        const newContent = prompt("Edit task/event:", taskS);
        if (newContent !== null) {
            ptask.innerHTML = (selectedType === "task" ? "Task: " : "Event: ") + newContent;
            taskMain.value = newContent;
            saveTasks();
        }
    });

    divHijo.appendChild(ptask);
    divHijo.appendChild(btnEdit);
    divHijo.appendChild(btnDelete);
    containerTask.appendChild(divHijo);

    taskMain.value = "";
    if (selectedType === "event") {
        eventDate.value = "";
    }
    saveTasks();
});

function saveTasks() {
    const tasks = [];
    const taskElements = containerTask.getElementsByClassName("task-item");
    for (let i = 0; i < taskElements.length; i++) {
        tasks.push({
            content: taskElements[i].querySelector(".task-content").textContent,
        });
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    for (let i = 0; i < savedTasks.length; i++) {
        const divHijo = document.createElement("div");
        divHijo.classList.add("task-item");

        const ptask = document.createElement("p");
        ptask.classList.add("task-content");
        ptask.innerHTML = savedTasks[i].content;

        const btnDelete = document.createElement("button");
        btnDelete.innerHTML = "Delete";
        btnDelete.addEventListener("click", function() {
            containerTask.removeChild(divHijo);
            saveTasks();
        });

        const btnEdit = document.createElement("button");
        btnEdit.innerHTML = "Edit";
        btnEdit.addEventListener("click", function() {
            const newContent = prompt("Edit task/event:", savedTasks[i].content);
            if (newContent !== null) {
                ptask.innerHTML = newContent;
                saveTasks();
            }
        });

        divHijo.appendChild(ptask);
        divHijo.appendChild(btnEdit);
        divHijo.appendChild(btnDelete);
        containerTask.appendChild(divHijo);
    }
}

// Load tasks on page load
loadTasks();