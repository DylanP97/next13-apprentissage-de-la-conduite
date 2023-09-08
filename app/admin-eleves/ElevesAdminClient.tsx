'use client'

import { useEffect, useState } from 'react'
import axios from "axios";
import BasicCard from '../components/BasicCard';
import { toast } from "react-hot-toast";

interface ElevesAdminClientProps {
  users: any
}

const ElevesAdminClient: React.FC<ElevesAdminClientProps> = ({
  users
}) => {
  const [usersData, setUsersData] = useState(users);

  useEffect(() => {
    setUsersData(usersData)
  }, [usersData]);

  const toggleAccept = async (userId: number | string, status: any, email: string, firstName: string) => {
    const data = { 'firstName': firstName, 'email': email, 'isAccepted': !status };
    axios.put(`/api/user/${userId}`, { data })
      .then(() => {
        toast.success(!status ? "L'utilisateur a bien été accepté." : "L'utilisateur n'a désormais plus accès aux blogs.")
      })
      .catch(() => {
        toast.error("Une erreur s'est produite dans la requête.")
      })
  }

  const toggleAdmin = async (userId: number | string, status: any) => {
    const data = { 'isAdmin': !status };
    axios.put(`/api/user/${userId}`, { data })
      .then(() => {
        toast.success(!status ? "L'utilisateur est devenu administrateur." : "L'utilisateur n'est plus administrateur.")
      })
      .catch(() => {
        toast.error("une erreur s'est produite dans la requête")
      })
  }

  const handleDelete = async (userId: number | string) => {
    axios.delete(`/api/user/${userId}`)
      .then(() => {
        const userIndex = usersData.findIndex((user: any) => user.id === userId);
        if (userIndex !== -1) {
          let updatedUsers = [...usersData];
          const newUpdatedUsers = updatedUsers.filter((_, index) => index !== userIndex);
          setUsersData(newUpdatedUsers);
        }
        toast.success("L'utilisateur vient d'être supprimé.")
      })
      .catch((error) => {
        toast.error("Il y a eu une erreur.")
        console.log(error.message)
      })
  }

  return (
    <div className='home-container'>
      <h1>Tous les Utilisateurs</h1>
      <p>Ici gérer les inscriptions, les rôles ou supprimer des comptes d&apos;utilisateurs.</p>
      <hr />
      <br />
      <div className="article-table">
        {usersData && Object.values(usersData)?.map((user: any) => {
          return (
            <BasicCard
              key={user.id}
              type='user'
              data={user}
              toggleMethod={toggleAccept}
              toggleMethod2={toggleAdmin}
              deleteMethod={handleDelete}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ElevesAdminClient