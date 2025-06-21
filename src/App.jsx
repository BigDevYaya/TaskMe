import { Routes, Route } from "react-router"
import Dashboard from "./Pages/Dashboard"
import Exploretasks from './Pages/Exploretasks'
import Messages from './Pages/Messages'
import Home from "./Pages/Home"
import HelpCenter from './Pages/HelpCenter'
import Settings from './Pages/Settings'
import { routes } from "./Utils/routes"
import UploadedTasks from "./Pages/UploadedTasks"
import TaskDetailPage from "./Pages/TaskDetail"
import Login from './Pages/Login'
import SignUp from "./Pages/SignUp"
import Notifications from "./Pages/Notifications"

function App() {
  const user = true
  return (
    <Routes>
      {
        user && <Route element={<Home />}>
        <Route path="/" element={<Dashboard />} />
        <Route path={routes.dashboard} element={<Dashboard />} />
        <Route path={routes.exploreTasks}element={<Exploretasks />} />
        <Route path={routes.messages} element={<Messages />} />
        <Route path={routes.settings} element={<Settings />} />
        <Route path={routes.helpCenter} element={<HelpCenter />} />
        <Route path={routes.uploaded} element={<UploadedTasks />} />
        <Route path={routes.taskdetail} element={<TaskDetailPage />} />
        <Route path={routes.notifications} element={<Notifications />} />
      </Route> 
      }
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}

export default App
