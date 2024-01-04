import { ITask } from "./Types";
import React from 'react';
import { useEffect } from "react";

interface ITaskDelete {
    TaskDelete: ITask;
    setTaskDelete: React.Dispatch<React.SetStateAction<ITask | undefined>>;
    // BoxTask:ITask[];
    BoxTask:Array<ITask>;
    setBoxTask:React.Dispatch<React.SetStateAction<Array<ITask>>>;
    }

function TaskToDelete({ TaskDelete,setTaskDelete,BoxTask,setBoxTask }: ITaskDelete ) {
    
    useEffect(() => {
        fetch(`http://localhost:3001/alltasks/${TaskDelete.id}`,{
        method:"DELETE"})
             .then((response) => {
             if (!response.ok) {
             throw new Error(`Erro ao excluir cliente: ${response.status}`); }
             console.log(response)
            return response.json(); })
             .then(() => {console.log(TaskDelete.text); 
                const BoxFiltred = BoxTask.filter((task)=>task.id !== TaskDelete.id ) 
                setBoxTask(BoxFiltred) ;setTaskDelete(undefined) })
             .catch((error) => console.log(error))
      },[TaskDelete]) 

return <div></div>
}

export default TaskToDelete