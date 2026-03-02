import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Store, Search, SquarePlus, Loader2, User, LogOut } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ onSearch }) => {
  const { cartCount } = useCart();
  const { loading } = useProducts();
  const { userInfo, logout } = useAuth();
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="logo">
          <Store size={28} />
          <span>MiniStore</span>
        </Link>

        {!isAuthPage && (
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              onChange={(e) => onSearch(e.target.value)}
            />
            {loading ? (
              <Loader2 size={20} className="search-icon animate-spin" />
            ) : (
              <Search size={20} className="search-icon" />
            )}
          </div>
        )}

        <div className="nav-links">
          {userInfo && userInfo.isAdmin && (
            <Link to="/upload" className="upload-link" title="Upload Product">
              <SquarePlus size={24} />
            </Link>
          )}

          {!isAuthPage && (
            <Link to="/cart" className="cart-link">
              <ShoppingCart size={24} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          )}

          {userInfo ? (
            <div className="user-nav">
              <span className="user-name">
                <User size={18} />
                {userInfo.name.split(' ')[0]}
              </span>
              <button onClick={logout} className="logout-btn" title="Logout">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="login-link">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
