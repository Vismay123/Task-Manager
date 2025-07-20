import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, doc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(fetched);
    });
    return unsub;
  }, []);

  const toggleComplete = async (task) => {
    const taskRef = doc(db, "tasks", task.id);
    await updateDoc(taskRef, { completed: !task.completed });
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="task-list">
      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      {filteredTasks.map(task => (
  <div key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
    <h3>{task.title}</h3>
    <p>{task.description}</p>
    <p>Due: {task.dueDate}</p>
    {task.assignedTo && (
      <p><strong>Assigned To:</strong> {task.assignedTo}</p>
    )}
    <button onClick={() => toggleComplete(task)}>
      {task.completed ? "Mark Pending" : "Mark Completed"}
    </button>
    <button onClick={() => deleteTask(task.id)}>Delete</button>
  </div>
))}
    </div>
  );
};

export default TaskList;
