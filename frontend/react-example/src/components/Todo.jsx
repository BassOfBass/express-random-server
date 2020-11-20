import { useEffect, useRef, useState } from "react";
import { usePrevious } from "src/custom-hooks/usePrevious";

/**
 * @typedef TodoProps 
 * @property {string} name
 * @property {boolean} isCompleted
 * @property {string} id
 * @property {(id: string) => void} toggleTaskCompletion
 * @property {(id: string) => void} deleteTask
 * @property {(id: string, newName: string) => void} editTask
 */
/**
 * @param {TodoProps} props
 */
export function TodoItem({ 
  name, 
  isCompleted, 
  id, 
  toggleTaskCompletion,
  deleteTask,
  editTask
}) {
  const [isEditing, switchEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  const wasEditing = usePrevious(isEditing);

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit} >
      <div className="form-group">
        <label className="todo-label" htmlFor={id}>
          New name for {name}
        </label>
        <input 
          id={id} 
          className="todo-text" 
          type="text" 
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button 
          type="button" 
          className="btn todo-cancel"
          onClick={() => switchEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {name}</span>
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <>
      <div className="c-cb">
          <input
            id={id}
            type="checkbox"
            defaultChecked={isCompleted}
            onChange={() => toggleTaskCompletion(id)}
          />
          <label className="todo-label" htmlFor={id}>
            {name}
          </label>
        </div>
        <div className="btn-group">
          <button 
            type="button" 
            className="btn"
            onClick={() => switchEditing(true)}
            ref={editButtonRef}
          >
            Edit <span className="visually-hidden">{name}</span>
          </button>
          <button
            type="button"
            className="btn btn__danger"
            onClick={() => deleteTask(id)}
          >
            Delete <span className="visually-hidden">{name}</span>
          </button>
        </div>
    </>
  );

  useEffect(() => {

    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();}
    

  }, [wasEditing, isEditing]);
  
  return (
    <li className="todo stack-small">
      {isEditing 
        ? editingTemplate 
        : viewTemplate
      }
    </li>
  );

  /**
   * @param {import("react").ChangeEvent<HTMLInputElement>} e 
   */
  function handleChange(e) {
    setNewName(e.target.value);
  }

  /**
   * @param {import("react").FormEvent} e 
   */
  function handleSubmit(e) {
    e.preventDefault();
    editTask(id, newName);
    setNewName("");
    switchEditing(false);
  }
}
