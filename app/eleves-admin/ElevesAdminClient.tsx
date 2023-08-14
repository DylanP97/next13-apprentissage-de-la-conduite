'use client'

import { useState } from 'react'
import { MDBSwitch } from 'mdb-react-ui-kit';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import Image from 'next/image';
import BasicCard from '../components/BasicCard';

interface ElevesAdminClientProps {
  users: any
}

const ElevesAdminClient: React.FC<ElevesAdminClientProps> = ({
  users
}) => {
  const [usersData, setUsersData] = useState(users);

  console.log(usersData)

  const ToggleAccept = async (userId: number | string, status: any, email: string, firstName: string) => {
    const data = { 'firstName': firstName, 'email': email, 'isAccepted': !status };
    axios.put(`http://localhost:3000/api/user/${userId}`, { data })
      .then(() => {
        alert(!status ? "L'utilisateur a bien été accepté" : "L'utilisateur n'a désormais plus accès aux blogs.")
      })
      .catch(() => {
        alert("une erreur s'est produite dans la requête")
      })
  }

  const ToggleAdmin = async (userId: number | string, status: any) => {
    const data = { 'isAdmin': !status };
    axios.put(`http://localhost:3000/api/user/${userId}`, { data })
      .then(() => {
        alert(!status ? "L'utilisateur est devenu administrateur" : "L'utilisateur n'est plus administrateur")
      })
      .catch(() => {
        alert("une erreur s'est produite dans la requête")
      })
  }

  const HandleDelete = async (userId: number | string) => {
    axios.delete(`http://localhost:3000/api/user/${userId}`)
      .then(() => {
        alert("L'utilisateur vient d'être supprimé.")
      })
      .catch((error) => {
        alert("Il y a eu une erreur.")
        console.log(error.message)
      })
  }

  return (
    <div className='home-container'>
      <h1>Tous les Utilisateurs</h1>
      <p>Ici gérer les inscriptions, les rôles ou supprimer des comptes d&apos;utilisateurs.</p>
      <br />
      <div className="article-table">
        {Object.values(usersData)?.map((user: any, index: number) => {
          return (
            <BasicCard
              key={user.id}
              type='user'
              data={user}
              deleteMethod={HandleDelete}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ElevesAdminClient