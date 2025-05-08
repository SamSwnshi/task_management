import React, { useEffect, useState } from "react";
import api from "../config/api";
import { toast } from "react-toastify";

const useTask = () => {
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get("/tasks");
        setTask(response.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to Fetch the Task!"
        );
      }finally{
        setLoading(false)
      }
    };
    fetchTask()
  }, []);
  return (
    {task,setTask,loading}
  );
};

export default useTask;
