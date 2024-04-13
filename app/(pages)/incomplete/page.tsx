"use client";

import Tasks from "@/app/components/Tasks/Tasks";
import { useGlobalState } from "@/app/context/globalProvider";

const IncompletePage = () => {
  const { incompleteTasks } = useGlobalState();
  return <Tasks title="Incomplete Tasks" tasks={incompleteTasks} />;
};

export default IncompletePage;
