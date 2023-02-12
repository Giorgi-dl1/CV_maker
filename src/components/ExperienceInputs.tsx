import { Link } from 'react-router-dom'
import useForm from '../hooks/useForm'
import { useNavigate } from 'react-router-dom'
import ExperienceFieldsStack from './ExperienceFieldsStack'
import { useEffect } from 'react'

const ExperienceInputs = () => {
  const { formState, addFieldsStack, checkFormState } = useForm()
  const { experiences } = formState

  const navigate = useNavigate()

  const clickHandler = () => {
    if (checkFormState('experiences')) {
      navigate('/cv/education')
    }
  }
  useEffect(() => {
    if (!checkFormState('personal_info')) {
      navigate('/cv/personal_info')
    }
  }, [])

  return (
    <div>
      <div className="space-y-[42px]">
        {experiences?.map((experience, index) => (
          <ExperienceFieldsStack
            key={index}
            experience={experience}
            index={index}
          />
        ))}
      </div>
      <div
        onClick={() => addFieldsStack('experiences')}
        className="button hover:!bg-[#336ee6] !bg-[#62A1EB] mt-[45px] mb-[100px]"
      >
        მეტი გამოცდილების დამატება
      </div>
      <div className="flex justify-between gap-2">
        <Link to={'/cv/personal_info'}>
          <div className="button">უკან</div>
        </Link>
        <div onClick={clickHandler} className="button">
          შემდეგი
        </div>
      </div>
    </div>
  )
}

export default ExperienceInputs
