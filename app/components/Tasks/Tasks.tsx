"use client";
import styled from "styled-components";
import CreateContent from "../Modals/CreateContent";
import TaskItem from "../TaskItem/TaskItem";
import Modal from "../Modals/Modal";
import { useGlobalState } from "@/app/context/globalProvider";
import { plus } from "@/app/utils/icons";

interface TasksProps {
  title: string;
  tasks: any[];
}
const Tasks = ({ title, tasks }: TasksProps) => {
  const { theme, isLoading, openModal, modal, savedTask } = useGlobalState();

  return (
    <TaskStyled theme={theme}>
      {modal && <Modal content={<CreateContent task={savedTask} />} />}
      <h1>{title}</h1>

      {!isLoading ? (
        <div className="tasks grid">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              title={task.title}
              description={task.description}
              date={task.date}
              isCompleted={task.isCompleted}
              isImportant={task.isImportant}
              id={task.id}
            />
          ))}
          <button className="create-task" onClick={openModal}>
            {plus}
            Add New Task
          </button>
        </div>
      ) : (
        <div className="tasks-loader w-full h-full flex items-center justify-center">
          <span className="loader"></span>
        </div>
      )}
    </TaskStyled>
  );
};

const TaskStyled = styled.main`
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  padding: 2rem;
  overflow-y: auto;
  height: 100%;

  h1 {
    font-size: 2rem;
  }

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  .tasks {
    margin: 3rem 0;
  }
  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: ${(props) => props.theme.colorPrimaryGreen};
      border-radius: 0.5rem;
    }
  }

  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 0.5rem;
    height: 16rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all 0.3s ease;

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;

export default Tasks;
