import logo from '../../images/argentBankLogo.webp';
import userIcon from '../../images/user.webp';
import signOut from '../../images/signout.webp';
import '../../styles/nav-style/nav.css';
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { userSignOut } from '../../actions';

function NavBar () {
    const isConnected = useSelector((state) => state.connected);
    const dispatch = useDispatch();
    const username = useSelector((state) => state.username);

    const handleSignOut = () => {
        dispatch(userSignOut());
      };
    return (
        <header className='head'>
            <NavLink className='link' to={'/'}>
                <img className='header__logo' src={logo} alt='error'/>
            </NavLink>
                {isConnected ? (
                    <nav className='nav'>
                        <img className='header__logo' src={userIcon} alt='error'/>
                        <NavLink className='link' to={'/user'}>{username}</NavLink>
                        <img className='logoSignOut' src={signOut} alt='error'/>
                        <NavLink className='link' to={'/'} onClick={handleSignOut}>Sign Out</NavLink>
                    </nav>
                ) : (
                    <nav className='nav'>
                        <img className='header__logo' src={userIcon} alt='error'/>
                        <NavLink className='link' to={'/signIn'}>Sign In</NavLink>
                    </nav>
                )}
        </header>
    ) 
}

export default NavBar