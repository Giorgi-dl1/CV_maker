import useForm from '../hooks/useForm'
import passes from '../assets/passes.png'
import errorIcon from '../assets/error.png'
import { ChangeEvent } from 'react'

interface InputInterface {
  label: string
  id: string
  placeholder?: string
  rule?: string
  index: number
  property: string
  value: string
  type?: string
}

const ArrayFormInput = ({
  label,
  id,
  placeholder,
  rule,
  index,
  property,
  value,
  type,
}: InputInterface) => {
  const { updateFormState, errors, validatedInputs } = useForm()

  const validsArr = validatedInputs[id] || [{}]
  const validsObj = validsArr[index] || {}

  const errorsArr = errors[id] || [{}]
  const errorsObj = errorsArr[index] || {}

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const target: any = e.target
    const value =
      type === 'date' ? target.value.split('-').join('/') : target.value

    updateFormState(id, value, index, property)
  }

  const textareaHandler = (e: any) => {
    const target = e.target as HTMLInputElement
    let height = target.scrollHeight
    if (height > 103) {
      target.style.height = height + 'px'
    } else {
      target.style.height = '103px'
    }
    updateFormState(id, target.value, index, property)
  }

  return type !== 'textarea' ? (
    <div className="input-wrapper">
      <label
        className={`label ${errorsObj[property] ? '!text-[#EF5050]' : null}`}
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative">
        <input
          value={value}
          onBlur={(e) =>
            updateFormState(id, e.target.value.trim(), index, property)
          }
          className={`input ${
            validsObj[property]
              ? '!border-[#98E37E]'
              : errorsObj[property]
              ? '!border-[#EF5050]'
              : null
          }`}
          onChange={changeHandler}
          type={type || 'text'}
          name={id}
          id={id}
          placeholder={placeholder || ''}
        />
        {validsObj[property] && !type ? (
          <img
            src={passes}
            className="absolute top-[15px] right-[15px]"
            alt="successIcon"
          />
        ) : errorsObj[property] ? (
          <img
            src={errorIcon}
            className="absolute top-[15px] -right-[30px]"
            alt="successIcon"
          />
        ) : null}
      </div>
      {rule ? <div className="rule">{rule}</div> : null}
    </div>
  ) : (
    <div className="input-wrapper">
      <label htmlFor="about_me" className="label">
        {label}
      </label>
      <textarea
        onChange={textareaHandler}
        value={value}
        onBlur={(e) =>
          updateFormState(id, e.target.value.trim(), index, property)
        }
        name={id}
        id={id}
        placeholder={placeholder}
        className={`resize-none  input h-max ${
          id === 'educations' ? 'min-h-[179px]' : 'min-h-[123px]'
        }  ${
          validsObj[property]
            ? '!border-[#98E37E]'
            : errorsObj[property]
            ? '!border-[#EF5050]'
            : null
        }`}
      ></textarea>
    </div>
  )
}

export default ArrayFormInput
