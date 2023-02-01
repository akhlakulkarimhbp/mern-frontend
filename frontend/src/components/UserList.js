import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const UserList = () => {
  const [users, setUser] = useState([])

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const response = await axios.get('http://127.0.0.1:5000/users')
    setUser(response.data)
  }

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/users/${id}`)
    } catch (error) {
      console.log(error)
    }
    // eslint-disable-next-line no-restricted-globals
    location.reload()
  }
  return (
    <div className="columns">
      <div className="column is-half mt-5 has-centered">
        <Link to="add" className="button is-success">
          Add New
        </Link>
        <table className="table is-bordered is-striped is-narrow mt-5">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.position}</td>
                <td className="fullwidth">
                  <Link
                    to={`edit/${user._id}`}
                    className="button is-info is-small"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="button is-danger is-small ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserList
