import React from 'react'
import Dashboard from './Dashboard'
import SideMenu from '../Components/SideMenu'
import Header from '../Components/Header'
import Login from './Login'
import { Outlet, useLocation } from 'react-router'
import { useState } from 'react'
import Explore from '../Components/Explore'

const Home = () => {
  const location = useLocation();

  const isSettingsPage = location.pathname.includes('settings');
  const isMessagesPage = location.pathname.includes('messages');
  const isExploreTasksPage = location.pathname.includes('exploretasks');
  const isUploadTasksPage = location.pathname.includes('uploadedtasks');
  const isHelpCenterPage = location.pathname.includes('helpcenter');
  const isTaskDetailPage = location.pathname.includes('task-')
  const isNotificationsPage = location.pathname.includes('notification')

  function getHeader() {
  if (isUploadTasksPage) return <Header title="My Tasks" explore={<Explore className={'flex'} />} />;
  if (isHelpCenterPage) return null;
  if (isSettingsPage) return null;
  if (isMessagesPage) return null;
  if (isExploreTasksPage) return <Header title="Explore Tasks" explore={<Explore />} />;
  if (isTaskDetailPage) return null;
  if (isNotificationsPage) return null;
  return <Header title="Dashboard" />;
}


  return (
    <div className='flex'>
        <div className='sticky top-0 z-50 bottom-0 '>
            <SideMenu />
        </div>
        <main className='flex flex-1 flex-col'>
            <div className='sticky top-0 z-50'>
                  {
                    getHeader()
                  }
            </div>
        <Outlet />
        </main>
    </div>
  )
}

export default Home