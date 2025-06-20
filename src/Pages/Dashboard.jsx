import DashboardStats from '../Components/DashboardStats'
import RecentTasksList from '../Components/RecentTasksList'
import QuickActions from '../Components/QuickActions'
import TaskCalendar from '../Components/TaskCalendar'
import WeeklyTasksChart from '../Components/WeeklyTasksChart'

const Dashboard = () => {
  return (
   <div className="p-4 space-y-6">
      <DashboardStats />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <WeeklyTasksChart />
          <RecentTasksList />
        </div>
        <div className="space-y-4">
          <QuickActions />
          <TaskCalendar />
        </div>
      </div>
    </div>
  )
}

export default Dashboard