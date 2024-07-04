const reducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TASK':
        const newName = [...state.name, { text: action.payload, completed: false }];
        localStorage.setItem("tasks", JSON.stringify(newName)); 
        return {
          ...state,
          name: newName
        };
      case 'REMOVE_FROM_TASK':
        const filteredTasks = state.name.filter(task => task !== action.payload);
        localStorage.setItem("tasks", JSON.stringify(filteredTasks)); 
        return {
          ...state,
          name: filteredTasks
        };
      case 'TOGGLE_TASK':
        const updatedTasks = state.name.map((task, index) => {
          if (index === action.payload) {
            return { ...task, completed: !task.completed };
          }
          return task;
        });
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        return {
          ...state,
          name: updatedTasks
        };
      default:
        return state;
    }
  }

  export { reducer } 