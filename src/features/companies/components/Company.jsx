import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { useApiClient } from 'context/ApiClient'
import { useAuth } from 'features/auth'
import CompanyAvatar from 'features/companies/components/CompanyAvatar'
import CompanyAvatarUpload from 'features/companies/components/CompanyAvatarUpload'


export default function Company(props) {

  const { company_id } = useParams()

  const [data, setData] = useState({})
  const [avatar, setAvatar] = useState(props.company.avatar_url)
  const [error, setError] = useState(null)

  const authContext = useAuth()
  const client = useApiClient()

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function createCompany(event) {
    event.preventDefault()
    client
      .post(`companies/`,
        {
          "id_name": data.id_name,
          "display_name": data.display_name,
          "legal_name": data.legal_name,
        },
        { headers: { Authorization: `Token ${authContext.token}` } },
      )
      .then(function (response) {
        if (response.status == 201) {
          props.setMode("view")
        }
      })
      .catch(function (err) {
        setError(err)
      })
  }

  function editCompany(event) {
    event.preventDefault()
    client
      .patch(`companies/${company_id}/admin/`,
        {
          "id_name": data.id_name,
          "display_name": data.display_name,
          "legal_name": data.legal_name,
        },
        { headers: { Authorization: `Token ${authContext.token}` } },
      )
      .then(function (res) {
        if (res.status == 200) {
          props.setMode("view")
        }
      })
      .catch(function (err) {
        setError(err)
      })
  }

  function cancelCreate(event) {
    event.preventDefault()
    props.cancel(state => !state)
  }

  function cancelEdit(event) {
    event.preventDefault()
    props.setMode("view")
  }

  function editMode(event) {
    event.preventDefault()
    props.setMode("edit")
  }


  if (props.mode === "create") return (
    <form onSubmit={createCompany}>
      <CompanyAvatar size="60" image={props.company.avatar_url} /> <b>{props.company.display_name}</b><br />
      <input type="text" name="id_name" value={props.company.id_name} onChange={handleChange} placeholder="ID Name" /><br />
      <input type="text" name="display_name" value={props.company.display_name} onChange={handleChange} placeholder="Display Name" /><br />
      <button type="button" onClick={cancelCreate}>Cancel</button>
      <button type="submit">Save</button>
    </form>
  )

  if (props.mode === "edit") return (
    <form onSubmit={editCompany}>
      <CompanyAvatarUpload size="10" companyId={props.company.id} currentAvatar={props.company.avatar_url} onUploadSuccess={setAvatar} />
      <input type="text" name="id_name" defaultValue={props.company.id_name} onChange={handleChange} placeholder="ID Name" /><br />
      <input type="text" name="display_name" defaultValue={props.company.display_name} onChange={handleChange} placeholder="Display Name" /><br />
      <input type="text" name="legal_name" defaultValue={props.company.legal_name} onChange={handleChange} placeholder="Legal Name" />
      <button type="button" onClick={cancelEdit}>Cancel</button>
      <button type="submit">Save</button>
    </form>
  )

  return (
    <div>
      <CompanyAvatar size="60" image={props.company.avatar_url} /> <b>{props.company.display_name}</b>
      <h3>legal_name: {props.company.legal_name}</h3>
      <h3>id: {company_id}</h3>
      <h3>id_name: {props.company.id_name}</h3>
      <h3>locations:</h3>
      <ul>{props.company.branches.map((branch, index) => <li key={index}>{branch.name}</li>)}</ul>
      <h3>admins:</h3>
      <ul>{props.company.admins.map((admin, index) => <li key={index}>{admin.user_email}</li>)}</ul>
      <button type="button" onClick={editMode}>Edit</button>
    </div>
  )
}
