import { GraphQLError } from 'graphql'
import React, { useState } from 'react'
import { FaRProject } from 'react-icons/fa'
import { Client, ClientsDocument, useCreateClientMutation } from '../generated/graphql'


function ClientModal() {
    const [form , setForm] = useState({
        email: '',
        name: '',
        phone: ''
    })
    const [createClient , { data , loading , error }] = useCreateClientMutation()
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        if(!form.email.includes('@') || form.email.split('@')[1] === '') {
            return alert(form.email.split('@')[1] === '' ? 'Please complete the email' : 'Email must include @ sign')
        }
        try {
            await createClient({
                variables: {options: form } ,
                update: (cache, result) => {
                    const { clients } = cache.readQuery({ query: ClientsDocument }) as { clients: Client[] }
                    
                    cache.writeQuery({ query: ClientsDocument , data: { clients: [...clients , result.data?.createClient] } })
                }
            })
        } catch (error: GraphQLError | any | undefined) {
            console.log(error)
            alert(error.message)
        }
    } 
  return (
    <>
        <button type='button' className='btn btn-primary d-flex align-items-center gap-2' data-bs-target='#createClientModal' data-bs-toggle='modal' >
            <FaRProject />
            Create Client
        </button>
        <div id='createClientModal' className='modal fade'>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className='display-4 modal-title' >
                            Create Client Form
                        </h1>
                        <button className='btn-close' data-bs-dismiss='modal'></button>
                    </div>
                    <div className="modal-body">
                        <form action="" className='form d-flex flex-column gap-3' onSubmit={handleSubmit} >
                            <div>
                                <label className='form-label' htmlFor="name">Name</label>
                                <input 
                                    name='name' 
                                    className='form-control' 
                                    autoComplete='off' 
                                    type="text" 
                                    id='name' 
                                    placeholder='Name'
                                    value={form.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className='form-label' htmlFor="email">Email</label>
                                <input onChange={handleChange} 
                                    name='email' 
                                    className='form-control form-control-email' 
                                    autoComplete='off' 
                                    type="text" 
                                    id='email' 
                                    placeholder='Email'  />
                            </div>
                            <div>
                                <label className='form-label' htmlFor="phone">Phone</label>
                                <input onChange={handleChange} 
                                    name='phone' 
                                    className='form-control form-control-phone' 
                                    autoComplete='off' 
                                    type={'tel'} 
                                    id='phone' 
                                    placeholder='phone'  />
                            </div>
                            <button type='submit' className='btn btn-primary' data-bs-dismiss={loading || error ? '' : 'modal'}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ClientModal