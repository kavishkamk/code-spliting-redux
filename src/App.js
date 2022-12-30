import './App.css';
import Component from './component';
import nameSlice from './components/features/nameSlice';
import {injectReducer} from "./store";

function App() {
  // replaceReducer({fname: nameSlice})
  // 
  // store.replaceReducer(nameSlice);
  injectReducer({fname: nameSlice});
  return (
    <div className="App">
      <div>hi</div>
      <Component />
    </div>
  );
}

export default App;
