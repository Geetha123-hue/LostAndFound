import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import LoginPage from './Components/LoginComponent/LoginPage';
import RegisterUser from './Components/LoginComponent/RegisterUser';
import AdminMenu from "./Components/LoginComponent/AdminMenu";
import StudentMenu from "./Components/LoginComponent/StudentMenu";

import LostItemEntry from "./Components/ItemComponent/LostItemEntry";
import LostItemsReport from "./Components/ItemComponent/LostItemsReport";
import FoundItemEntry from "./Components/ItemComponent/FoundItemEntry";
import FoundItemsReport from "./Components/ItemComponent/FoundItemsReport";
import StudentList from "./Components/LoginComponent/StudentList";
import Dummy from "./Components/ItemComponent/Dummy";
import MyProfile from "./Components/LoginComponent/MyProfile";
import ChatMessage from "./Components/MessageComponents/ChatMessage";
function App() {
  return (
    <div className="bg-green-500 text-white p-10 text-3xl">
      <BrowserRouter>
         <Routes>
         <Route path='/' element={ <LoginPage/> } />
         <Route path='/Register' element={ <RegisterUser/>} /> 
         <Route path='/AdminMenu' element={ <AdminMenu/>} />
         <Route path='/StudentMenu' element={ <StudentMenu/>} />
         <Route path='/lost-entry' element={ <LostItemEntry/>} />
          <Route path='/lost-report' element={ <LostItemsReport/>} />
          <Route path='/found-entry' element={ <FoundItemEntry/>} />
          <Route path='/found-report' element={ <FoundItemsReport/>} />  
          <Route path='/login-page' element={ <LoginPage/> } />  
          <Route path='/student-list' element={ <StudentList/> } />
          <Route path='/my-profile' element={ <MyProfile/> } />
          <Route path='/dummy/:pid' element={ <Dummy/>} />
          <Route path='/chat' element={ <ChatMessage/>} />
        </Routes>
       </BrowserRouter>
 
    </div>
  );
}

export default App;
