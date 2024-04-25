"use client";
import { useParams } from "next/navigation";
import Tasks from "@/app/components/Tasks/Tasks";
import { useGlobalState } from "@/app/context/globalProvider";

const FilteredTasksPage = () => {
  const params = useParams();
  const { completedTasks, importantTasks, incompleteTasks } = useGlobalState();

  const getTasks = () => {
    switch (params.filteredTasks) {
      case "completed":
        return { title: "Completed Tasks", tasks: completedTasks };
      case "important":
        return { title: "Important Tasks", tasks: importantTasks };
      case "incomplete":
        return { title: "Incomplete Tasks", tasks: incompleteTasks };
      default:
        return { title: "Tasks", tasks: [] };
    }
  };

  const { title, tasks } = getTasks();

  return <Tasks title={title} tasks={tasks} />;
};

export default FilteredTasksPage;
