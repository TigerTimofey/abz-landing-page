import { useEffect, useState } from 'react'
import './UsersSection.scss'
import { getUsers } from '../../services/api'
import photoCover from '../../assets/photo-cover.svg'
import Preloader from '../Preloader/Preloader'
import CustomTooltip from '../../utils/custom-tooltip/CustomTooltip'

function UsersSection({ reloadKey }) {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  const fetchUsers = async (reset = false) => {
    setLoading(true)
    const res = await getUsers(reset ? 1 : page, 6) 
    if (reset) {
      setUsers(res.users)
      setPage(1)
      setTotalPages(res.total_pages)
    } else {
      setUsers(u => [...u, ...res.users])
      setTotalPages(res.total_pages)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchUsers(true)
    // eslint-disable-next-line
  }, [reloadKey])

  useEffect(() => {
    if (page === 1) fetchUsers(true)
    // eslint-disable-next-line
  }, [])

  const handleShowMore = () => {
    if (page < totalPages) {
      setPage(p => p + 1)
    }
  }

  useEffect(() => {
    if (page > 1) fetchUsers()
    // eslint-disable-next-line
  }, [page])

  return (
    <section className="users-section">
      <h2 className="users-section__title">Working with GET request</h2>
      <div className="card-list">
        {users.map(user => (
          <div className="card" key={user.id}>
            <img src={user.photo || photoCover} alt={user.name} />
            <div className="card-title">{user.name}</div>
            <div className="card-position">{user.position}</div>
            <CustomTooltip title={user.email}>
              <div className="card-email">{user.email}</div>
            </CustomTooltip>
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
