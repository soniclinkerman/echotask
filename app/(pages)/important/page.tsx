"use client";

import Tasks from "@/app/components/Tasks/Tasks";
import { useGlobalState } from "@/app/context/globalProvider";

const ImportantPage = () => {
  const { importantTasks } = useGlobalState();
  return <Tasks title="Important Tasks" tasks={importantTasks} />;
};

export default ImportantPage;
