
function JobCard(props) {
  const today = new Date()
  const todayDate = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  const isUpcoming =
    props.interviewDate &&
    props.interviewDate >= todayDate

  const isPast =
    props.interviewDate &&
    props.interviewDate < todayDate

  return (
    <div className="job-card">
      {props.isEditing ? (
        <div className="edit-form">
          <h3>Edit Job Application</h3>

          <label>Company Name</label>
          <input
            type="text"
            value={props.editCompany}
            onChange={(e) =>
              props.onEditCompanyChange(e.target.value)
            }
          />

          <label>Job Role</label>
          <input
            type="text"
            value={props.editRole}
            onChange={(e) =>
              props.onEditRoleChange(e.target.value)
            }
          />

          <label>Application Date</label>
          <input
            type="date"
            value={props.editApplicationDate}
            onChange={(e) =>
              props.onEditApplicationDateChange(e.target.value)
            }
          />

          <label>Interview Date</label>
          <input
            type="date"
            value={props.editInterviewDate || ''}
            onChange={(e) =>
              props.onEditInterviewDateChange(e.target.value)
            }
          />

          <label>Interview Time</label>
          <input
            type="time"
            value={props.editInterviewTime || ''}
            onChange={(e) =>
              props.onEditInterviewTimeChange(e.target.value)
            }
          />

          <label>Notes</label>
          <textarea
            placeholder="Notes / Interview Details"
            value={props.editNotes}
            onChange={(e) =>
              props.onEditNotesChange(e.target.value)
            }
          />

          <label>Application Status</label>
          <select
            value={props.editStatus}
            onChange={(e) =>
              props.onEditStatusChange(e.target.value)
            }
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
            <option value="Pending">Pending</option>
          </select>

          <button onClick={props.onSave}>Save Changes</button>
          <button onClick={props.onCancel}>Cancel</button>
        </div>
      ) : (
        <>
          <h3>{props.company}</h3>

          <p>Role: {props.role}</p>

          <p>
            Application Date:{' '}
            {props.applicationDate || 'Not provided'}
          </p>

          <p>
            Notes: {props.notes || 'No notes added'}
          </p>

          <p>
            Status:{' '}
            <span
              className={`status-badge ${(props.status || 'Pending').toLowerCase()}`}
            >
              {props.status}
            </span>
          </p>

          {props.interviewDate && (
            <div className="interview-reminder">
              <h4>📅 Interview Reminder</h4>

              <p>Interview Date: {props.interviewDate}</p>

              <p>
                Interview Time:{' '}
                {props.interviewTime || 'Not provided'}
              </p>

              {props.status === 'Interview' && isUpcoming && (
                <span className="reminder-badge">
                  🔔 Upcoming Interview
                </span>
              )}

              {props.status === 'Interview' && isPast && (
                <span className="reminder-badge">
                  Interview date passed
                </span>
              )}
            </div>
          )}

          <button onClick={props.onEdit}>Edit</button>
          <button onClick={props.onDelete}>Delete</button>
        </>
      )}
    </div>
  )
}

export default JobCard
