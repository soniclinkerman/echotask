"use client";
import React from "react";
import styled from "styled-components";
import formatDate from "@/app/utils/formatDate";
import { useGlobalState } from "@/app/context/globalProvider";
import { edit, trash } from "../../utils/icons";
interface TaskItemProps {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  id: string;
  isImportant: boolean;
}
const TaskItem = ({
  title,
  description,
  date,
  isCompleted,
  id,
  isImportant,
}: TaskItemProps) => {
  const {
    theme,
    deleteTask,
    toggleTaskCompletion,
    triggerIsEditing,
    setSavedTask,
  } = useGlobalState();
  return (
    <TaskItemStyled theme={theme} className="task">
      <h1>{title}</h1>
      <p>{description}</p>
      <p className="date">{formatDate(date)}</p>
      <div className="task-footer">
        {isCompleted ? (
          <button
            className="completed"
            onClick={() => {
              const task = {
                id,
                isCompleted: !isCompleted,
              };
              toggleTaskCompletion(task);
            }}
          >
            Completed
          </button>
        ) : (
          <button
            className="incomplete"
            onClick={() => {
              const task = {
                id,
                isCompleted: !isCompleted,
              };
              toggleTaskCompletion(task);
            }}
          >
            Incomplete
          </button>
        )}

        <button
          className="edit"
          onClick={() => {
            const valuesOfTask = {
              id,
              title,
              description,
              date,
              isCompleted,
              isImportant,
            };
            triggerIsEditing(id);
            setSavedTask(valuesOfTask);
          }}
        >
          {edit}
        </button>
        <button
          className="delete"
          onClick={() => {
            deleteTask(id);
          }}
        >
          {trash}
        </button>
      </div>
    </TaskItemStyled>
  );
};

const TaskItemStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};

  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .date {
    margin-top: auto;
  }

  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .task-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.4rem;
        color: ${(props) => props.theme.colorGrey2};
      }
    }
    .edit {
      margin-left: auto;
    }

    .completed,
    .incomplete {
      display: inline-block;
      padding: 0.4rem 1rem;
      border-radius: 30px;
      background: ${(props) => props.theme.colorDanger};
    }
    .completed {
      background: ${(props) => props.theme.colorGreenDark};
    }
  }
`;

export default TaskItem;
