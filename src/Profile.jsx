
import { useState, useEffect } from 'react'
import './Profile.css'

function Profile({ userName, userEmail, onBack }) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(userName || '')
  const [email, setEmail] = useState(userEmail || '')

  // Update input values when parent data changes
  useEffect(() => {
    setName(userName || '')
    setEmail(userEmail || '')
  }, [userName, userEmail])

  function saveProfile(e) {
    e.preventDefault()

    if (!name.trim() || !email.trim()) {
      alert('Please enter your name and email')
      return
    }

    onBack({
      name: name.trim(),
      email: email.trim()
    })

    setIsEditing(false)
  }

  function cancelEdit() {
    setName(userName || '')
    setEmail(userEmail || '')
    setIsEditing(false)
  }

  return (
    <div className="profile-page">
      <div className="profile-card">

        <button
          type="button"
          className="back-button"
          onClick={() => onBack()}
        >
          ← Back to Dashboard
        </button>

        <div className="profile-avatar">👤</div>

        <h1>My Profile</h1>

        <p className="profile-subtitle">
          Manage your personal information
        </p>

        {isEditing ? (
          <form onSubmit={saveProfile} className="profile-form">

            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />

            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />

            <button type="submit">
              Save Changes
            </button>

            <button
              type="button"
              className="cancel-button"
              onClick={cancelEdit}
            >
              Cancel
            </button>

          </form>
        ) : (
          <div className="profile-details">

            <div className="profile-detail">
              <span>Full Name</span>
              <strong>{userName || 'Not provided'}</strong>
            </div>

            <div className="profile-detail">
              <span>Email Address</span>
              <strong>{userEmail || 'Not provided'}</strong>
            </div>

            <div className="profile-note">
              Keep your profile details up to date.
            </div>

            <button
              type="button"
              onClick={() => setIsEditing(true)}
            >
              ✏️ Edit Profile
            </button>

          </div>
        )}

      </div>
    </div>
  )
}

export default Profile
