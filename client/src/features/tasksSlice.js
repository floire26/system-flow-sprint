import { createSlice } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        all: [],
        selected: {
            task_name: '',
            task_status: '',
            deadline_date: "",
            deadline_time: "",
            subtasks: [],
        },
        isLoading: false,
        isLoadingForm: false,
        isAdd: true,
        pages: [],
        pageState: 0,
        statusState: "All",
    },
    reducers: {
        tasksLoading: state => {
            state.isLoading = true;
        },
        tasksFormLoading: state => {
            state.isLoadingForm = true;
        },
        receivedAll: (state, action) => {
            state.pages = [];
            state.isLoading = false;
            state.all = action.payload.tasks;

            if (state.all.length > 0) {
                for (let i = 1; i <= action.payload.total_page; i++) {
                    state.pages.push(i);
                }
            } else {
                state.pages.push(0);
            }


            state.all.map(el => {
                el.deadline = new Date(Date.parse(el.deadline)).toLocaleString();
                el.added_at = new Date(Date.parse(el.added_at)).toLocaleString();
                return el;
            })
        },
        receivedSelected: (state, action) => {
            state.isLoadingForm = false;
            state.selected = action.payload;
            Date.prototype.addHours = function(h) {
                this.setTime(this.getTime() + (h*60*60*1000));
                return this;
            }
            let dl = new Date(Date.parse(state.selected.deadline));
            dl.addHours(7);
            let [dt, tz] = dl.toISOString().split('T');
            state.selected.deadline_date = dt;
            let time = tz.split('.')[0];
            state.selected.deadline_time = time.slice(0, time.length - 3);
            state.selected.deadline = `${dt} ${state.selected.deadline_time}`;
            state.isAdd = false;

            state.selected.subtasks === undefined ?  state.selected.subtasks = [] : null;
        },
        setToAddForm: state => {
            state.selected = {
                task_name: '',
                task_status: 'Ongoing',
                deadline_date: "",
                deadline_time: "",
                subtasks: [],
            };
            state.isAdd = true;
        },
        changePage: (state, action) => {
            state.pageState = action.payload;
        },
        changeStatus: (state, action) => {
            state.statusState = action.payload;
        },
        modifySubtask: (state, action) => {
            state.selected.subtasks[action.payload.id] = action.payload.body;
            let checkStatus = state.selected.subtasks.every(el => el.subtask_status == "Completed") && action.payload.body.subtask_status == "Completed";
            state.selected.task_status = checkStatus ? "Completed" : "Ongoing";
        },
        deleteSubtask:(state, action) => {
            state.selected.subtasks.splice(action.payload, 1);
        },
        addEmptySubtask: (state) => {
            state.selected.subtasks.push({
                subtask_status: "Ongoing"
            });
            state.selected.has_substasks = true;
        },
        modifyTask: (state, action) => {
            state.selected = action.payload;
        }
    }
})

export const { tasksLoading, tasksFormLoading, receivedAll, receivedSelected, setToAddForm, changeStatus, changePage, modifySubtask, deleteSubtask, addEmptySubtask, modifyTask } = tasksSlice.actions;
export default tasksSlice.reducer
