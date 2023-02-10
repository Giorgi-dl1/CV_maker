export type experience = {
  position: string
  employer: string
  start_date: string
  due_date: string
  description: string
}

export type education = {
  institute: string
  degree: string
  due_date: string
  description: string
}

export type formState = {
  name: string
  surname: string
  email: string
  phone_number: string
  experiences: experience[]
  educations: education[]
  image: string
  about_me?: string
}

export interface FormInterface {
  formState: formState
  errors: any
  updateFormState: any
  validateForm: any
  validatedInputs: any
  checkRequireds: any
  addFieldsStack: any
  checkRequiredsInArray: any
  checkObjectFields: any
  resetForm: any
}
export interface FormProviderInterface {
  children: React.ReactNode
}
