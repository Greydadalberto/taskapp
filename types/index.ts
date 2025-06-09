export interface Task {
  taskId: string;
  title: string;
  description: string;
  assignedTo?: string;
  deadline: string;
  status?: string;
}
