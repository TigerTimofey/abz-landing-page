import { useEffect, useState } from 'react'
import './UsersSection.scss'
import { getUsers } from '../../services/api'
import photoCover from '../../assets/photo-cover.svg'
import Preloader from '../Preloader/Preloader'

function UsersSection() {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getUsers({ page: 1, count: 6 })
      .then(data => {
        const sorted = [...data.users].sort(
          (a, b) => b.registration_timestamp - a.registration_timestamp
        )
        setUsers(sorted)
        setTotalPages(data.total_pages)
        setPage(1)
      })
      .finally(() => setLoading(false))
  }, [])

  const handleShowMore = () => {
    if (page >= totalPages) return
    setLoading(true)
    getUsers({ page: page + 1, count: 6 })
      .then(data => {
        const sorted = [...data.users].sort(
          (a, b) => b.registration_timestamp - a.registration_timestamp
        )
        setUsers(prev => [...prev, ...sorted])
        setPage(page + 1)
      })
      .finally(() => setLoading(false))
  }

  return (
    <section className="users-section">
      <h2 className="users-section__title">Working with GET request</h2>
      <div className="card-list">
        {users.map(user => (
          <div className="card" key={user.id}>
            <img src={user.photo || photoCover} alt={user.name} />
            <div className="card-title">{user.name}</div>
            <div className="card-position">{user.position}</div>
            <div className="card-email">{user.email}</div>
            <div className="card-phone">{user.phone}</div>
          </div>
        ))}
      </div>
      <div className="users-section__actions">
        {page < totalPages ? (
          loading ? (
            <Preloader />
          ) : (
            <button className="button-yellow" onClick={handleShowMore}>
              Show more
            </button>
          )
        ) : null}
      </div>
    </section>
  )
}

export default UsersSection
