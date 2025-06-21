import { 
    HomeIcon,  
    Search,
    CheckCircle2,
    MessageSquare,
    Settings,
    ArrowUpFromLine,
    Bell
} from 'lucide-react'


export const items = [
        {
            id : 1,
            icon : <HomeIcon className='w-5 h-5'/>,
            text: 'Dashboard',
            to: '/'
        },
        {
            id : 2,
            icon : <Search className='w-5 h-5' />,
            text : 'Explore Tasks',
            to: '/exploretasks'
        },
        {
            id: 3,
            icon: <ArrowUpFromLine className='w-5 h-5' />,
            text : 'Uploaded Tasks',
            to: '/uploadedtasks'
        },
        {
            id : 4,
            icon : <MessageSquare className='w-5 h-5' />,
            text : 'Messages',
            to: '/messages'
        },
        {
            id : 5,
            icon : <Bell />,
            text : 'Notifications',
            to: '/notification'
        },
        {
            id : 6,
            icon : <Settings className='w-5 h-5' />,
            text : 'Settings',
            to: '/settings'
        }
    ];