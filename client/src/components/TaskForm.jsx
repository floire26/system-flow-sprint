import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { postTask, putTaskAndSubtask } from "../helpers/tasksHelpers";
import SubtaskCard from "./SubtaskCard";
import { addEmptySubtask } from "../features/tasksSlice";

export default function TaskForm() {
    const dispatch = useDispatch();
    const isAdd = useSelector(state => state.tasks.isAdd);
    const task = useSelector(state => state.tasks.selected);
    const isLoading = useSelector(state => state.tasks.isLoadingForm);
    const defaultBody = {
        task_name: "",
        task_status: 'Ongoing',
        deadline_date: "",
        deadline_time: "",
        subtasks: [],
    }
    const [body, setBody] = useState(defaultBody);

    useEffect(() => !isAdd && body.task_name == "" ? setBody(task) : setBody(body), [task]);

    function handleTextChange(e) {
        let dd = body.deadline_date;
        let dt = body.deadline_time;

        switch (e.nativeEvent.target.id) {
            case "taskName":
                setBody({
                    ...body,
                    task_name: e.target.value
                })
                break;

            case "taskStatus":
                setBody({
                    ...body,
                    task_status: e.target.value,
                })
                break;

            case "deadlineDate":
                dd = e.target.value;
                setBody({
                    ...body,
                    deadline_date: dd,
                    deadline: `${dd} ${dt}`
                })
                break;

            case "deadlineTime":
                dt = e.target.value;
                setBody({
                    ...body,
                    deadline_time: dt,
                    deadline: `${dd} ${dt}`
                })
                break;
            default:
                break;
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        setBody({
            ...body,
            subtasks: task.subtasks,
            has_subtask: task.subtasks.length > 0 ? true : false
        })

        if (isAdd) {
            dispatch(postTask({
                ...body,
                subtasks: task.subtasks,
                has_subtask: task.subtasks.length > 0 ? true: false,
            }))
        } else {
            dispatch(putTaskAndSubtask({
                ...body,
                subtasks: task.subtasks,
                has_subtask: task.subtasks.length > 0 ? true: false,
            }))
        }
    }

    if (isLoading) return <>
            <div className="relative bg-lime-100/60 drop-shadow-lg rounded-lg shadow dark:bg-gray-700">
                <div role="status">
                    <svg aria-hidden="true" className="inline w-full h-20 m-4 text-slate-500 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
    </>

    return <>
        {/* <!-- Modal content --> */}
        <div className="font-items relative bg-lime-100/60 drop-shadow-lg rounded-lg shadow dark:bg-gray-700 h-4/5">
            <label
                htmlFor="task-modal"
                data-testid="closeButton"
                onClick={() => setBody(defaultBody)}
                className="btn border-0 absolute top-3 right-2.5 text-gray-700 bg-pink-500/60 hover:bg-pink-500 hover:text-white rounded-lg  p-3 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
            </label>
            <div className="px-6 py-6 lg:px-8">
                <h3 className="font-display text-4xl mb-4 font-medium text-gray-900 dark:text-white">{ isAdd ? 'Add a Task' : 'Edit Task' }</h3>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6">
                    <div>
                        <div className="flex flex-row block mb-2">
                            <label
                                htmlFor="taskName"
                                className="font-medium text-gray-900 dark:text-white">
                                Task Name  
                            </label>
                            <p className="text-red-600 ml-1">(★)</p>
                        </div>
                        <input
                            type="text"
                            name="taskName"
                            id="taskName"
                            value={ body.task_name }
                            onChange={ handleTextChange }
                            className="bg-white/50 border border-gray-200/50 text-gray-900 rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="ex. Cooking"
                            aria-label="taskName"
                             />
                    </div>
                    <div>
                        <div className="flex flex-row block mb-2">
                            <label
                                htmlFor="taskStatus"
                                className="font-medium text-gray-900 dark:text-white">
                                Task Status  
                            </label>
                            <p className="text-red-600 ml-1">(★)</p>
                        </div>
                        <select
                            name="taskStatus"
                            id="taskStatus"
                            value={ body.task_status }
                            onChange={ handleTextChange }
                            className="bg-white/50 border border-gray-200/50 text-gray-900  rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                            <option value="Ongoing">Ongoing</option>
                            <option value="Completed">Completed</option>
                            <option value="Due" disabled>Due</option>
                        </select>
                    </div>
                    <div>
                        <div className="flex flex-row block mb-2">
                            <label
                                htmlFor="deadlineDate"
                                className="font-medium text-gray-900 dark:text-white">
                                Deadline Date  
                            </label>
                            <p className="text-red-600 ml-1">(★)</p>
                        </div>
                        <input
                            type="date"
                            name="deadlineDate"
                            id="deadlineDate"
                            defaultValue={ body.deadline_date ?? "" }
                            onChange={ handleTextChange }
                            aria-label="deadlineDate"
                            className="bg-white/50 border border-gray-200/50 text-gray-900  rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                             />       
                    </div>
                    <div>
                        <div className="flex flex-row block mb-2">
                            <label
                                htmlFor="deadlineTime"
                                className="font-medium text-gray-900 dark:text-white">
                                Deadline Time  
                            </label>
                            <p className="text-red-600 ml-1">(★)</p>
                        </div>
                        <input
                            type="time"
                            name="deadlineTime"
                            id="deadlineTime"
                            defaultValue={ body.deadline_time ?? "" }
                            onChange={ handleTextChange }
                            aria-label="deadlineTime"
                            className="bg-white/50 border border-gray-200/50 text-gray-900  rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                             />       
                    </div>
                    <div>
                        <div className="grid grid-cols-2 grid-rows-1">
                            <label
                                htmlFor="subtasks"
                                className="self-center block mb-2  font-medium text-gray-900 dark:text-white">
                                Subtasks
                            </label>
                            <div className="w-1/4 place-self-end">
                                <a
                                    onClick={() => dispatch(addEmptySubtask())}
                                    href={`#slide${task.subtasks.length}`}
                                    className="font-buttons text-xl capitalize btn mb-4 self-end text-gray-700 bg-amber-500/60 hover:bg-amber-500 border-0 hover:text-white border-0">
                                        <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm0 1.5c-4.69 0-8.497 3.808-8.497 8.498s3.807 8.497 8.497 8.497 8.498-3.807 8.498-8.497-3.808-8.498-8.498-8.498zm-.747 7.75h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" clipRule="evenodd"></path></svg>
                                </a>
                            </div>   
                        </div>
                        <div className="carousel carousel-center rounded-box bg-white/50">
                            {
                                task.subtasks.map((st, i) => <SubtaskCard 
                                    subtask_status = {st.subtask_status}
                                    subtask_name = {st.subtask_name}
                                    index={i + 1}
                                    id={st.subtask_id}
                                    lastKey={task.subtasks.length}
                                />)
                            }
                        </div>
                    </div>
                    <button
                        className="w-full">
                        <label
                            htmlFor="task-modal"
                            className="w-full font-buttons text-xl capitalize btn mb-4 self-end bg-lime-600/60 text-gray-700 hover:bg-lime-600 hover:text-white border-0 font-bold">
                            Submit
                        </label>
                    </button>
                </form>
            </div>
        </div>

    </>
}
