import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { Project, ProjectsDocument, useDeleteProjectMutation } from '../generated/graphql'
import Edit from './Edit'
import Spinner from './Spinner'

interface ProjectInterface {
    project: Project
}

function ProjectCard({ project }: ProjectInterface) {
  const [deleteProject,{ data,loading }] = useDeleteProjectMutation()
  
  const handleClick = async() => {
    try {
      await deleteProject({ 
        variables : {id : project._id} ,
        awaitRefetchQueries: true,
        refetchQueries: [{ query:ProjectsDocument }]
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="card col-md-4 position-relative">
        <div className="card-body">
            <h3 className="card-title">
                {project.name}
            </h3>
            <p className="card-text">{project.description}</p>
            <p className='fw-bold text-capitalize' >{project.client.name}</p>
            <p className="card-text text-muted ">Status: <span className='fw-bold' >{project.status}</span></p>
            {loading ? <span style={{position:'absolute',right:'10px',top:'10px',width: '35px' , height: '35px'}} ><Spinner /></span>: (
              <button 
                className='btn btn-danger btn-sm d-flex align-items-center justify-content-center' 
                style={{position:'absolute',right:'10px',top:'10px',width: '35px' , height: '35px'}} 
                onClick={handleClick} 
              >
                <FaTrash /> 
              </button>
            )}
            <div>
              <Edit project={project} />
            </div>
        </div>
    </div>
  )
}


export default ProjectCard