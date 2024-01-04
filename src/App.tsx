
import './App.css';
import Input from './components/Input';
import {TaskContextProvider} from './components/TaskContext'

function App() {



return (   <TaskContextProvider >
    <div className="App">
<Input/>
    </div>
    </TaskContextProvider >

  );
}

export default App;
