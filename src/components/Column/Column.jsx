import { SortableContext, verticalListSortingStrategy, } from "@dnd-kit/sortable";
import { Task } from "../Task/Task";
import "./Column.css";


export const Column = ({ tasks, deleteItem }) => {
  return (
    <div className="column">
      <strong>Double clicked for delete and marked/unmarked the task</strong>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {
          tasks.map((x) => (
            <Task
              key={x.id}
              id={x.id}
              title={x.title}
              completed={x.completed}
              deleteItem={deleteItem} />
          ))
        }
      </SortableContext>
    </div>
  );
};
