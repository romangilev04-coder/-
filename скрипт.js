document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("task-form");
  const titleInput = document.getElementById("task-title");
  const descInput = document.getElementById("task-desc");
  const taskList = document.getElementById("task-list");

  // Загружаем задачи из localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // --- ФУНКЦИЯ СОЗДАНИЯ КАРТОЧКИ ---
  function createTaskCard(task, index) {
    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");

    const content = document.createElement("div");
    content.classList.add("task-content");

    const taskTitle = document.createElement("h3");
    taskTitle.textContent = task.title;

    const taskDesc = document.createElement("p");
    taskDesc.textContent = task.desc;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Удалить";
    deleteBtn.classList.add("delete-btn");

    // Удаление задачи
    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    });

    content.appendChild(taskTitle);
    if (task.desc) content.appendChild(taskDesc);
    taskCard.appendChild(content);
    taskCard.appendChild(deleteBtn);

    return taskCard;
  }

  // --- ОТРИСОВКА ВСЕХ ЗАДАЧ ---
  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const card = createTaskCard(task, index);
      taskList.appendChild(card);
    });
  }

  // --- ДОБАВЛЕНИЕ НОВОЙ ЗАДАЧИ ---
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const desc = descInput.value.trim();

    if (!title) {
      alert("Введите название задачи!");
      return;
    }

    const newTask = { title, desc };
    tasks.push(newTask);

    // Сохраняем
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Перерисовываем
    renderTasks();

    form.reset();
  });

  // Рисуем задачи при загрузке
  renderTasks();
});
