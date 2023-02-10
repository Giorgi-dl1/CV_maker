import { createContext, useContext, useMemo, useState } from 'react'
import {
  initialExperience,
  initialFormState,
  initialState,
} from '../initialVariables'
import { patterns } from '../patterns'
import { FormProviderInterface, formState } from '../types'
import {
  addProperty,
  checkErrors,
  checkObjectFields,
  checkRequiredStrings,
  formatPhoneNumber,
  removeProperty,
} from '../utils'

const Form = createContext(initialState)

export function FormProvider({ children }: FormProviderInterface) {
  const [formState, setFormState] = useState<formState>(initialFormState)
  const [errors, setErrors] = useState<any>(
    JSON.parse(localStorage.getItem('errors')!) || {},
  )
  const [validatedInputs, setValidatedInputs] = useState<any>(
    JSON.parse(localStorage.getItem('validatedInputs')!) || {},
  )

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

  const validateFormArray = (
    key: string,
    index: number,
    property: string,
    value: string,
  ) => {
    if (patterns[property].test(value)) {
      const { isChanged, obj: validatedIns } = addProperty(
        validatedInputs,
        key,
        property,
        index,
      )

      if (isChanged) {
        localStorage.setItem('validatedInputs', JSON.stringify(validatedIns))
        setValidatedInputs(validatedIns)
      }

      // delete from errors
      const { isChanged: errorsChanged, obj: lErrors } = removeProperty(
        errors,
        key,
        property,
        index,
      )
      if (errorsChanged) {
        localStorage.setItem('errors', JSON.stringify(lErrors))
        setErrors(lErrors)
      }
    } else {
      // add to errors
      const { isChanged: errorsChanged, obj: lErrors } = addProperty(
        errors,
        key,
        property,
        index,
      )

      if (errorsChanged) {
        localStorage.setItem('errors', JSON.stringify({ ...lErrors }))
        setErrors({ ...lErrors })
      }

      const {
        isChanged: validatedsChanged,
        obj: validatedIns,
      } = removeProperty(validatedInputs, key, property, index)
      if (validatedsChanged) {
        localStorage.setItem(
          'validatedInputs',
          JSON.stringify({ ...validatedIns }),
        )
        setValidatedInputs({ ...validatedIns })
      }
    }
  }

  const updateFormArray = (
    key: string,
    index: number,
    property: string,
    value: string,
  ) => {
    let array = (formState as any)[key]
    let object: any = array[index] || [{}]
    object[property] = value
    array[index] = object

    const updatedForm = { ...formState, [key]: array }
    localStorage.setItem('formState', JSON.stringify(updatedForm))
    validateFormArray(key, index, property, value.trim())
    setFormState(updatedForm)
  }

  const updateFormState = (
    key: string,
    value: any,
    index: number,
    property: string,
  ) => {
    if (typeof index === 'number' && property) {
      updateFormArray(key, index, property, value)
      return
    }
    let localValue = value
    if (key === 'phone_number') {
      localValue = formatPhoneNumber(value)
    }
    const updatedForm = { ...formState, [key]: localValue }
    localStorage.setItem('formState', JSON.stringify(updatedForm))
    validateForm(key, localValue.trim())
    setFormState(updatedForm)
  }

  const checkRequireds = (requireds: string[]) => {
    const { isErrors, errors: lErrors } = checkRequiredStrings(
      requireds,
      validatedInputs,
      errors,
    )
    if (isErrors) {
      localStorage.setItem('errors', JSON.stringify(lErrors))
      setErrors(lErrors)
    }
    return !isErrors
  }

  const checkRequiredsInArray = (key: string) => {
    const arr = (formState as any)[key]
    const keyes = Object.keys(arr[0])

    const valids = validatedInputs[key] || [{}]

    const { errors: lErrors, isErrors } = checkErrors(arr, valids, keyes)

    if (isErrors) {
      const updatedErrors = { ...errors, [key]: lErrors }
      localStorage.setItem('errors', JSON.stringify(updatedErrors))
      setErrors(updatedErrors)
    }

    return !isErrors
  }

  const addFieldsStack = (property: string) => {
    let array = (formState as any)[property]
    array.push({ ...initialExperience })
    const updatedForm = { ...formState, [property]: array }
    localStorage.setItem('formState', JSON.stringify(updatedForm))
    setFormState(updatedForm)
  }

  const resetForm = () => {
    localStorage.removeItem('errors')
    localStorage.removeItem('formState')
    localStorage.removeItem('validatedInputs')

    setFormState(initialFormState)
    setErrors({})
    setValidatedInputs({})
  }

  const value = useMemo(
    () => ({
      formState,
      errors,
      updateFormState,
      validateForm,
      validatedInputs,
      checkRequireds,
      addFieldsStack,
      checkRequiredsInArray,
      checkObjectFields,
      resetForm,
    }),
    [formState, errors],
  )
  return <Form.Provider value={value}>{children}</Form.Provider>
}

export default function useForm() {
  return useContext(Form)
}
