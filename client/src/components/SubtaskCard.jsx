import { useEffect, useState } from "react"
import { modifySubtask, deleteSubtask } from "../features/tasksSlice";

export default function SubtaskCard(props) {
    const [body, setBody] = useState({});

    function handleTextChange(e) {
        switch (e.nativeEvent.target.id) {
        case "subtaskName":
            setBody({
                ...body,
                subtask_name: e.target.value,
            })
            break;
        case "subtaskStatus":
            setBody({
                ...body,
                subtask_status: e.target.value,
            })
            break;
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(modifySubtask({id: props.index-1, body: body}))
    }

    useEffect(() => setBody(props), []);
    
    return <>
    <div id={`slide${props.index}`}  key={props.id} className="carousel-item relative w-full justify-center p-2">        
        <div 
            className="m-4 w-3/4">
            <div className="flex flex-row block mb-2">
                <label
                    htmlFor="subtaskName"
                    className="font-medium text-gray-900 dark:text-white">
                        Subtask Name
                </label>
                <p className="text-red-600 ml-1">(★)</p>
            </div>
            <input
                type="text"
                name="subtaskName"
                id="subtaskName"
                className="bg-white/50 border border-gray-200/50 text-gray-900  rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="ex. Chopping Vegetables"
                onChange={ handleTextChange }
                value={ body.subtask_name }
                aria-label="subtaskName"
            />
            <div className="flex flex-row block mt-2 mb-2">
                <label
                    htmlFor="subtaskStatus"
                    className="font-medium text-gray-900 dark:text-white">
                        Subtask Status
                </label>
                <p className="text-red-600 ml-1">(★)</p>
            </div>
            <select
                name="subtaskStatus"
                id="subtaskStatus"
                value={ body.subtask_status }
                onChange={ handleTextChange }
                className="bg-white/50 border border-gray-200/50 text-gray-900  rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
                <option value="Due" disabled>Due</option>
            </select>
            <div className="grid grid-cols-2 grid-rows-1 items-center mt-4  ">
                <label
                    onClick={() => dispatch(deleteSubtask(props.index-1))}
                    className="btn w-1/3 place-self-center border-0 text-gray-700 bg-pink-500/60 hover:bg-pink-500 hover:text-white rounded-box p-3 dark:hover:bg-gray-800 dark:hover:text-white">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" clipRule="evenodd"></path>
                    </svg>
                </label>  
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn w-1/3 place-self-center border-0 text-gray-700 bg-lime-600/60 hover:bg-lime-600 hover:text-white rounded-box p-3 dark:hover:bg-gray-800 dark:hover:text-white">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M14 3h2.997v5h-2.997v-5zm9 1v20h-22v-24h17.997l4.003 4zm-17 5h12v-7h-12v7zm14 4h-16v9h16v-9z" clipRule="evenodd"></path></svg>
                </button>  
            </div>
        </div>
        {
            props.lastKey > 1 ? <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href={props.index == 1 ? `#slide${props.lastKey}`: `#slide${props.index - 1}`} className="btn btn-circle w-6 h-10 bg-black/30 border-0">❮</a> 
            <a href={props.index == props.lastKey ?  `#slide1`:`#slide${props.index + 1}`} className="btn btn-circle w-6 h-10 bg-black/30 border-0">❯</a>
            </div> : null
        }
        
    </div>
    </>
}