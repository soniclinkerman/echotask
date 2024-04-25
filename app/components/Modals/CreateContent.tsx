"use client";

import toast from "react-hot-toast";
import styled from "styled-components";
import Button from "../Button/Button";
import { useEffect, useState } from "react";
import { useGlobalState } from "@/app/context/globalProvider";
import { plus } from "@/app/utils/icons";
import { useParams, useRouter } from "next/navigation";
import menu from "@/app/utils/menu";
const CreateContent = (task: any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);

  const params = useParams();
  const router = useRouter();
  const { theme, isEditing, savedTask, updateTask, createTask, isValidRoute } =
    useGlobalState();

  const handleChange = (name: String) => (e: any) => {
    switch (name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "date":
        setDate(e.target.value);
        break;
      case "completed":
        setCompleted(e.target.checked);
        break;
      case "important":
        setImportant(e.target.checked);
        break;
    }
  };

  useEffect(() => {
    if (isEditing) {
      setTitle(savedTask.title);
      setDescription(savedTask.description);
      setDate(savedTask.date);
      setImportant(savedTask.isImportant);
      setCompleted(savedTask.isCompleted);
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const task = {
      title,
      description,
      date,
      completed,
      important,
    };

    try {
      if (isEditing) {
        updateTask(savedTask.id, task);
      } else {
        createTask(task);
        let isValidRoute = false;
        menu.forEach((url) => {
          if (url.link === `/tasks/${params.filteredTasks}` && !isValidRoute) {
            isValidRoute = true;
          }
        });

        if (!isValidRoute) {
          router.push("/");
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <CreateContentStyled onSubmit={handleSubmit} theme={theme}>
      <h1>Create a Task</h1>
      <div className="input-control">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={title}
          type="text"
          name="title"
          onChange={handleChange("title")}
          placeholder="e.g, Make a to do app"
        />
      </div>
      <div className="input-control">
        <label htmlFor="description">Description</label>
        <textarea
          value={description}
          onChange={handleChange("description")}
          name="description"
          id="description"
          rows={4}
          placeholder="e.g, Make a to do app"
        ></textarea>
      </div>
      <div className="input-control">
        <label htmlFor="date">Due Date</label>
        <input
          id="date"
          value={date}
          type="date"
          name="date"
          onChange={handleChange("date")}
        />
      </div>

      <div className="input-control toggler">
        <label htmlFor="completed">Toggle Completed</label>
        <input
          id="completed"
          checked={completed}
          type="checkbox"
          name="completed"
          onChange={handleChange("completed")}
        />
      </div>
      <div className="input-control toggler">
        <label htmlFor="important">Important</label>
        <input
          id="important"
          checked={important}
          type="checkbox"
          name="important"
          onChange={handleChange("important")}
        />
      </div>

      <div className="submit-btn flex justify-end">
        <Button
          type="submit"
          name={isEditing ? "Update task" : "Create task"}
          icon={plus}
          padding={".8rem 2rem"}
          borderRad={"0.8rem"}
          color={theme.color}
          fw={"700"}
          fs={"1.2rem"}
          background={theme.colorGreenDark}
        />
      </div>
    </CreateContentStyled>
  );
};

const CreateContentStyled = styled.form`
  > h1 {
    font-size: clamp(1.2rem, 5vw 1.6rem);
    font-weight: 700;
  }

  color: ${(props) => props.theme.colorGrey1};

  .input-control {
    position: relative;
    margin: 1.6rem 0;
    font-weight: 700;

    label {
      margin-bottom: 0.5rem;
      display: inline-block;
      font-size: clamp(0.9rem, 5vw, 1.2rem);

      span {
        color: ${(props) => props.theme.colorGrey3};
      }
    }

    input,
    textarea {
      width: 100%;
      border: none;
      padding: 1rem;

      resize: none;
      background-color: ${(props) => props.theme.colorGreyDark};
      color: ${(props) => props.theme.colorGrey2};
      border-radius: 0.5rem;
    }
  }

  .submit-btn button {
    transition: all 0.3s ease-in-out;
    i {
      color: white;
    }
    &:hover {
      background: white !important;
      color: ${(props) => props.theme.colorGreenDark} !important;
      i {
        color: ${(props) => props.theme.colorGreenDark} !important;
      }
    }
  }

  .toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    label {
      flex: 1;
    }

    input {
      width: initial;
    }
  }
`;
export default CreateContent;
