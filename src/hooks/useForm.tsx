import { createContext, useContext, useMemo, useState } from 'react'
import { experience, formState } from '../types'

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

const initialExperience: experience = {
  position: '',
  employer: '',
  start_date: '',
  due_date: '',
  description: '',
}

const initialFormState: formState = JSON.parse(
  localStorage.getItem('formState')!,
) || {
  name: '',
  surname: '',
  email: '',
  phone_number: '',
  experiences: [initialExperience],
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
    phone_number: /^(\+9955\d{8}|\+99579\d{7})$/,
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

  const formatPhoneNumber = (string: string) => {
    let number: any = string

    if (!number.length) {
      number = ''
      return number
    }
    number = number.replace(/[^\+\d]/g, '')
    if (!number.startsWith('+995') && number.length > 3) {
      number = `+995${number}`
    }

    return number
  }

  const updateFormState = (key: string, value: any) => {
    let localValue = value
    if (key === 'phone_number') {
      localValue = formatPhoneNumber(value)
    }

    const updatedForm = { ...formState, [key]: localValue }
    localStorage.setItem('formState', JSON.stringify(updatedForm))
    validateForm(key, localValue)
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
