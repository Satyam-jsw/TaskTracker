import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./Task.css";
import { MdDelete } from "react-icons/md";
import { useState } from "react";

export const Task = ({ id, title, completed, deleteItem }) => {
  const [isChecked, setIsChecked] = useState(completed);

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    backgroundColor: isChecked ? '#4CAF50' : '#f44336', 
  };

  const handleCheckbox = () => {
    setIsChecked(!isChecked); 
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="task">
      <div className="flow">
        <input type='checkbox' className="checkbox" checked={isChecked} onChange={handleCheckbox} />
        {title}
        <button className="btn btn-info"><MdDelete className="checkbox" onClick={() => deleteItem(id)} /></button>
      </div>
    </div>
  );
};
