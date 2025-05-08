import { useEffect, useState } from "react";
import api from "../config/api";
import { toast } from "react-toastify";

const useTask = (status = "All") => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        toast.error("User ID not found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/task", {
          params: { userId, status },
        });

        if (response.data.success) {
          setTasks(response.data.data);
        } else {
          toast.error(response.data.message || "Failed to fetch tasks.");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [status]);

  return { tasks, setTasks, loading };
};

export default useTask;
