// Header.js

import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="header-nav">
      <ul className="header-nav-list">
        <li className="header-nav-item">
          <Link to="/" className="header-nav-link">Home</Link>
        </li>
        <li className="header-nav-item">
          <Link to="/add-problem" className="header-nav-link">Add Problem</Link>
        </li>
        <li className="header-nav-item">
          <Link to="/test-creator" className="header-nav-link">Create Test</Link>
        </li>
        <li className="header-nav-item">
          <Link to="/tests" className="header-nav-link">Tests</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
