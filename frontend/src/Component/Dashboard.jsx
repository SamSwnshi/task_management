import React, { useState } from 'react';
import useTaskHook from "../hooks/useTask";
import api from '../config/api';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [filter, setFilter] = useState("All");
  const { tasks, setTasks, loading } = useTaskHook(filter);
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'low', status: 'incomplete' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const navigate = useNavigate();

  const handleCreateOrUpdateTask = async (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.description || !newTask.priority) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      if (isEditMode && editingTaskId) {
        const response = await api.put(`/task/update/${editingTaskId}`, newTask);
        setTasks((prev) =>
          prev.map((task) =>
            task._id === editingTaskId ? { ...task, ...response.data.data } : task
          )
        );
        toast.success('Task updated successfully!');
      } else {
        const response = await api.post('/task/create', newTask, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setTasks((prevTasks) => [response.data.data, ...prevTasks]);
        toast.success('Task created successfully!');
      }

      setNewTask({ title: '', description: '', priority: 'low', status: 'incomplete' });
      setIsModalOpen(false);
      setIsEditMode(false);
      setEditingTaskId(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving task');
    }
  };

  const handleStatusToggle = async (id) => {
    try {
      const task = tasks.find((t) => t._id === id);
      if (task.status === "complete") return;

      const updated = await api.put(`/task/update/${id}`, {
        status: task.status === "complete" ? "incomplete" : "complete",
      });

      setTasks((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, status: updated.data.data.status } : t
        )
      );
    } catch (error) {
      toast.error("Error updating task");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/task/delete/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      toast.error("Error deleting task");
    }
  };

  const handleLogOut = async () => {
    try {
      await api.post("/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Task Dashboard</h1>
        <button
          className="px-4 py-2 rounded-md bg-amber-200 hover:bg-amber-300"
          onClick={handleLogOut}
        >
          Logout
        </button>
      </div>

      <div className="flex gap-4 mb-6 mt-6">
        {["All", "Active", "Completed"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-md ${
              filter === type ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {loading ? (
         <p className="text-center text-gray-600 text-lg mt-8">Loading your data...</p>
      ) : tasks.length === 0 ? (
        <p className="text-center text-gray-600 text-lg mt-8">No tasks to show.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="p-4 bg-white border rounded-md shadow flex justify-between items-start"
            >
              <div>
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Priority: {task.priority} | Created:{" "}
                  {new Date(task.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <button
                  onClick={() => handleStatusToggle(task._id)}
                  className={`text-sm px-2 py-1 rounded bg-yellow-400 hover:bg-yellow-500 text-white ${
                    task.status === "complete" ? "bg-gray-400 cursor-not-allowed" : ""
                  }`}
                  disabled={task.status === "complete"}
                >
                  {task.status === "complete" ? "Completed" : "Mark Complete"}
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-sm px-2 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setEditingTaskId(task._id);
                    setNewTask({
                      title: task.title,
                      description: task.description,
                      priority: task.priority,
                      status: task.status,
                    });
                    setIsEditMode(true);
                    setIsModalOpen(true);
                  }}
                  className="text-sm px-2 py-1 rounded bg-green-500 hover:bg-green-600 text-white"
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-md shadow-md w-1/2">
            <h3 className="text-xl font-semibold mb-4">
              {isEditMode ? 'Update Task' : 'Create New Task'}
            </h3>
            <form onSubmit={handleCreateOrUpdateTask}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Task Title"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Task Description"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsEditMode(false);
                    setEditingTaskId(null);
                    setNewTask({ title: '', description: '', priority: 'low', status: 'incomplete' });
                  }}
                  className="py-2 px-4 rounded-md bg-gray-300 text-black hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                >
                  {isEditMode ? 'Update Task' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <button
        className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 mt-4"
        onClick={() => {
          setIsModalOpen(true);
          setIsEditMode(false);
          setNewTask({ title: '', description: '', priority: 'low', status: 'incomplete' });
        }}
      >
        Create New Task
      </button>
    </div>
  );
};

export default Dashboard;
