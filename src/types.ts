export type experience = {
  position: string
  employer: string
  start_date: string
  due_date: string
  description: string
}

export type education = {
  institute: string
  degree?: number | null
  degree_id?: number | null
  due_date: string
  description: string
}

export type formState = {
  id?: number
  name: string
  surname: string
  email: string
  phone_number: string
  experiences: experience[]
  educations: education[]
  image: any
  about_me?: string
}

type degree = {
  id: number
  title: string
}

export interface Degrees {
  degrees: degree[]
  index: number
}

export interface FormInterface {
  formState: formState
  errors: any
  updateFormState: any
  validateForm: any
  validatedInputs: any
  addFieldsStack: any
  checkObjectFields: any
  resetForm: any
  degrees: Degrees | null
  displayDegree: any
  setFormState: any
  setLoading: any
  checkFormState: any
}
export interface FormProviderInterface {
  children: React.ReactNode
}
