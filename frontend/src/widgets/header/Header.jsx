import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  return (
    <header>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Link to="/">2SIYHK</Link>
        </div>
        <ul className={styles.nav}>
          <li className={styles.navItem}>
            <Link to="/auth" className={styles.navLink}>
              <FaSignInAlt />
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/profile" className={styles.navLink}>
              <FaUser />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
