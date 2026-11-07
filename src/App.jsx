import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import JobCard from './Jobcard'
import './App.css'
import Login from './Login'
import Profile from './Profile'

const validStatuses = [
  'Applied',
  'Interview',
  'Selected',
  'Rejected',
  'Pending',
]

function getTodayDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const initialJobs = [
  {
    id: 1,
    company: 'Google',
    role: 'Frontend Developer',
    status: 'Applied',
    applicationDate: '',
    notes: '',
    interviewDate: '',
    interviewTime: '',
  },
  {
    id: 2,
    company: 'Microsoft',
    role: 'React Developer',
    status: 'Interview',
    applicationDate: '',
    notes: '',
    interviewDate: '',
    interviewTime: '',
  },
  {
    id: 3,
    company: 'Infosys',
    role: 'Web Developer',
    status: 'Pending',
    applicationDate: '',
    notes: '',
    interviewDate: '',
    interviewTime: '',
  },
]

function loadJobs() {
  try {
    const savedJobs = localStorage.getItem('jobs')

    if (!savedJobs) {
      return initialJobs
    }

    const parsedJobs = JSON.parse(savedJobs)

    if (!Array.isArray(parsedJobs)) {
      return initialJobs
    }

    return parsedJobs.map((job) => ({
      ...job,
      status: job.status || 'Pending',
      applicationDate: job.applicationDate || '',
      notes: job.notes || '',
      interviewDate: job.interviewDate || '',
      interviewTime: job.interviewTime || '',
    }))
  } catch (error) {
    console.error('Error loading jobs:', error)
    return initialJobs
  }
}

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [jobs, setJobs] = useState(loadJobs)

  // Add job form states
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [status, setStatus] = useState('Applied')
  const [applicationDate, setApplicationDate] = useState(getTodayDate)
  const [notes, setNotes] = useState('')
  const [interviewDate, setInterviewDate] = useState('')
  const [interviewTime, setInterviewTime] = useState('')

  // Search, filter and sorting
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [sortBy, setSortBy] = useState('company')

  // Edit job form states
  const [editingId, setEditingId] = useState(null)
  const [editCompany, setEditCompany] = useState('')
  const [editRole, setEditRole] = useState('')
  const [editStatus, setEditStatus] = useState('Applied')
  const [editApplicationDate, setEditApplicationDate] = useState('')
  const [editNotes, setEditNotes] = useState('')
  const [editInterviewDate, setEditInterviewDate] = useState('')
  const [editInterviewTime, setEditInterviewTime] = useState('')

  // Login states
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem('isLoggedIn') === 'true'
  )

  const [userName, setUserName] = useState(
    () => localStorage.getItem('userName') || ''
  )

  const [userEmail, setUserEmail] = useState(
    () => localStorage.getItem('userEmail') || ''
  )

  // Profile page
  const [showProfile, setShowProfile] = useState(false)

  // Save jobs in LocalStorage
  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs))
  }, [jobs])

  // Save login information
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userName', userName)
      localStorage.setItem('userEmail', userEmail)
    } else {
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('userName')
      localStorage.removeItem('userEmail')
    }
  }, [isLoggedIn, userName, userEmail])

  // Add a new job
  function addJob(e) {
    e.preventDefault()

    if (!company.trim() || !role.trim()) {
      alert('Please enter company name and job role.')
      return
    }

    const newJob = {
      id: Date.now(),
      company: company.trim(),
      role: role.trim(),
      status,
      applicationDate,
      notes: notes.trim(),
      interviewDate,
      interviewTime,
    }

    setJobs((prev) => [...prev, newJob])

    // Reset add form
    setCompany('')
    setRole('')
    setStatus('Applied')
    setApplicationDate(getTodayDate())
    setNotes('')
    setInterviewDate('')
    setInterviewTime('')
  }

  // Delete a job
  function deleteJob(id) {
    setJobs((prev) => prev.filter((job) => job.id !== id))

    if (editingId === id) {
      cancelEdit()
    }
  }

  // Load selected job into edit form
  function startEdit(job) {
    setEditingId(job.id)
    setEditCompany(job.company)
    setEditRole(job.role)
    setEditStatus(job.status || 'Pending')
    setEditApplicationDate(job.applicationDate || '')
    setEditNotes(job.notes || '')
    setEditInterviewDate(job.interviewDate || '')
    setEditInterviewTime(job.interviewTime || '')
  }

  // Save edited job
  function saveEdit() {
    if (!editCompany.trim() || !editRole.trim()) {
      alert('Please enter company name and job role.')
      return
    }

    setJobs((prev) =>
      prev.map((job) =>
        job.id === editingId
          ? {
              ...job,
              company: editCompany.trim(),
              role: editRole.trim(),
              status: editStatus,
              applicationDate: editApplicationDate,
              notes: editNotes.trim(),
              interviewDate: editInterviewDate,
              interviewTime: editInterviewTime,
            }
          : job
      )
    )

    cancelEdit()
  }

  // Cancel editing
  function cancelEdit() {
    setEditingId(null)
    setEditCompany('')
    setEditRole('')
    setEditStatus('Applied')
    setEditApplicationDate('')
    setEditNotes('')
    setEditInterviewDate('')
    setEditInterviewTime('')
  }

  // Export applications to CSV
  function exportToCSV() {
    const headers = [
      'Company',
      'Role',
      'Status',
      'Application Date',
      'Interview Date',
      'Interview Time',
      'Notes',
    ]

    const rows = jobs.map((job) => [
      job.company,
      job.role,
      job.status,
      job.applicationDate || '',
      job.interviewDate || '',
      job.interviewTime || '',
      job.notes || '',
    ])

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(',')
      )
      .join('\n')

    const blob = new Blob(['\uFEFF' + csvContent], {
      type: 'text/csv;charset=utf-8;',
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = 'job-applications.csv'

    document.body.appendChild(link)
    link.click()
    link.remove()

    URL.revokeObjectURL(url)
  }

  // Search, filter and sort jobs
  const filteredJobs = jobs
    .filter((job) => {
      const searchText = search.toLowerCase()

      const matchesSearch =
        (job.company || '').toLowerCase().includes(searchText) ||
        (job.role || '').toLowerCase().includes(searchText)

      const matchesStatus =
        filterStatus === 'All' || job.status === filterStatus

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === 'company') {
        return (a.company || '').localeCompare(b.company || '')
      }

      return (a.role || '').localeCompare(b.role || '')
    })

  // Dashboard calculations
  const total = jobs.length
  const applied = jobs.filter((job) => job.status === 'Applied').length
  const interviews = jobs.filter((job) => job.status === 'Interview').length
  const selected = jobs.filter((job) => job.status === 'Selected').length

  const progress =
    total === 0 ? 0 : Math.round((selected / total) * 100)

  // Show Login page
  if (!isLoggedIn) {
    return (
      <Login
        onLogin={(user) => {
          setUserName(user.name)
          setUserEmail(user.email)
          setIsLoggedIn(true)
        }}
      />
    )
  }

  // Show Profile page
  if (showProfile) {
    return (
      <Profile
        userName={userName}
        userEmail={userEmail}
        onBack={(updatedUser) => {
          if (updatedUser) {
            setUserName(updatedUser.name)
            setUserEmail(updatedUser.email)
          }

          setShowProfile(false)
        }}
      />
    )
  }

  return (
    <div className={darkMode ? 'app dark-mode' : 'app'}>
      <Navbar onProfileClick={() => setShowProfile(true)} />

      {/* Welcome section */}
      <div className="welcome-message">
        <h2>Welcome, {userName}! 👋</h2>
        <p>Manage your job applications here.</p>

        <button
          onClick={() => {
            setIsLoggedIn(false)
            setUserName('')
            setUserEmail('')
          }}
        >
          Logout
        </button>
      </div>

      {/* Dark mode button */}
      <button
        className="theme-toggle"
        onClick={() => setDarkMode((prev) => !prev)}
      >
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      {/* Dashboard */}
      <div className="dashboard">
        <div className="stat-card">
          <h3>Total Applications</h3>
          <p>{total}</p>
        </div>

        <div className="stat-card">
          <h3>Applied</h3>
          <p>{applied}</p>
        </div>

        <div className="stat-card">
          <h3>Interviews</h3>
          <p>{interviews}</p>
        </div>

        <div className="stat-card">
          <h3>Selected</h3>
          <p>{selected}</p>
        </div>
      </div>

      {/* Application progress */}
      <div className="progress-section">
        <h3>Application Progress</h3>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p>{progress}% selected</p>
      </div>

      <h2>My Applications</h2>

      {/* Add job form */}
      <form onSubmit={addJob} className="job-form">
        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          type="text"
          placeholder="Job Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <label>Application Date</label>
        <input
          type="date"
          value={applicationDate}
          onChange={(e) => setApplicationDate(e.target.value)}
        />

        <label>Interview Date</label>
        <input
          type="date"
          value={interviewDate}
          onChange={(e) => setInterviewDate(e.target.value)}
        />

        <label>Interview Time</label>
        <input
          type="time"
          value={interviewTime}
          onChange={(e) => setInterviewTime(e.target.value)}
        />

        <textarea
          placeholder="Notes / Interview Details"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {validStatuses.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button type="submit">Add Job</button>
      </form>

      {/* Export button */}
      <button onClick={exportToCSV}>
        Export Applications to CSV
      </button>

      {/* Search, filter and sort */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search company or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Statuses</option>

          {validStatuses.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="company">Sort by Company</option>
          <option value="role">Sort by Role</option>
        </select>
      </div>

      {/* Job cards */}
      <div className="jobs">
        {filteredJobs.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              company={job.company}
              role={job.role}
              status={job.status}
              applicationDate={job.applicationDate}
              notes={job.notes}
              interviewDate={job.interviewDate}
              interviewTime={job.interviewTime}
              isEditing={editingId === job.id}
              editCompany={editCompany}
              editRole={editRole}
              editStatus={editStatus}
              editApplicationDate={editApplicationDate}
              editNotes={editNotes}
              editInterviewDate={editInterviewDate}
              editInterviewTime={editInterviewTime}
              onEditCompanyChange={setEditCompany}
              onEditRoleChange={setEditRole}
              onEditStatusChange={setEditStatus}
              onEditApplicationDateChange={setEditApplicationDate}
              onEditNotesChange={setEditNotes}
              onEditInterviewDateChange={setEditInterviewDate}
              onEditInterviewTimeChange={setEditInterviewTime}
              onSave={saveEdit}
              onCancel={cancelEdit}
              onEdit={() => startEdit(job)}
              onDelete={() => deleteJob(job.id)}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default App