import { createStore } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { UPDATE_TASK_TITLE, DELETE_TASK } from './actions';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('tasks');
        if (serializedState === null) {
            return undefined;
        }
        return { tasks: JSON.parse(serializedState) };
    } catch (err) {
        return undefined;
    }
};

const initialState = {
    tasks: [],
};

function sprintReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [...state.tasks, { ...action.payload, id: uuidv4() }],
            };
        case 'UPDATE_TASK_STATE':
            const updatedTasks = state.tasks.map((task, index) => 
                index === action.payload.index ? { ...task, state: action.payload.newState } : task
            );
            return {
                ...state,
                tasks: updatedTasks,
            };
        case UPDATE_TASK_TITLE:
            const tasksWithUpdatedTitle = [...state.tasks];
            tasksWithUpdatedTitle[action.payload.index].title = action.payload.newTitle;
            return {
                ...state,
                tasks: tasksWithUpdatedTitle,
            };
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload),
            };
        default:
            return state;
    }
}

const store = createStore(sprintReducer, loadState());

store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
});

export default store;
