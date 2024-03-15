import style from './ModalEditTask.module.css'
import { useState } from 'react'
import {ITask  } from "./Types";

interface IModalEdtIsTrue {
    ModalEdtIsTrue:boolean;
    setModalEdtIsTrue: React.Dispatch<React.SetStateAction<boolean>>;
    TaskEdit:ITask | undefined;
    setTaskEdit:React.Dispatch<React.SetStateAction<ITask | undefined>>;
    BoxTask:Array<ITask>;
setBoxTask:React.Dispatch<React.SetStateAction<Array<ITask>>>;
}

function ModalEditTask({ ModalEdtIsTrue,setModalEdtIsTrue,TaskEdit,setTaskEdit,BoxTask,setBoxTask}:IModalEdtIsTrue  ) {
const [InpValue,setInpValue] = useState<undefined | string >(TaskEdit?.text) 

function ChangeTaskEdit(e: React.ChangeEvent<HTMLInputElement>){
    setInpValue(e.target.value);  }
    
 function ClickTaskEdit() {
let NewTaskEdit;
const BoxEdit = BoxTask.map((task)=> {
 if (task.id === TaskEdit?.id) {
NewTaskEdit={ ...task,text:InpValue};
UpdateTaskEditInApi(NewTaskEdit);
setTaskEdit(NewTaskEdit);
return { ...task,text:InpValue} } 
return task  } )
setBoxTask(BoxEdit);     
console.log(BoxTask) }

function UpdateTaskEditInApi(task:ITask) {
    fetch(`http://localhost:3001/alltasks/${task.id}`,{
        method:"PUT",
       headers:{"Content-Type":"application/json"},
       body:JSON.stringify(task) } )
       .then((response) => { 
       if (!response.ok) { throw new Error(`Erro na solicitação: ${response.statusText}`);}
       return response.json(); })
       .then(() =>  { setTaskEdit(undefined); })
       .catch((error) => console.log('erro ao atualizar TAREFA',error))  }

return <div className={`${ModalEdtIsTrue ? style.modalOn : style.modalOff}`}>
 <div className={style.squareDel}> 
 <button  className={style.btnNot} onClick={()=>{setModalEdtIsTrue(false)}}>Fexar</button>

<input type='text' value={InpValue} onChange={(e) => ChangeTaskEdit(e)}/>

<button  className={style.btnNot} onClick={ClickTaskEdit}>Atualizar</button>

 </div>  

</div> 

}

export default ModalEditTask