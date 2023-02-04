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
