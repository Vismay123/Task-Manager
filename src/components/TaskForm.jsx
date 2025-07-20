import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [users, setUsers] = useState([]);

  // ✅ Fetch all users on load
  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const userList = snapshot.docs.map(doc => doc.data().email);
      const filteredUsers = userList.filter(email => email !== auth.currentUser.email);
      setUsers(filteredUsers);
    };
    fetchUsers();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title || !description || !dueDate) {
      return alert("Please fill all fields!");
    }

    // ✅ Add task to Firestore
    await addDoc(collection(db, "tasks"), {
      title,
      description,
      dueDate,
      assignedTo,
      createdBy: auth.currentUser.email,
      createdAt: serverTimestamp(),
      completed: false,
    });

    // ✅ Create notification if task assigned
    if (assignedTo) {
      await addDoc(collection(db, "notifications"), {
        to: assignedTo,
        message: `You have been assigned a new task: ${title}`,
        createdAt: serverTimestamp(),
        read: false,
      });
    }

    // ✅ Reset form fields after submission
    setTitle("");
    setDescription("");
    setDueDate("");
    setAssignedTo("");
  };

  return (
    <form onSubmit={handleAddTask} className="task-form">
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />

      {/* ✅ Assign To Dropdown */}
      <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
        <option value="">Assign to (optional)</option>
        {users.map(user => (
          <option key={user} value={user}>{user}</option>
        ))}
      </select>

      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
