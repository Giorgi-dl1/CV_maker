export const formatNumber = (str: string) => {
  let number = str
  if (number.length === 13) {
    number = `${number.slice(0, 4)} ${number.slice(4, 7)} ${number.slice(
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
    if (obj[key].length && !isFilled) {
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
    number = ''
    return number
  }
  number = number.replace(/[^\+\d]/g, '')
  if (!number.startsWith('+995') && number.length > 3) {
    number = `+995${number}`
  }

  return number
}
