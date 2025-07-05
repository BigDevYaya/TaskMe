import React from 'react'
import Dashboard from './Dashboard'
import SideMenu from '../Components/SideMenu'
import Header from '../Components/Header'
import Login from './Login'
import { Outlet, useLocation } from 'react-router'
import { useState } from 'react'
import MobileNav from '../Components/MobileNav'
import Explore from '../Components/Explore'

const Home = () => {
  const location = useLocation();
  const [showNav, setShowNav] = useState(false)

  const isSettingsPage = location.pathname.includes('settings');
  const isMessagesPage = location.pathname.includes('messages');
  const isExploreTasksPage = location.pathname.includes('exploretasks');
  const isUploadTasksPage = location.pathname.includes('uploadedtasks');
  const isHelpCenterPage = location.pathname.includes('helpcenter');
  const isTaskDetailPage = location.pathname.includes('task-')
  const isNotificationsPage = location.pathname.includes('notification')

  function getHeader() {
  if (isUploadTasksPage) return <Header title="My Tasks" setShowNav={setShowNav} explore={<Explore className={'flex'}/>} className={'flex'}  />;
  if (isHelpCenterPage) return null;
  if (isSettingsPage) return null;
  if (isMessagesPage) return null;
  if (isExploreTasksPage) return <Header title="Explore Tasks" setShowNav={setShowNav} explore={<Explore />} className={'flex'} />;
  if (isTaskDetailPage) return null;
  if (isNotificationsPage) return null;
  return <Header title="Dashboard" setShowNav={setShowNav}/>;
}


  return (
    <div className='flex'>
        <div className='sticky top-0 z-50 bottom-0 '>
             { isUploadTasksPage ? <SideMenu selectedIndex={3} /> : isExploreTasksPage ? <SideMenu selectedIndex={2} /> : isMessagesPage ? <SideMenu selectedIndex={4} /> : isNotificationsPage ? <SideMenu selectedIndex={5} /> : isSettingsPage ? <SideMenu selectedIndex={6} /> : <SideMenu selectedIndex={1} />}
        </div>
        <main className='flex flex-1 flex-col'>
            <div className='sticky top-0 z-50'>
                  {
                    getHeader()
                  }
            </div>
        <Outlet />
        </main>

      {
            showNav && <MobileNav setShowNav={setShowNav} isOpen={showNav} />
      }
    </div>
  )
}

export default Home