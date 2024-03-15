import { ITask } from "./Types";
import { useEffect,useState } from "react";

interface ITaskToStorage {
  TaskToStorage: ITask;
  setTaskToStorage: React.Dispatch<React.SetStateAction<ITask | undefined>>;
}

function StorageTask({ TaskToStorage,setTaskToStorage }: ITaskToStorage ) {
  const [Interrupt,setInterrupt] = useState<boolean>(false)

useEffect(() => {

  if (!Interrupt) {
    setInterrupt(true)
    fetch('http://localhost:3001/alltasks',{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(TaskToStorage) })
      .then((response) => response.json())
      .then((data) => { console.log('SUCESSO!',data); setTaskToStorage(undefined);setInterrupt(false) })  
      .catch((error) => console.log(error)) ;setInterrupt(false) }
    },[TaskToStorage]) 

    return <div>
    </div>
}

export default StorageTask
