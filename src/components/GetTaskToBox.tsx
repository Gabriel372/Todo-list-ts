import { useEffect,useState } from "react";
import TaskToDelete from './TaskToDelete'
import TaskToDone from "./TaskToDone";
import './GetTaskToBox.css'
// import ModalEditTask from "./ModalEditTask";
import {IBoxTask,ITask  } from "./Types";
import InputEdit from "./InputEdit";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { FaCheckSquare } from "react-icons/fa";
import { CiSquareCheck } from "react-icons/ci";

function GetTaskToBox ({ BoxTask,setBoxTask }:IBoxTask ) {
const [TaskDelete,setTaskDelete] = useState<ITask>()
const [TaskDone,setTaskDone] = useState<ITask>()
const [ModalEdtIsTrue,setModalEdtIsTrue] = useState<boolean>(false) 
// const [TaskEdit,setTaskEdit] = useState<ITask>() 
const [EditTaskInput,setEditTaskInput] = useState<ITask | null>(null) 

useEffect(() => {
      fetch('http://localhost:3001/alltasks')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');  }
        return response.json();  })
      .then(data => {
        setBoxTask(data);  })
      .catch(error => {
        console.error('ERRO A PEGAR TAREFAS:', error) })
    },[ModalEdtIsTrue]) 

    return  (
      <ul >
        {BoxTask.map((task) => (
          <li key={task.id} className={`${task.done ? 'LineThrough' : '' }`}>
            {EditTaskInput && EditTaskInput.id === task.id ? (
              <InputEdit
                EditTaskInput={EditTaskInput}
                setEditTaskInput={setEditTaskInput}
                BoxTask={BoxTask}
                setBoxTask={setBoxTask}
              />
            ) : ( 
            <div className="divTextBtn">
                <span className="TaskP">{task.text}</span>

                <div className="divBtn">
                  <button onClick={() => setEditTaskInput(task)}>
                    <FaPencilAlt />
                  </button>
                  <button onClick={() => setTaskDelete(task)}>
                    <FaTrashCan />
                  </button>
                  <button onClick={() => setTaskDone(task)}>
                    {task.done ? <FaCheckSquare /> : <CiSquareCheck />}
                  </button>
                  </div>

                </div>
            )}
                {/* <button onClick={()=> {setModalEdtIsTrue(true);setTaskEdit(task) }}>Editar</button> */}
          </li>
        ))}
            {/* {ModalEdtIsTrue && <ModalEditTask ModalEdtIsTrue={ModalEdtIsTrue} setModalEdtIsTrue={setModalEdtIsTrue}
     TaskEdit={TaskEdit} setTaskEdit={setTaskEdit} BoxTask={BoxTask} setBoxTask={setBoxTask} />} */}
        {TaskDelete && (
          <TaskToDelete
            TaskDelete={TaskDelete}
            setTaskDelete={setTaskDelete}
            BoxTask={BoxTask}
            setBoxTask={setBoxTask}
          />
        )}
        {TaskDone && (
          <TaskToDone
            TaskDone={TaskDone}
            setTaskDone={setTaskDone}
            BoxTask={BoxTask}
            setBoxTask={setBoxTask}
          />
        )}
      </ul>
    );
    
}

export default GetTaskToBox