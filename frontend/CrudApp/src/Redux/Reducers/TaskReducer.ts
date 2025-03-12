import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface TaskState {
  Task: any;
}

const initialState: TaskState = {
  Task: [],
};

export const TaskReducer = createSlice({
  name: 'task',
  initialState,
  reducers: {
    SET_TASK: (state, action: PayloadAction<string>) => {
      state.Task = action.payload;
    },
    REMOVE_TASK: state => {
      state.Task = [];
    },
  },
});

export const {SET_TASK, REMOVE_TASK} = TaskReducer.actions;

export default TaskReducer.reducer;
