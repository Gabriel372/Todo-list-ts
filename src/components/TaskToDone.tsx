import { ITask } from "./Types";
import React from 'react';
import { useEffect,useState } from "react";
// import TaskToDelete from './TaskToDelete'

interface ITaskDone {
TaskDone: ITask;
setTaskDone: React.Dispatch<React.SetStateAction<ITask | undefined>>;
BoxTask:ITask[];
setBoxTask:React.Dispatch<React.SetStateAction<ITask[]>>;
}

function TaskToDone({ TaskDone,setTaskDone,BoxTask,setBoxTask }: ITaskDone )  {
const [Interrupt,setInterrupt] = useState<boolean>(false)

useEffect(() => {
if (!Interrupt) {
 setInterrupt(true)
 UpdateDoneInBox()
 setInterrupt(false)   
}
},[]) 

function UpdateDoneInBox() {
    let NewTaskdone;
    const BoxIsDone:ITask[] = BoxTask.map((task)=> {
    if (task.id === TaskDone.id) {
       NewTaskdone={ ...task, done: !task.done };
       UpdateTaskDoneInApi(NewTaskdone);
       setTaskDone(NewTaskdone);
       return { ...task, done: !task.done };
    } 
    return task
    } )
       setBoxTask(BoxIsDone);  }

function UpdateTaskDoneInApi(task:ITask) {
    fetch(`http://localhost:3001/alltasks/${task.id}`,{
        method:"PUT",
       headers:{"Content-Type":"application/json"},
       body:JSON.stringify(task) } )
       .then((response) => { 
       if (!response.ok) { throw new Error(`Erro na solicitação: ${response.statusText}`);}
       return response.json(); })
       .then(() =>  { setTaskDone(undefined); })
       .catch((error) => console.log('erro ao atualizar TAREFA',error))   }

    return <div>
    </div>
}

export default TaskToDone