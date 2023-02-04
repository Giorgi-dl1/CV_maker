import React, { createContext, useContext, useMemo, useState } from 'react'
import { formState } from '../types'

interface FormInterface {
  formState: formState
}
interface FormProviderInterface {
  children: React.ReactNode
}

const initialFormState: formState = {
  name: '',
  surname: '',
  email: '',
  phone_number: '',
  experiences: [],
  educations: [],
  image: '',
}

const initialState: FormInterface = {
  formState: initialFormState,
}

const Form = createContext(initialState)

export function FormProvider({ children }: FormProviderInterface) {
  const [formState, setFormState] = useState<formState>(initialFormState)

  const value = useMemo(
    () => ({
      formState,
    }),
    [formState],
  )
  return <Form.Provider value={value}>{children}</Form.Provider>
}

export default function useForm() {
  return useContext(Form)
}
