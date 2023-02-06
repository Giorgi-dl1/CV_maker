import useForm from '../hooks/useForm'
import passes from '../assets/passes.png'
import errorIcon from '../assets/error.png'

interface InputInterface {
  label: string
  id: string
  placeholder: string
  rule?: string
}

const Input = ({ label, id, placeholder, rule }: InputInterface) => {
  const { updateFormState, errors, validatedInputs } = useForm()

  return (
    <div className="input-wrapper">
      <label
        className={`label ${errors[id] ? '!text-[#EF5050]' : null}`}
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative">
        <input
          className={`input ${
            validatedInputs[id]
              ? '!border-[#98E37E]'
              : errors[id]
              ? '!border-[#EF5050]'
              : null
          }`}
          onChange={(e) => updateFormState(id, e.target.value)}
          type="text"
          name={id}
          id={id}
          placeholder={placeholder}
        />
        {validatedInputs[id] ? (
          <img
            src={passes}
            className="absolute top-[15px] right-[15px]"
            alt="successIcon"
          />
        ) : errors[id] ? (
          <img
            src={errorIcon}
            className="absolute top-[15px] -right-[30px]"
            alt="successIcon"
          />
        ) : null}
      </div>
      {rule ? <div className="rule">{rule}</div> : null}
    </div>
  )
}

export default Input
