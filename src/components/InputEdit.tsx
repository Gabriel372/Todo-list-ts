
import {ITask} from './Types'
import { useState } from 'react'; 
import { FaSave } from "react-icons/fa";
import './InputEdit.css'

interface IEditTask {
    EditTaskInput: ITask;
    setEditTaskInput: React.Dispatch<React.SetStateAction<ITask | null>>;
    BoxTask:Array<ITask>;
    setBoxTask:React.Dispatch<React.SetStateAction<Array<ITask>>>; }

function InputEdit({EditTaskInput,setEditTaskInput,BoxTask,setBoxTask}:IEditTask  ) {
    const [InputValue,setInputValue] = useState<string | undefined>(EditTaskInput.text)
   
function ChangeTaskEdit(e: React.ChangeEvent<HTMLInputElement>){
 setInputValue(e.target.value)}

function ClickTaskEdit() {
if (InputValue) {
    let NewTaskEdit;
    const BoxEdit = BoxTask.map((task)=> {
     if (task.id === EditTaskInput?.id) {
    NewTaskEdit={ ...task,text:InputValue};

    UpdateTaskEditInApi(NewTaskEdit);
    setEditTaskInput(NewTaskEdit);
    return { ...task,text:InputValue} } 
    return task  } )
    setBoxTask(BoxEdit);   }
else {alert('Preencha o formulário')} }

function UpdateTaskEditInApi(task:ITask) {
    fetch(`http://localhost:3001/alltasks/${task.id}`,{
        method:"PUT",
       headers:{"Content-Type":"application/json"},
       body:JSON.stringify(task) } )
       .then((response) => { 
       if (!response.ok) { throw new Error(`Erro na solicitação: ${response.statusText}`);}
       return response.json(); })
       .then(() =>  { setEditTaskInput(null); })
       .catch((error) => console.log('erro ao atualizar TAREFA',error))  }

       function handleKeyDown (event: React.KeyboardEvent<HTMLInputElement>)  {
        if (event.key === 'Enter') { 
          ClickTaskEdit();
        }
      };

return<div className='divInputEdit'>
<input type="text" autoFocus value={InputValue} onChange={(e) => ChangeTaskEdit(e)}
onKeyDown={handleKeyDown}/>

<button onClick={ClickTaskEdit } className='btnSave'><FaSave /></button>
</div>

}

export default InputEdit