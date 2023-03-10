import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useForm from '../hooks/useForm'
import EducationFieldsStack from './EducationFieldsStack'

const EducationInputs = () => {
  const { formState, addFieldsStack, checkFormState } = useForm()
  const { educations } = formState

  const navigate = useNavigate()

  const clickHandler = () => {
    if (checkFormState('educations')) {
      navigate('/result')
    }
  }

  useEffect(() => {
    if (!checkFormState('personal_info')) {
      navigate('/cv/personal_info')
    } else if (!checkFormState('experiences')) {
      navigate('/cv/experience')
    }
  }, [])

  return (
    <div>
      <div className="space-y-[42px]">
        {educations?.map((education, index) => (
          <EducationFieldsStack
            key={index}
            education={education}
            index={index}
          />
        ))}
      </div>
      <div
        onClick={() => addFieldsStack('educations')}
        className="button hover:!bg-[#336ee6] !bg-[#62A1EB] mt-[45px] mb-[185px]"
      >
        სხვა სასწავლებლის დამატება
      </div>
      <div className="flex justify-between gap-2">
        <Link to={'/cv/experience'}>
          <div className="button">უკან</div>
        </Link>
        <div onClick={clickHandler} className="button">
          დასრულება
        </div>
      </div>
    </div>
  )
}

export default EducationInputs
