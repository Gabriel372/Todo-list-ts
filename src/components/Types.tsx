import {nanoid} from "nanoid";

export class ITask {
    text:string | undefined;
    done:boolean
    id:string
    constructor(text:string = ''){
    this.text=text  
    this.done=false
    this.id=nanoid()
    }
    }

export type IBoxTask = {
BoxTask:Array<ITask>;
// setBoxTask:(value:Array<ITask>)=> void
setBoxTask:React.Dispatch<React.SetStateAction<Array<ITask>>>; 
}

