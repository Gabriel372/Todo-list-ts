import { createContext, useState,ReactNode } from 'react';
import {ITask} from './Types'

interface  Props {
  children:ReactNode
   }
export const TaskContext = createContext({});

export function TaskContextProvider({children}:Props) {  
  const [BoxTask,setBoxTask] = useState<Array<ITask>>([]);

  return (
    <TaskContext.Provider value={{ BoxTask, setBoxTask}}>
      {children}
    </TaskContext.Provider>
  );
};
