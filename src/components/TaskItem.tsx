import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit.png'

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface EditTaskData {
  taskId: number
  taskNewTitle: string
}

interface TaskItemProps {
  task: Task
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (editTask: EditTaskData) => void
}

export const TaskItem = ({
  task,
  index,
  toggleTaskDone,
  removeTask,
  editTask
}: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [taskNewTitleValue, setTaskNewTitleValue] = useState(task.title)

  const textInputRef = useRef<TextInput>(null)

  const handleStartEditing = () => {
    setIsEditing(true)
  }

  const handleCancelEditing = () => {
    setTaskNewTitleValue(task.title)
    setIsEditing(false)
  }

  const handleSubmitEditing = () => {
    editTask({
      taskId: task.id,
      taskNewTitle: taskNewTitleValue
    })
    setIsEditing(false)
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus()
        return
      }

      textInputRef.current.blur()
    }
  }, [isEditing])

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            ref={textInputRef}
            value={taskNewTitleValue}
            onChangeText={setTaskNewTitleValue}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {isEditing ? (
          <TouchableOpacity onPress={handleCancelEditing}>
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStartEditing}>
            <Image source={editIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.iconsDivider} />

        <TouchableOpacity
          testID={`trash-${index}`}
          disabled={isEditing}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </>

  )
}

const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection: 'row',
  },
  iconsDivider: {
    width: 1,
    height: 24,
    marginHorizontal: 18,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
    opacity: 0.24,
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
})