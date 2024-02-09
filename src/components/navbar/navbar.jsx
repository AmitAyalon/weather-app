import './navbar.scss'
import { useNavigate } from 'react-router-dom';
import PathConstants from '../../constants/pathConstants';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav id='navigation'>
      <ul>
        {/* iterate the PathConstans */}
        {Object.keys(PathConstants).map((key, index) => (
          <li key={index}>
            <div type='button' className='nav-item' onClick={() => navigate(PathConstants[key])}>
              {key}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
