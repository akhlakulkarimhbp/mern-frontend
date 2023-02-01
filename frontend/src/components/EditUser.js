import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

function EditUser() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [position, setPosition] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    getUserById()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getUserById = async () => {
    const response = await axios.get(`http://127.0.0.1:5000/users/${id}`)
    setName(response.data.name)
    setEmail(response.data.email)
    setPosition(response.data.position)
  }

  const updateUser = async (e) => {
    e.preventDefault()
    try {
      await axios.patch(`http://127.0.0.1:5000/users/${id}`, {
        name,
        email,
        position,
      })
      navigate('/')
    } catch (error) {
      console.log(error)
    }
    // eslint-disable-next-line no-restricted-globals
    location.reload()
  }

  return (
    <div className="columns mt-5">
      <div className="column is-half">
        <form onSubmit={updateUser}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Position</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                >
                  <option value="Ios/Android Trainee">
                    Ios/Android Trainee
                  </option>
                  <option value="Web Trainee">Web Trainee</option>
                  <option value="Golang Trainee">Golang Trainee</option>
                  <option value="Genesys Trainee">Genesys Trainee</option>
                  <option value="AWS Trainee">AWS Trainee</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-success ">
                Update
              </button>
              <Link to="/" className="button is-danger ml-2">
                Kembali
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditUser
