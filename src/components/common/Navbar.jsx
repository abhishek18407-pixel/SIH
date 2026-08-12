import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  Home,
  PlusCircle,
  Search,
  ClipboardList,
  Info,
  Menu,
  X,
} from 'lucide-react'
import Brand from './Brand'
import Container from './Container'
import './Navbar.css'

/**
 * Navbar — Responsive main navigation component for CivicAI
 *
 * SIH Problem Statement: SIH260011
 */
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Report', path: '/report', icon: PlusCircle },
    { label: 'Track', path: '/track', icon: Search },
    { label: 'My Complaints', path: '/my-complaints', icon: ClipboardList },
    { label: 'About', path: '/about', icon: Info },
  ]

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Close mobile drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  return (
    <nav className="navbar" aria-label="Main navigation">
      <Container size="xl">
        <div className="navbar__inner">
          {/* Brand Logo Link */}
          <Link to="/" className="navbar__brand-link" onClick={closeMenu} aria-label="CivicAI Home">
            <Brand size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="navbar__menu">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                    }
                  >
                    <Icon className="navbar__link-icon" aria-hidden="true" size={18} />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              )
            })}
          </ul>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="navbar__toggle"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div id="mobile-nav-menu" className="navbar__mobile-menu">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.path} className="navbar__mobile-item">
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`
                    }
                  >
                    <Icon aria-hidden="true" size={20} />
                    <span>{item.label}</span>
                  </NavLink>
                </div>
              )
            })}
          </div>
        )}
      </Container>
    </nav>
  )
}

export default Navbar
