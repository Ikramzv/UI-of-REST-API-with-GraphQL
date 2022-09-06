import React from 'react'
import { FaEdit } from 'react-icons/fa'

interface EditModalInterface {
    form: { name: string , description: string }
    handleSubmit: React.FormEventHandler<HTMLFormElement>
    setForm: React.Dispatch<React.SetStateAction<{ name: string , description: string }>>
    loading: boolean
    error: boolean
}

function EditModal({ form , handleSubmit , setForm, loading, error }: EditModalInterface) {
    return (
        <div className="modal fade" id='editModal' >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className='d-flex align-items-center justify-content-center w-100'>
                  <FaEdit className='me-4' />
                  Edit Form {form.name}
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
                      onChange={(e) => setForm({...form,name: e.target.value})} />
                  </div>
                  <div className='mb-3' >
                    <label className='form-label'>Description</label>
                    <input 
                      className='form-control' 
                      type={'text'} 
                      placeholder='Description..' 
                      value={form.description} 
                      onChange={(e) => setForm({...form,description: e.target.value})} 
                    />
                  </div>
                  <button type='submit' className='btn btn-primary' data-bs-dismiss={loading || error ? '' : 'modal'} >Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
  )
}

export default EditModal