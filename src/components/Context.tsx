import React, { createContext, useContext, useReducer } from 'react'
import reducer from './reducer'

export const initialValues = {
    projectId: '',
    form: { name: '', description: ''}
}

export interface StateInterface {
  projectId: string 
  form: { name: string, description: string}
}

interface ContextIntreface {
    children: React.ReactNode
}

const AppContext = createContext<{state: StateInterface , dispatch: React.Dispatch<any>}>({
  state: initialValues,
  dispatch: () => null
})

function Context({ children }: ContextIntreface) {
  const [state , dispatch] = useReducer(reducer , initialValues)
  return (
    <AppContext.Provider value={{ state , dispatch }} >
        {children}
    </AppContext.Provider>
  )
}

export default Context
export const useAppData = (): {state: StateInterface , dispatch: React.Dispatch<any>} => useContext(AppContext)