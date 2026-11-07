function Navbar({ onProfileClick }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>Job Tracker</h2>
        <p>My Job Applications</p>
      </div>

      <button
        type="button"
        onClick={onProfileClick}
        aria-label="Open my profile"
      >
        👤 My Profile
      </button>
    </nav>
  )
}

export default Navbar