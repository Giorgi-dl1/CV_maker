import { formState } from './types'

export const formatNumber = (str: string) => {
  let number = str
  if (number.length >= 5 && number.length < 8) {
    return `${number.slice(0, 4)} ${number.slice(4, 7)}`
  }
  if (number.length >= 8 && number.length < 10) {
    return `${number.slice(0, 4)} ${number.slice(4, 7)} ${number.slice(7, 9)}`
  }
  if (number.length >= 10 && number.length < 12) {
    return `${number.slice(0, 4)} ${number.slice(4, 7)} ${number.slice(
      7,
      9,
    )} ${number.slice(9, 11)}`
  }
  if (number.length >= 12 && number.length <= 13) {
    return `${number.slice(0, 4)} ${number.slice(4, 7)} ${number.slice(
      7,
      9,
    )} ${number.slice(9, 11)} ${number.slice(11)}`
  }
  return number
}

export const checkExistance = (arr: any) => {
  let exists = false
  const keys = Object.keys(arr[0])
  arr.forEach((obj: any) => {
    keys.forEach((key) => {
      if (obj[key]?.length) {
        exists = true
      }
    })
  })
  return exists
}

export const checkObjectFields = (obj: any) => {
  const keyes = Object.keys(obj)
  let isFilled = false

  keyes.forEach((key) => {
    if (obj[key]?.length && !isFilled) {
      isFilled = true
    }
  })
  return isFilled
}

export const checkErrors = (arr: any, valids: any, keyes: any) => {
  let errors: any = [{}]

  let isErrors = false

  arr.forEach((obj: any, index: number) => {
    if (index === 0) {
      keyes.forEach((key: string) => {
        if (!valids[index][key]) {
          errors[index][key] = true
          if (!isErrors) {
            isErrors = true
          }
        }
      })
    } else {
      // checks if any field is filled
      if (checkObjectFields(obj)) {
        if (!valids[index]) {
          valids[index] = {}
        }
        keyes.forEach((key: string) => {
          if (!valids[index][key]) {
            if (!errors[index]) {
              errors[index] = {}
            }
            errors[index][key] = true
            if (!isErrors) {
              isErrors = true
            }
          }
        })
      } else {
        errors[index] = {}
      }
    }
  })

  return {
    errors,
    isErrors,
  }
}

export const checkRequiredStrings = (
  requireds: string[],
  validateds: any,
  errors: any,
) => {
  let isErrors = false
  let lErrors: any = { ...errors }

  requireds.map((key) => {
    if (!validateds[key]) {
      if (!isErrors) {
        isErrors = true
      }
      lErrors[key] = true
    }
  })
  return {
    isErrors,
    errors: lErrors,
  }
}

export const addProperty = (
  obj: any,
  key: string,
  property: string,
  index: number,
) => {
  let isChanged = false

  let lObj = { ...obj }

  if (!lObj[key]) {
    lObj[key] = [{}]
  }

  let array = lObj[key]

  if (!array[index]) {
    array[index] = {}
  }

  if (!array[index][property]) {
    array[index][property] = true
    lObj[key] = array
    isChanged = true
  }

  return {
    isChanged,
    obj: lObj,
  }
}

export const removeProperty = (
  obj: any,
  key: string,
  property: string,
  index: number,
) => {
  let isChanged = false

  let lObj = { ...obj }

  if (lObj[key]) {
    if (lObj[key][index] && lObj[key][index].hasOwnProperty(property)) {
      let array = lObj[key]
      let targetObj = array[index]

      delete targetObj[property]

      isChanged = true
    }
  }

  return {
    isChanged,
    obj: lObj,
  }
}

export const formatPhoneNumber = (string: string) => {
  let number: any = string

  if (!number.length) {
    return ''
  }
  if (number.substring(1).includes('+')) {
    const firstChar = number[0]
    const rest = number.substring(1).split('+').join('')
    number = `${firstChar}${rest}`
  }
  if (
    number.startsWith('+') &&
    number.length > 2 &&
    !number.startsWith('+99')
  ) {
    number = `+995${number.substring(1)}`
  }
  if (
    !number.startsWith('+995') &&
    number.length >= 3 &&
    !number.startsWith('+')
  ) {
    number = number.startsWith('995') ? `+${number}` : `+995${number}`
  }
  number = number.replace(/[^\+\d]/g, '')

  return number
}

const filterFormArray = (arr: any) => {
  return arr.filter((obj: any) => checkObjectFields(obj))
}

function dataUrlToBlob(dataUrl: string) {
  try {
    const parts = dataUrl.split(';base64,')
    const contentType = parts[0].split(':')[1]
    const byteCharacters = atob(parts[1])
    const byteArrays = []
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i))
    }
    const byteArray = new Uint8Array(byteArrays)
    return new Blob([byteArray], { type: contentType })
  } catch (error) {
    return dataUrl
  }
}

export const getPostProps = (obj: formState) => {
  let props = { ...obj }

  const educations = props.educations.map((education: any) => {
    let obj = {
      ...education,
      degree_id: education?.degree?.toString(),
    }
    delete obj['degree']
    return obj
  })

  props['experiences'] = filterFormArray(props.experiences)
  props['educations'] = filterFormArray(educations)
  props['image'] = dataUrlToBlob(props['image'])
  return props
}

export const getPageTitle = (pathname: string) => {
  switch (pathname) {
    case '/':
      return 'Redberry'
    case '/cv/personal_info':
      return 'About Me'
    case '/cv/experience':
      return 'Experience'
    case '/cv/education':
      return 'Education'
    default:
      return 'Error 404'
  }
}
