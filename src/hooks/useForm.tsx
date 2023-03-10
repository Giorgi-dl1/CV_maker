import axios from 'axios'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import Loading from '../components/Loading'
import {
  formStateStarter,
  initialEducation,
  initialExperience,
  initialFormState,
  initialState,
} from '../initialVariables'
import { patterns } from '../patterns'
import { Degrees, FormProviderInterface, formState } from '../types'
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
  const [degrees, setDegrees] = useState<Degrees | null>(null)
  const [loading, setLoading] = useState(true)

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

    let lValue = value
    if (typeof lValue === 'string') {
      lValue = lValue.trim()
    }
    validateFormArray(key, index, property, lValue)
    setFormState(updatedForm)

    if (!value.length && !checkObjectFields(object) && index !== 0) {
      let arrErrors = [...errors[key]] || []
      arrErrors[index] = {}
      const lErrors = { ...errors, [key]: arrErrors }
      localStorage.setItem('errors', JSON.stringify(lErrors))
      setErrors(lErrors)
    }
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

  const checkFormState = (key: string) => {
    if (key === 'personal_info') {
      const requiredFields = [
        'name',
        'surname',
        'image',
        'email',
        'phone_number',
      ]
      const { isErrors, errors: lErrors } = checkRequiredStrings(
        requiredFields,
        validatedInputs,
        errors,
      )
      if (isErrors) {
        localStorage.setItem('errors', JSON.stringify(lErrors))
        setErrors(lErrors)
      }
      return !isErrors
    }
    const arr = (formState as any)[key]
    const keyes = Object?.keys(arr[0])

    const valids = validatedInputs[key] || [{}]

    const { errors: lErrors, isErrors } = checkErrors(arr, valids, keyes)

    const updatedErrors = { ...errors, [key]: lErrors }
    localStorage.setItem('errors', JSON.stringify(updatedErrors))
    setErrors(updatedErrors)

    return !isErrors
  }

  const addFieldsStack = (property: string) => {
    let array = (formState as any)[property]
    if (property === 'experiences') {
      array.push({ ...initialExperience })
    } else if (property === 'educations') {
      array.push({ ...initialEducation })
    }
    const updatedForm = { ...formState, [property]: array }
    localStorage.setItem('formState', JSON.stringify(updatedForm))
    setFormState(updatedForm)
  }

  const resetForm = () => {
    localStorage.removeItem('errors')
    localStorage.removeItem('formState')
    localStorage.removeItem('validatedInputs')
    setFormState({ ...formStateStarter })
    setErrors({})
    setValidatedInputs({})
  }

  useEffect(() => {
    const fetchDegrees = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/degrees`,
        )
        setDegrees(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchDegrees()
  }, [])

  const displayDegree = (id: number | string) => {
    if (typeof id === 'string') {
      return id
    }
    const selectedDegree = (degrees as any)?.filter(
      (degree: any) => degree.id === id,
    )[0]
    return selectedDegree?.title
  }

  const value = useMemo(
    () => ({
      formState,
      errors,
      updateFormState,
      validateForm,
      validatedInputs,
      addFieldsStack,
      checkObjectFields,
      resetForm,
      degrees,
      setFormState,
      setLoading,
      displayDegree,
      checkFormState,
    }),
    [formState, errors, degrees, loading],
  )
  return (
    <Form.Provider value={value}>
      {loading ? <Loading /> : children}
    </Form.Provider>
  )
}

export default function useForm() {
  return useContext(Form)
}
