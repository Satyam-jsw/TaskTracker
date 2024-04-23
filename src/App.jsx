import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors, closestCorners, } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Column } from "./components/Column/Column";
import { Input } from "./components/Input/Input";
import "./App.css";
import { SiApache } from "react-icons/si";


export default function App() {
  const [tasks, setTasks] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setTasks(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const addTask = (title) => {
    setTasks((tasks) => [...tasks, { id: tasks.length + 1, title, completed: false }]);
  };

  const deleteTask = (id) => {
    const newList = tasks.filter((x) => x.id !== id)
    setTasks(newList)
  }

  const toggleCompleted = () => {
    setShowCompleted(!showCompleted);
  }

  const completedTasks = tasks.filter(task => task.completed);
  const uncompletedTasks = tasks.filter(task => !task.completed);
  const sortedTasks = showCompleted ? [...completedTasks, ...uncompletedTasks] : [...uncompletedTasks, ...completedTasks];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getTaskPos = (id) => sortedTasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!active || !over || active.id === over.id) return;

    const activeId = parseInt(active.id);
    const overId = parseInt(over.id);

    const activeIndex = sortedTasks.findIndex((task) => task.id === activeId);
    const overIndex = sortedTasks.findIndex((task) => task.id === overId);

    const updatedTasks = arrayMove(sortedTasks, activeIndex, overIndex);

    setTasks(updatedTasks);
  };


  return (
    <div className="App">
     
      <h1>Tasks Tracker ✅</h1>
      <span className="filter-item">
          <strong className="filter_name">Sort</strong>
          <label className="switch">
            <input type="checkbox" onClick={toggleCompleted} />
            <span className="slider round"></span>
          </label>
        </span>
    
      <Input onSubmit={addTask} />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        
        <Column
          tasks={sortedTasks}
          deleteItem={deleteTask}
        />
      </DndContext>
    </div>
  );
}
