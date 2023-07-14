import React from "react";
import GroupVacationContainer from '../containers/GroupVacationContainer.jsx';
import VacationContainer from '../containers/VactionContainer.jsx';


const App = () => {

  return (
    <div className="mainApp">
      <GroupVacationContainer/>
      <VacationContainer/>
    </div>
  );
};

export default App;