import React from 'react'
import { Client, useClientsQuery } from '../generated/graphql'
import ClientModal from './ClientModal'
import ClientRow from './ClientRow'
import ProjectModal from './ProjectModal'
import Spinner from './Spinner'

function Clients() {
    const { data , loading , error } = useClientsQuery({})

    if(loading) {
        return <Spinner />
    }
    if(error) return <div>Error happened</div>

  return (
    <>
        <div className="container">
            {!loading && !error && (
                <table className='table table-hover mt-3'>
                    <thead className=''>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.clients.map((d) => {
                            const client = d as Client
                            return <ClientRow key={client._id} d={client} />
                        })}
                    </tbody>
                </table>
            )}
            <div className="d-flex justify-content-between align-items-center">
                <ClientModal />
                <ProjectModal />
            </div>
        </div>
    </>
  )
}

export default Clients