import { useDispatch } from "react-redux"
import { deleteTask, fetchTaskById, putTask } from "../helpers/tasksHelpers";
import SubtaskModal from "./SubtaskModal";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function TableItem(props) {
    const dispatch = useDispatch();

    return <>
        <tr key={ props.id } className="bg-lime-100/60 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50/60 dark:hover:bg-gray-600 text-center">
            <td className="px-6 py-4 text-xl font-items">
                { props.taskName }
            </td>
            <td className="px-6 py-4 text-xl font-items">
                { props.taskStatus }
            </td>
            <td className="px-6 py-4 text-xl font-items flex items-center justify-center">
                <div className="w-1/2 h-1/2">
                    <CircularProgressbar 
                        value={ props.completion } 
                        text={`${ props.completion }%`}
                        styles={{
                            trail: {
                                stroke: "bg-lime-500"
                            }
                        }}/>   
                </div>
            </td>
            <td className="px-6 py-4 text-xl font-items">
                { props.addedAt }   
            </td>
            <td className="px-6 py-4 text-xl font-items">
                { props.deadline}   
            </td>
            <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-center">
                    {
                        props.taskStatus != "Completed"?
                        <>
                            <label
                            onClick={() => dispatch(putTask({
                                task_id: props.id,
                                task_status: "Completed",
                                task_name: props.taskName
                            }))}
                            className="btn font-buttons text-xl capitalize mr-2 bg-green-600/60 text-gray-700 hover:bg-green-600 hover:text-white border-0">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z"/></svg>                    
                                </label>
                        </>
                        :
                        <>
                            <label
                            onClick={() => dispatch(putTask({
                                task_id: props.id,
                                task_status: "Ongoing",
                                task_name: props.taskName
                            }))}
                            className="btn font-buttons text-xl capitalize mr-2 bg-red-600/60 text-gray-700 hover:bg-red-600 hover:text-white border-0">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z"/>
                                </svg>                    
                            </label>
                        </>
                    }
                    {
                        props.hasSubtasks ? 
                        <>
                        <label
                            onClick={() => dispatch(fetchTaskById(props.id))}
                            htmlFor="subtask-modal"
                            className="btn font-buttons text-xl capitalize mr-2 text-gray-700  bg-blue-500/60 hover:bg-blue-500 hover:text-white border-0">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m20.998 8.498h-17.996c-.569 0-1.001.464-1.001.999 0 .118-.105-.582 1.694 10.659.077.486.496.842.988.842h14.635c.492 0 .911-.356.988-.842 1.801-11.25 1.693-10.54 1.693-10.66 0-.558-.456-.998-1.001-.998zm-.964-3.017h-16.03c-.524 0-1.001.422-1.001 1.007 0 .081-.01.016.14 1.01h17.752c.152-1.012.139-.931.139-1.009 0-.58-.469-1.008-1-1.008zm-15.973-1h15.916c.058-.436.055-.426.055-.482 0-.671-.575-1.001-1.001-1.001h-14.024c-.536 0-1.001.433-1.001 1 0 .056-.004.043.055.483z" fillRule="nonzero" clipRule="evenodd"></path>
                                </svg>
                        </label>
                        </>
                        : null
                    }
                    <label
                        onClick={() => dispatch(fetchTaskById(props.id))}
                        htmlFor="task-modal"
                        className="btn font-buttons text-xl capitalize mr-2 text-gray-700 bg-amber-500/60 hover:bg-amber-500 hover:text-white border-0">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.75c0-.414.336-.75.75-.75s.75.336.75.75v9.25c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm-2.011 6.526c-1.045 3.003-1.238 3.45-1.238 3.84 0 .441.385.626.627.626.272 0 1.108-.301 3.829-1.249zm.888-.889 3.22 3.22 8.408-8.4c.163-.163.245-.377.245-.592 0-.213-.082-.427-.245-.591-.58-.578-1.458-1.457-2.039-2.036-.163-.163-.377-.245-.591-.245-.213 0-.428.082-.592.245z" clipRule="evenodd"></path>
                            </svg>
                    </label>
                    <label
                        onClick={() => dispatch(deleteTask(props.id))}
                        className="btn font-buttons text-xl capitalize mr-2 text-gray-700  bg-pink-500/60 hover:bg-pink-500 hover:text-white border-0">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" clipRule="evenodd"></path>
                            </svg>
                    </label>
                </div>
            </td>
        </tr>

        {/* Modal Toggle */}

                <input
            type="checkbox"
            id="subtask-modal"
            className="modal-toggle"
            aria-label="subtask-modal"/>

        {/* Modal Content */}

        <div className="modal overflow-y-scroll bg-transparent/50 backdrop-blur-lg rounded drop-shadow-lg" id="subtask-modal" data-testid="subtask-modal">
            <div className="relative w-3/4 max-h-full">
                <SubtaskModal/>
            </div>
        </div>
    </>

}
