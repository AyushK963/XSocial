import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

import { useEffect } from 'react'
import { useUserContext } from '../../context/AuthContext'
import { INavLink } from '../../types'
import { useSignOutAccount } from '@/lib/react-query/query'
import { sidebarLinks } from '@/constant'

const LeftSidebar = () => {
  const {mutate: signOut, isSuccess} = useSignOutAccount()
    const navigate = useNavigate()
    const { user } = useUserContext();
    const { pathname } = useLocation();

    useEffect(() => {
        if (isSuccess) navigate(0);
    }, [isSuccess, navigate] )
  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.png"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>
        <Link className='flex gap-3 items-center' to={`/profile/${user.id}`}>
            <img className='h-14 w-14 rounded-full' 
              src={user.imageUrl || '/assets/icons/profile-placeholder.svg'} 
              alt="profile"/>
            <div className='flex flex-col'>
              <p className='body-bold'>
                {user.name}
              </p>
              <p className='small-regular text-light-3'>
                @{user.username}
              </p>
            </div>
        </Link>
        <ul className="flex flex-col gap-4">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}>
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4">
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button className='shad-button_ghost' variant="ghost" 
        onClick={() => signOut()}>
          <img src='/assets/icons/logout.svg' alt='logout' />
          <p className='small-medium lg:base-medium'>Logout</p>
      </Button>

    </nav>
  )
}

export default LeftSidebar