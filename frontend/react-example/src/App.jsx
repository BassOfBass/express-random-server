import { useEffect, useRef, useState } from "react";

import { TodoTask } from "src";
import { FilterButton } from "src/components/FilterButton";
import { Form } from "src/components/Form";
import { TodoItem } from "src/components/Todo.jsx"
import { usePrevious } from "src/custom-hooks/usePrevious";

const FILTER_MAP = {
  All: () => true,
  /** 
   * @param {TodoTask} task
   */
  Active: task => !task.isCompleted,
  /** 
   * @param {TodoTask} task
   */
  Completed: task => task.isCompleted
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

/**
 * @typedef AppProps
 * @property {TodoTask[]} todoTasks 
 */
/**
 * 
 * @param {AppProps} props
 */
export function App({ todoTasks }) {
  const [tasks, changeTasks] = useState(todoTasks);
  const [filter, setFilter] = useState('All');
  const listHeadingRef = useRef(null);

  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(task => (
    <TodoItem 
      id={task.id} 
      key = {task.id}
      name={task.name} 
      isCompleted={task.isCompleted}
      toggleTaskCompletion={toggleTaskCompletion}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));
  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  const filterList = FILTER_NAMES.map(name => (
    <FilterButton 
      key={name} 
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));
  /**
   * @type number
   */
  const prevTaskLength = usePrevious(tasks.length);
  
  useEffect(() => {

    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }

  }, [tasks.length, prevTaskLength]);

  return (
    <>
      <h1>TodoMatic</h1>
      <section className="todoapp stack-large">
        <Form addTask={addTask} />
        <div className="filters btn-group stack-exception">
          {filterList}
        </div>
        <h2 
          id="list-heading"
          // @ts-expect-error
          tabIndex="-1"
          ref={listHeadingRef} 
        >{headingText}</h2>
        <ul
          // eslint-disable-next-line
          role="list"
          className="todo-list stack-large stack-exception"
          aria-labelledby="list-heading"
        >
          {taskList}
        </ul>
      </section>
    </>
  );
  
  /**
   * @param {string} name 
   */
  function addTask(name) {
    changeTasks([...tasks, new TodoTask(name)]);
  }

  /**
   * 
   * @param {string} id 
   */
  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    changeTasks(remainingTasks);
  }

  /**
   * @param {string} id 
   */
  function toggleTaskCompletion(id) {
    const updatedTasks = tasks.map(task => {

      if (id === task.id) { // if this task has the same ID as the edited taskz

        // use object spread to make a new object whose `completed` prop has been inverted
        return {...task, isCompleted: !task.isCompleted}

      }

      return task;

    });

    changeTasks(updatedTasks);
  }

  /**
   * @param {string} id 
   * @param {string} newName 
   */
  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {

      // if this task has the same ID as the edited task
      if (id === task.id) {

        return {...task, name: newName}

      }

      return task;

    });

    changeTasks(editedTaskList);
  }
}

