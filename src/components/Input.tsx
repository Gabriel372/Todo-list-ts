import {  useContext, useState } from 'react';
import StorageTask from './StorageTask';
import GetTaskToBox from './GetTaskToBox';
import {TaskContext, TaskContextProvider }  from './TaskContext'
import { IBoxTask, ITask } from './Types';
import './Input.css'
import { MdAddBox } from "react-icons/md";

function Input() {
const [Text,setText] = useState<string>('')
const [TaskToStorage,setTaskToStorage] = useState<ITask>()
const { BoxTask, setBoxTask } = useContext(TaskContext) as IBoxTask

function ClickNewTask() {
if (Text) {
    const CreateTask = new ITask(Text)
    setTaskToStorage(CreateTask)
     AddTaskInBox(CreateTask) 
    }
else alert('Preencha o formulário') }

function AddTaskInBox(CreateTask:ITask) {
setBoxTask([...BoxTask,CreateTask])    
setText('') }

function handleKeyDown (event: React.KeyboardEvent<HTMLInputElement>)  {
    if (event.key === 'Enter') {  ClickNewTask(); } };

return <div className='container'>
    <div className='squareTodo'>
   <TaskContextProvider >
    <div className='divBtnAddInput'> 
<input autoFocus type="text" placeholder="Digite sua tarefa" value={Text} onChange={(e)=> {setText(e.target.value) } }
  onKeyDown={handleKeyDown} />
<button onClick={ClickNewTask} className='btnAdd'><MdAddBox /></button>
</div>

<GetTaskToBox BoxTask={BoxTask} setBoxTask={setBoxTask}/>
{TaskToStorage && <StorageTask TaskToStorage={TaskToStorage} setTaskToStorage={setTaskToStorage}/> }

</TaskContextProvider> 
</div>

</div>

}

export default Input
