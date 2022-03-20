import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface EditTaskData {
  taskId: number
  taskNewTitle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const repeatedTitleTaskFound = tasks.find(task => task.title === newTaskTitle)

    if (repeatedTitleTaskFound) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
      return
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(prevTasks => [...prevTasks, newTask])
  }

  function handleToggleTaskDone(id: number) {
    setTasks(prevTasks => prevTasks.map(prevTask =>
      prevTask.id === id ? { ...prevTask, done: !prevTask.done } : prevTask))
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?',
      [
        { text: 'Não' },
        {
          text: 'Sim', onPress: () =>
            setTasks(prevTasks => prevTasks.filter(prevTask => prevTask.id !== id))
        }
      ]
    )
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskData) {
    setTasks(prevTasks => prevTasks.map(task => task.id === taskId ? { ...task, title: taskNewTitle } : task))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})