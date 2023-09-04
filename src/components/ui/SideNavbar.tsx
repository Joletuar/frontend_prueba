import { NavLink } from 'react-router-dom';

import { NAVBAR_LINKS } from '../../lib/constants/navbarLinks';

export const SideNavbar = () => {
  return (
    <nav>
      <ul className='nav flex-column h-100 justify-content-center gap-5 align-items-center'>
        {NAVBAR_LINKS.map(({ title, to }) => (
          <li className='nav-item fs-2' key={title}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive ? 'nav-link nav-active' : 'nav-link'
              }
            >
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
