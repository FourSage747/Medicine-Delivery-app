import css from './Css.module.css'
import { NavLink, useLocation} from 'react-router-dom';

export const Header = () => {
  const location = useLocation();

  return (
    <div className={css.navMenu}>
      <NavLink className={`${css.navLink} ${
          location.pathname === '/' ? css.navLinkActive : ''
        }`} to="/">
        Shop
      </NavLink>
      <NavLink className={`${css.navLink} ${
          location.pathname === '/ShoppingCart' ? css.navLinkActive : ''
        }`} to="/ShoppingCart">
        ShoppingCart
      </NavLink>
    </div>
  );
};
