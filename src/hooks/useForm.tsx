import { createContext, useContext, useMemo, useState } from 'react'
import { formState } from '../types'

interface FormInterface {
  formState: formState
  errors: any
  updateFormState: any
  validateForm: any
  validatedInputs: any
  checkRequireds: any
}
interface FormProviderInterface {
  children: React.ReactNode
}

const initialFormState: formState = JSON.parse(
  localStorage.getItem('formState')!,
) || {
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
  errors: {},
  updateFormState: () => {},
  validateForm: () => {},
  validatedInputs: {},
  checkRequireds: () => {},
}

const Form = createContext(initialState)

export function FormProvider({ children }: FormProviderInterface) {
  const [formState, setFormState] = useState<formState>(initialFormState)
  const [errors, setErrors] = useState<any>(
    JSON.parse(localStorage.getItem('errors')!) || {},
  )
  const [validatedInputs, setValidatedInputs] = useState<any>(
    JSON.parse(localStorage.getItem('validatedInputs')!) || {},
  )

  const patterns: any = {
    name: /^[ა-ჰ]{2,}$/,
    surname: /^[ა-ჰ]{2,}$/,
    email: /^[a-zA-Z0-9._%+-]+@redberry.ge$/,
    phone_number: /^(\+995)?(\s?(5\d{2}|79\d{1})\s?(\d{2})\s?(\d{2})\s?(\d{2})|-?(5\d{2}|79\d{1})-?\d{2}-?\d{2}-?\d{2}|(\d{7})\d{3})|(\s?(5\d{2}|79\d{1})\s?(\d{3})\s?(\d{3}))$/,
  }

  const deleteFromValidated = (key: string) => {
    if (validatedInputs[key]) {
      const localValidatedInputs = validatedInputs
      delete localValidatedInputs[key]
      localStorage.setItem(
        'validatedInputs',
        JSON.stringify(localValidatedInputs),
      )
      setValidatedInputs(localValidatedInputs)
    }
  }

  const deleteFromErrors = (key: string) => {
    if (errors[key]) {
      let localErrors = errors
      delete localErrors[key]
      localStorage.setItem('errors', JSON.stringify(localErrors))
      setErrors(localErrors)
    }
  }

  const validateForm = (key: string, value: any) => {
    if (key === 'image') {
      const updatedValidatedIns = { ...validatedInputs, [key]: true }
      localStorage.setItem(
        'validatedInputs',
        JSON.stringify(updatedValidatedIns),
      )
      setValidatedInputs(updatedValidatedIns)
      deleteFromErrors(key)
    }
    if (!patterns[key]) {
      const updatedValidatedIns = { ...validatedInputs, [key]: true }
      localStorage.setItem(
        'validatedInputs',
        JSON.stringify(updatedValidatedIns),
      )
      setValidatedInputs(updatedValidatedIns)
      return
    }

    if (patterns[key].test(value) && value.length) {
      const updatedValidatedIns = { ...validatedInputs, [key]: true }
      localStorage.setItem(
        'validatedInputs',
        JSON.stringify(updatedValidatedIns),
      )
      setValidatedInputs(updatedValidatedIns)
      deleteFromErrors(key)
    } else {
      const updatedErrors = { ...errors, [key]: true }
      localStorage.setItem('errors', JSON.stringify(updatedErrors))
      setErrors(updatedErrors)
      deleteFromValidated(key)
    }
  }

  const updateFormState = (key: string, value: any) => {
    const updatedForm = { ...formState, [key]: value }
    localStorage.setItem('formState', JSON.stringify(updatedForm))
    validateForm(key, value)
    setFormState(updatedForm)
  }

  const checkRequireds = (arr: any) => {
    let isError = false
    let dontMatch: any = {}
    arr.forEach((key: string) => {
      if (!validatedInputs[key]) {
        console.log(key)
        isError = true
        dontMatch[key] = true
      }
    })
    if (Object.keys(dontMatch)) {
      localStorage.setItem('errors', JSON.stringify(dontMatch))
      setErrors(dontMatch)
    }
    return !isError
  }

  const value = useMemo(
    () => ({
      formState,
      errors,
      updateFormState,
      validateForm,
      validatedInputs,
      checkRequireds,
    }),
    [formState, errors],
  )
  return <Form.Provider value={value}>{children}</Form.Provider>
}

export default function useForm() {
  return useContext(Form)
}
