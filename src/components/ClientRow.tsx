import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { Client, Project, ProjectsDocument, useDeleteClientMutation } from '../generated/graphql'

interface ClientRowInterface {
    d: Client
}

function ClientRow({ d }: ClientRowInterface) {
    const [deleteClient , {}] = useDeleteClientMutation()
    const handleClick = async() => {
        try {
            await deleteClient({ 
                variables: { id: d._id } ,
                update(cache) {
                    const { projects } = cache.readQuery({query: ProjectsDocument}) as { projects: Project[] }
                    if(projects.some(p => p.clientId === d._id)) {
                        cache.writeQuery({query: ProjectsDocument , data: {projects: projects.filter(p => p.clientId !== d._id)}})
                    }
                    return cache.evict({ id: `Client:${d._id}` })
                }
            })
            return ;
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
        <tr>
            <td>{d.name}</td>
            <td>{d.email}</td>
            <td>{d.phone}</td>
            <td>
                <button className='btn btn-danger btn-sm' onClick={handleClick} >
                    <FaTrash />
                </button>
            </td>
        </tr>
    </>
  )
}

export default ClientRow