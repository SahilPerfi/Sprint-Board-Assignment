// src/actions.js

// Existing imports and actions
export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK_STATE = 'UPDATE_TASK_STATE';

// New action type for updating the task title
export const UPDATE_TASK_TITLE = 'UPDATE_TASK_TITLE';

// Action to add a task
export const addTask = (task) => ({
  type: ADD_TASK,
  payload: task,
});

// Action to update task state (move between columns)
export const updateTaskState = (index, newState) => ({
  type: UPDATE_TASK_STATE,
  payload: { index, newState },
});

// New action to update task title
export const updateTaskTitle = (index, newTitle) => ({
  type: UPDATE_TASK_TITLE,
  payload: { index, newTitle },
});
