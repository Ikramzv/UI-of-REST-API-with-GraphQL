import { gql } from '@apollo/client'
import React from 'react'
import { FaEdit } from 'react-icons/fa'
import { useProjectsQuery, useUpdateProjectMutation } from '../generated/graphql'
import { useAppData } from './Context'
import ProjectCard from './ProjectCard'
import Spinner from './Spinner'

function Projects() {
    const { data , loading , error } = useProjectsQuery()
    const [updateProject,{ loading: ploading , error: perror }] = useUpdateProjectMutation()
    const { state:{ form , projectId } , dispatch} = useAppData()

    if(loading) {
        return null
    }
    if(error) {
        <div>{error.message}</div>
    }

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        try {
            await updateProject({
                variables: {id: projectId , options: form },
                update(cache) {
                    cache.writeFragment({ fragment: gql`
                        fragment _ on Project {
                            name
                            description
                        }
                    ` , id: `Project:${projectId}` , data: { description: form.description , name: form.name } })
                }
            })
        } catch (error) {
          console.log(error)
        }
      }

  return (
    <div className='container d-flex gap-2 my-3 flex-wrap align-items-center justify-content-center ' >
        { data?.projects.length as number > 0 ? (
            data?.projects.map((project) => (
                <ProjectCard project={project} key={project._id} />
            ))
        ) : (
            <div>{data?.projects.length}</div>
        )}
        <div className="modal fade editModal" id='editModal' >
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                <h1 className='d-flex align-items-center justify-content-center w-100'>
                    <FaEdit className='me-4' />
                    Edit Form
                </h1>
                </div>
                <div className="modal-body">
                <form className='form' onSubmit={handleSubmit} >
                    <div className='mb-3' >
                    <label className='form-label'>Name</label>
                    <input 
                        className='form-control' 
                        type={'text'} 
                        placeholder='Name..' 
                        value={form.name} 
                        onChange={(e) => dispatch({
                            type: 'SET_FORM_NAME',
                            payload: e.target.value
                        })} />
                    </div>
                    <div className='mb-3' >
                    <label className='form-label'>Description</label>
                    <input 
                        className='form-control' 
                        type={'text'} 
                        placeholder='Description..' 
                        value={form.description} 
                        onChange={(e) => {
                            dispatch({
                                type: 'SET_FORM_DESCRIPTION',
                                payload: e.target.value
                            })
                        }} 
                    />
                    </div>
                    {ploading ? (
                        <Spinner />
                    ) : (
                        <button type='submit' className='btn btn-primary' data-bs-dismiss={ploading || perror ? '' : 'modal'}>Submit</button>
                    )}
                </form>
                </div>
            </div>
            </div>
        </div> 
    </div>
  )
}

export default Projects