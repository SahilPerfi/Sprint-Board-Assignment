import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, updateTaskTitle, updateTaskState } from '../actions';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../styles/SprintBoard.css';

const SprintBoard = () => {
    const tasks = useSelector((state) => state.tasks);
    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        assignee: '',
        estimate: '',
        state: 'New',
    });

    // State to keep track of the currently edited task
    const [editingTask, setEditingTask] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addTask(newTask));
        setShowForm(false);
        setNewTask({
            title: '',
            assignee: '',
            estimate: '',
            state: 'New',
        });
    };

    const handleStateChange = (index, newState) => {
        dispatch(updateTaskState(index, newState));
    };

    const handleTitleChange = (index, newTitle) => {
        dispatch(updateTaskTitle(index, newTitle));
    };

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const draggedTaskIndex = tasks.findIndex((task) => task.id === draggableId);
        const newTaskState = destination.droppableId;

        dispatch(updateTaskState(draggedTaskIndex, newTaskState));
    };

    const renderTasks = (state) => {
        return tasks
            .filter((task) => task.state === state)
            .map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="task-tile"
                        >
                            {editingTask === task.id ? (
                                <input
                                    type="text"
                                    className="task-title-input"
                                    value={task.title}
                                    onChange={(e) =>
                                        handleTitleChange(index, e.target.value)
                                    }
                                    onBlur={() => setEditingTask(null)} // Save changes when input loses focus
                                    maxLength="200"
                                    autoFocus
                                />
                            ) : (
                                <p
                                    className="task-title"
                                    onClick={() => setEditingTask(task.id)}
                                >
                                    {task.title}
                                </p>
                            )}
                            <p>
                                <strong>Assignee:</strong> {task.assignee}
                            </p>
                            <p>
                                <strong>Estimate:</strong> {task.estimate} hours
                            </p>
                            <label>
                                <strong>State:</strong>
                                <select
                                    value={task.state}
                                    onChange={(e) =>
                                        handleStateChange(index, e.target.value)
                                    }
                                >
                                    <option value="New">New</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Blocked">Blocked</option>
                                    <option value="Resolved">Resolved</option>
                                    <option value="Done">Done</option>
                                </select>
                            </label>
                        </div>
                    )}
                </Draggable>
            ));
    };

    return (
        <div>
            <button onClick={() => setShowForm(true)}>Add Task</button>

            {showForm && (
                <div className="modal">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit}>
                            <label>
                                Title:
                                <input
                                    type="text"
                                    maxLength="200"
                                    value={newTask.title}
                                    onChange={(e) =>
                                        setNewTask({ ...newTask, title: e.target.value })
                                    }
                                    required
                                />
                            </label>
                            <label>
                                Assignee:
                                <select
                                    value={newTask.assignee}
                                    onChange={(e) =>
                                        setNewTask({ ...newTask, assignee: e.target.value })
                                    }
                                    required
                                >
                                    <option value="">Select Assignee</option>
                                    <option value="User1">User1</option>
                                    <option value="User2">User2</option>
                                    {/* Add more options as needed */}
                                </select>
                            </label>
                            <label>
                                Estimate Hours:
                                <input
                                    type="number"
                                    value={newTask.estimate}
                                    onChange={(e) =>
                                        setNewTask({ ...newTask, estimate: e.target.value })
                                    }
                                    required
                                />
                            </label>
                            <label>
                                State:
                                <select
                                    value={newTask.state}
                                    onChange={(e) =>
                                        setNewTask({ ...newTask, state: e.target.value })
                                    }
                                    required
                                >
                                    <option value="New">New</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Blocked">Blocked</option>
                                    <option value="Resolved">Resolved</option>
                                    <option value="Done">Done</option>
                                </select>
                            </label>
                            <button type="submit">Add Task</button>
                        </form>
                        <button
                            className="close-modal"
                            onClick={() => setShowForm(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="sprint-board">
                    {['New', 'In Progress', 'Blocked', 'Resolved', 'Done'].map(
                        (state) => (
                            <Droppable key={state} droppableId={state}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className="column"
                                    >
                                        <h3>{state}</h3>
                                        {renderTasks(state)}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        )
                    )}
                </div>
            </DragDropContext>
        </div>
    );
};

export default SprintBoard;
