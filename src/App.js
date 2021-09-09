import "./App.css";
import { useEffect, useState } from "react";
import { useGetObject } from "./hooks";
import trash_icon from "./assets/trash.svg"
import add_icon from "./assets/add.svg"
import bulb_icon from "./assets/bulb.svg"
import arrow_icon from "./assets/arrow.svg"
import Window from "./componets/Window"
import Tab from "./componets/Tab"
import User from "./componets/User"

const App = () => {
  //cree un custom hook para obtener los usuarios y ordenarlos
  const objectData = useGetObject();

  const modules = Object.keys(objectData);
  const [selectedModule, setSelectedModule] = useState(modules[0]);

  const [types, setTypes] = useState(Object.keys(objectData[selectedModule]));
  const [selectedType, setSelectedType] = useState(types[0]);

  const [users, setUsers] = useState(objectData[selectedModule][selectedType]);

  const changeModule = (module) =>{
    setSelectedModule(module)
    setTypes(Object.keys(objectData[module]))
    setSelectedType(Object.keys(objectData[module])[0])
    setUsers(objectData[module][Object.keys(objectData[module])[0]]);
  }

  const changeType = (type) =>{
    setSelectedType(type)
    console.log(objectData[selectedModule][type], selectedModule, type);
    setUsers(objectData[selectedModule][type]);
  }

  useEffect(() => {
    //aca se imprime el objeto
    console.log(objectData, "object");
  }, [objectData]);

  return (
    <div className="App">
      <Window
        header={
          <>
            {modules.map((item) => {
              return <Tab key={item} name="module" value={item} checked={item === selectedModule} onclick={()=> changeModule(item)}/>;
            })}
          </>
        }
      >
        <Window
          header={
            <>
              {types.map((item) => {
                return <Tab key={item} name="type" value={item} checked={item === selectedType} onclick={()=> changeType(item)}/>;
              })}
            </>
          }
        >
          <>
          <h3>Number of users in {selectedType}:</h3>
          <div className="list-users">
            {users && users.map((item) => {
              return <User key={item} name={item}/>;
            })}
          </div>
          <div className="actions">
            <button className="btn delete">Delete <img alt="" src={trash_icon}/></button>
            <button className="btn advice">Advice <img alt="" src={bulb_icon}/></button>
            <button className="btn create"><img alt="" src={add_icon}/> Create</button>
            <button className="btn submit">Submit <img alt="" src={arrow_icon}/></button>
          </div>
          </>
        </Window>
      </Window>
    </div>
  );
};

export default App;
