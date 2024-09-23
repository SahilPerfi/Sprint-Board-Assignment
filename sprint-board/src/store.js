import { createStore } from 'redux';
import { v4 as uuidv4 } from 'uuid';

// Initial state
const initialState = {
    tasks: [],
};

// Reducer
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
        default:
            return state;
    }
}

// Create store
const store = createStore(sprintReducer);

export default store;
