import React from 'react';
import { FlatList } from 'react-native';

import { ItemWrapper } from './ItemWrapper';
import { TaskItem } from './TaskItem';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface EditTaskData {
  taskId: number
  taskNewTitle: string
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (editTask: EditTaskData) => void
}

export function TasksList({
  tasks,
  toggleTaskDone,
  removeTask, editTask
}: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem
              task={item}
              index={index}
              toggleTaskDone={toggleTaskDone}
              removeTask={removeTask}
              editTask={editTask}
            />
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}