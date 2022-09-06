import React from 'react'
import { FaEdit } from 'react-icons/fa'
import { Project } from '../generated/graphql'
import { useAppData } from './Context'

function EditProjectModal({ project }: {project : Project}) {
  const { state: { form } , dispatch } = useAppData()
  
  return (
    <>
        <button 
          className='btn btn-primary btn-sm d-flex align-items-center justify-content-center' 
          style={{position:'absolute',right:'10px',top:'50px',width: '35px' , height: '35px'}} 
          data-bs-toggle='modal'
          data-bs-target='.editModal'
          onClick={() => {
            dispatch({
              type: 'SET_FORM_VALUES',
              payload: {name: project.name, description: project.description}
            })
            dispatch({
              type: 'SET_PROJECTID',
              payload: project._id
            })
          }}
        >
          <FaEdit />
        </button>
    </>
  )
}

export default EditProjectModal