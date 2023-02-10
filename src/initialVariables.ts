import { experience, FormInterface, formState } from './types'

export const initialExperience: experience = {
  position: '',
  employer: '',
  start_date: '',
  due_date: '',
  description: '',
}

export const initialFormState: formState = JSON.parse(
  localStorage.getItem('formState')!,
) || {
  name: '',
  surname: '',
  email: '',
  phone_number: '',
  experiences: [{ ...initialExperience }],
  educations: [],
  image: '',
}
export const initialState: FormInterface = {
  formState: initialFormState,
  errors: {},
  updateFormState: () => {},
  validateForm: () => {},
  validatedInputs: {},
  checkRequireds: () => {},
  addFieldsStack: () => {},
  checkRequiredsInArray: () => {},
  checkObjectFields: () => {},
  resetForm: () => {},
}
