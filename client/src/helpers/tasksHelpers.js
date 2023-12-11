import axios from "axios";
import { tasksLoading, receivedSelected, receivedAll, tasksFormLoading, changePage, changeStatus } from "../features/tasksSlice";
import { toast } from "react-toastify";

function toSentenceCase(str) {
    const s =
      str &&
      str
        .match(
          /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
        )
        .join(' ');
    return s.slice(0, 1).toUpperCase() + s.slice(1) + ".";
}

function setErrorResponseToast(errString, code, defaultErrString) {

    switch (code) {
        case 500:
            toast.error(defaultErrString, {
                theme: 'colored'
            })
            break;
        default:
            toast.error(toSentenceCase(errString), {
                theme: 'colored'
            })   
            break;
    }
}


export function fetchTasks(page, status) {
    let url = `${import.meta.env.VITE_SERVER_URL}?sort=deadline&sortBy=asc&page=${page}`;
    if (status != "All") {
        url += `&status=${status}`;
    }
    return async dispatch => {
        try {
            dispatch(tasksLoading());
            dispatch(changePage(page));
            dispatch(changeStatus(status));
            const response = await axios.get(url);
            dispatch(receivedAll(response.data.data));
        } catch (error) {
            setErrorResponseToast("Failed to retrieve tasks. Please refresh the page to try again.", error.response.status, "Failed to retrieve tasks. Please refresh the page to try again.");
        }
    }
}

export function fetchTaskById(id) {
    return async dispatch => {
        try {
            dispatch(tasksFormLoading());
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/${id}`);
            dispatch(receivedSelected(response.data.data));
        } catch (error) {
            setErrorResponseToast(error.response.data.error, error.response.status, "Failed to retrieve information of the selected task. Please refresh the page to try again.")
        }
    }
}

export function postTask(body) {
    return async dispatch => {
        try {
            await axios.post(import.meta.env.VITE_SERVER_URL, body, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            toast.success(`${body.task_name} has been successfully added to tasks.`, {
                theme: 'colored'
            })
            dispatch(fetchTasks(1, "All"));
        } catch (error) {
            setErrorResponseToast(error.response.data.error, error.response.status, `Request to add ${body.task_name} to tasks is unsuccessful. Please try again later.`)
        }
    }
}

export function deleteTask(id) {
    return async dispatch => {
        try {
            await axios.delete(`${import.meta.env.VITE_SERVER_URL}/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            dispatch(fetchTasks(1, "All"));
            toast.success(`Selected task has been successfully deleted.`, {
                theme: 'colored'
            })
        } catch (error) {
            setErrorResponseToast(error.response.data.error, error.response.status, "Delete request is unsuccessful. Please try again later.")
        }
    }
}

export function putTask(body) {
    return async dispatch => {
        try {
            await axios.put(`${import.meta.env.VITE_SERVER_URL}`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            toast.success(`Task of ${body.task_name} status has been changed to ${body.task_status}.`, {
                theme: 'colored'
            })
            dispatch(fetchTasks(1, "All"));
        } catch (error) {
            setErrorResponseToast(error.response.data.error, error.response.status, "Edit request is unsuccessful. Please try again later.")
        }
    }
}

export function putTaskAndSubtask(body) {
    return async dispatch => {
        try {
            await axios.put(`${import.meta.env.VITE_SERVER_URL}/subtasks`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            toast.success(`Task of ${body.task_name} has been successfully updated.`, {
                theme: 'colored'
            })
            dispatch(fetchTasks(1, "All"));
        } catch (error) {
            setErrorResponseToast(error.response.data.error, error.response.status, "Edit request is unsuccessful. Please try again later.")
        }
    }
}
