import React from 'react'

function Spinner({project}: {project?: boolean}) {
  return (
    <div className='d-flex justify-content-center'>
        <div className={`spinner-border`}></div>
    </div>
  )
}

export default Spinner