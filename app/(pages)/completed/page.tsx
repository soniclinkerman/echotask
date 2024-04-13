"use client";

import Tasks from "@/app/components/Tasks/Tasks";
import { useGlobalState } from "@/app/context/globalProvider";

const CompletedPage = () => {
  const { completedTasks } = useGlobalState();
  return <Tasks title="Completed Tasks" tasks={completedTasks} />;
};

export default CompletedPage;
