;(() => {
  "use strict";
  /**
   * @typedef TodoTask
   * @property {string} id
   * @property {string} name
   */

  /**
   * @type HTMLElement
   */
  const main = document.querySelector("main");
  /**
   * @type HTMLFormElement
   */
  const todoForm = main.querySelector(".todoform");
  /**
   * @type HTMLInputElement
   */
  const todoInput = todoForm.querySelector("#todoinput");
  /**
   * @type HTMLUListElement
   */
  const todoList = main.querySelector(".todolist");
  const state = {
    taskName: "",
    /**
     * @type TodoTask[]
     */
    tasks: [
      { name: "Learn some frameworks!",
        id: "todo-0",
      },
      { name: "Looooooooooooooooooooooooooooooooooooooooooooooooooooooooong taaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaask naaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaame",
        id: "todo-134",
      }
    ]
  };

  todoInput.addEventListener("change", handleInputChange);
  todoForm.addEventListener("submit", handleFormSubmit);

  renderInput();
  renderTodoList();

  function handleInputChange(e) {
    state.taskName = e.target.value;
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    state.tasks = [...state.tasks, createTask(state.taskName)];
    state.taskName = "";
    renderInput();
    renderTodoList();

    function createTask(name) {
    
      return {
        name,
        id: buildUniqueId("todo")
      };
  
      function buildUniqueId(prefix = "prefix") {
  
        return prefix + "-" + Math.floor(Math.random() * Date.now());
  
      }
    }
  }

  function renderInput() {
    todoInput.value = state.taskName;
  }

  function renderTodoList() {
    const frag = document.createDocumentFragment();

    state.tasks.forEach((task) => {
      const item = buildTodoItemEl(task);
      frag.appendChild(item);
    });

    while (todoList.lastChild) {
      todoList.removeChild(todoList.lastChild);
    }
    todoList.appendChild(frag);

    /**
     * 
     * @param {TodoTask} todoTask
     */
    function buildTodoItemEl({id, name}) {
      const item = document.createElement("li");
      const span = document.createElement("span");
      const textContent = document.createTextNode(name);
  
      span.appendChild(textContent);
  
      item.id = id;
      item.appendChild(span);
      item.appendChild(buildDeleteButtonEl(id));
  
      return item;

      function buildDeleteButtonEl(id) {
        const button = document.createElement("button");
        const textContent = document.createTextNode("Delete");
    
        button.setAttribute("type", "button");
        button.addEventListener("click", handleTodoDeleteButtonClick.bind(null, id));
        button.appendChild(textContent);
    
        return button;
    
        function handleTodoDeleteButtonClick(id) {
          state.tasks = state.tasks.filter((t) => t.id !== id);
          renderTodoList();
        }
      }
    }
  }

  

  

})();