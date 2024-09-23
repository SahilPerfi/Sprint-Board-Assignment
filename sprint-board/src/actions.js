export const addTask = (task) => ({
    type: 'ADD_TASK',
    payload: task,
});

export const updateTaskState = (index, newState) => ({
    type: 'UPDATE_TASK_STATE',
    payload: { index, newState },
});
