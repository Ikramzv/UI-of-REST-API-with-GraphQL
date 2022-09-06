import React, { useState } from 'react'
import { FaRProject } from 'react-icons/fa'
import { Project, ProjectsDocument, useCreateProjectMutation } from '../generated/graphql'

function ProjectModal() {
    const [form , setForm] = useState({
        name: '',
        description: '',
        status: '',
    })
    const [createProject, { data, error , loading }] = useCreateProjectMutation()

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        try {
            await createProject({
                variables: { options: form },
                update(cache, result) {
                    const { projects } = cache.readQuery({query: ProjectsDocument}) as { projects: Project[] }
                    cache.writeQuery({query: ProjectsDocument , data:{projects : [...projects,result.data?.createProject] }})
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement>) => {
        setForm({...form,[e.target.name]: e.target.value})
    }
    
  return (
    <>
        <button className='btn btn-primary' data-bs-toggle='modal' data-bs-target='#projectModal' >Create Project</button>
        <div className='modal fade' id='projectModal' >
            <div className="modal-dialog modal-dialog-centered ">
                <div className="modal-content">
                    <div className="modal-header d-flex justify-content-center">
                        <h1 className='d-flex align-items-center' >
                            <FaRProject />
                            &nbsp;
                            Create Project Form
                        </h1>
                    </div>
                    <div className="modal-body">
                        <form action="" className='form' onSubmit={handleSubmit} >
                            <div className='mb-3' >
                                <label className='form-label'>Name</label>
                                <input 
                                    autoComplete='off' 
                                    type="text" 
                                    className='form-control' 
                                    placeholder='Name..' 
                                    name='name' 
                                    value={form.name}
                                    onChange={handleChange}
                                    />
                            </div>
                            <div className='mb-3' >
                                <label className='form-label'>Description</label>
                                <textarea 
                                    autoComplete='off' 
                                    className='form-control' 
                                    placeholder='Description..' 
                                    name='description' 
                                    rows={5}
                                    value={form.description}
                                    onChange={handleChange}
                                    style={{resize: 'none'}}
                                ></textarea>
                            </div>
                            <div className='mb-3' >
                                <label className='form-label'>Status</label>
                                <select className='form-select' id='status' value={form.status} onChange={handleChange} name='status' >
                                    <option value="NotStarted">Not Started</option>
                                    <option value="Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                            <button 
                                className='btn btn-primary form-submit mt-3' 
                                type='submit' 
                                data-bs-dismiss={loading || error ? '' : 'modal'} 
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ProjectModal