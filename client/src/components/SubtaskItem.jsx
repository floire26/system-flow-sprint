import { useDispatch } from "react-redux";
import { deleteSubtask, modifySubtask } from "../features/tasksSlice";

export default function SubtaskItem(props) {
    const dispatch = useDispatch();

    return <>
        <tr key={ props.id } className="bg-lime-100/60 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50/60 dark:hover:bg-gray-600 text-center">
            <td className="px-6 py-4 text-xl font-items">
                    { props.subtaskName }
            </td>
            <td className="px-6 py-4 text-xl font-items">
                    { props.subtaskStatus }
            </td>
            <td className="px-6 py-4">
                    {
                        props.subtaskStatus != "Completed"?
                        <>
                            <label
                            onClick={() => dispatch(modifySubtask({
                                body: {
                                    subtask_name: props.subtaskName,
                                    subtask_status: "Completed",
                                    subtask_id: props.id
                                },
                                id : props.id
                            }))}
                            className="btn font-buttons text-xl capitalize mr-2 bg-green-600/60 text-gray-700 hover:bg-green-600 hover:text-white border-0">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z"/></svg>                    
                                </label>
                        </>
                        :
                        <>
                            <label
                            onClick={() => dispatch(modifySubtask({
                                body: {
                                    subtask_name: props.subtaskName,
                                    subtask_status: "Ongoing",
                                    subtask_id: props.id
                                },
                                id : props.id
                            }))}
                            className="btn font-buttons text-xl capitalize mr-2 bg-red-600/60 text-gray-700 hover:bg-red-600 hover:text-white border-0">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z"/>
                                </svg>                    
                            </label>
                        </>
                    }
                <label
                    onClick={() => dispatch(deleteSubtask(props.id))}
                    className="btn font-buttons text-xl capitalize mr-2 text-gray-700  bg-pink-500/60 hover:bg-pink-500 hover:text-white border-0">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" clipRule="evenodd"></path>
                        </svg>
                </label>
            </td>
        </tr>
    </>
}