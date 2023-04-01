import { ListStatusTasks } from "./list-status-tasks.enum"

export interface TaskLevels
{
  id:string;
  tasks:Task[];
}

export interface Task {
  idTask:string;//задача
  idSolution:string;//решение
  idAnswer:string;//ответ
  status:ListStatusTasks;
}