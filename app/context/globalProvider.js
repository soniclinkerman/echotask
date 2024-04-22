"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import themes from "./themes";
import axios from "axios";
import toast from "react-hot-toast";

import { useUser } from "@clerk/nextjs";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
  const { user } = useUser();
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [tasks, setTasks] = useState([]);

  const [modal, setModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [savedTask, setSavedTask] = useState([]);

  const theme = themes[selectedTheme];

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setIsEditing(false);
  };

  const triggerIsEditing = () => {
    setIsEditing(true);
    openModal();
  };

  const collapseMenu = () => {
    setCollapsed(!collapsed);
  };

  const allTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/api/tasks`);
      const sorted = res.data.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      setTasks(sorted);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (id, task) => {
    try {
      const res = await axios.put(`/api/tasks/${id}`, task);
      console.log(res.data);

      if (res.data.error) {
        toast.error(res.data.error);
      }

      if (!res.data.error) {
        toast.success("Task updated successfuly");
        allTasks();
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTaskCompletion = async (task) => {
    try {
      const res = await axios.put("/api/tasks", task);

      console.log(res.data);
      toast.success("Task Updated");
      allTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const completedTasks = tasks.filter((task) => task.isCompleted === true);
  const incompleteTasks = tasks.filter((task) => task.isCompleted === false);
  const importantTasks = tasks.filter((task) => task.isImportant === true);

  const dummyTasks = () => {
    const testTasks = [
      {
        id: 1,
        title: "Make A To Do App",
        description: "Connect Database",
        date: new Date(),
        isCompleted: false,
      },
    ];
    setTasks(testTasks);
  };

  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(`/api/tasks/${id}`);
      toast.success("Task deleted");

      allTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (user) {
      allTasks();
    } else {
      dummyTasks();
    }
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
        deleteTask,
        isLoading,
        completedTasks,
        incompleteTasks,
        importantTasks,
        toggleTaskCompletion,
        openModal,
        closeModal,
        modal,
        allTasks,
        collapsed,
        collapseMenu,
        triggerIsEditing,
        isEditing,
        setSavedTask,
        updateTask,
        savedTask,
      }}
    >
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
