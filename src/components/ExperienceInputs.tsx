import { Link } from 'react-router-dom'
import useForm from '../hooks/useForm'
import { useNavigate } from 'react-router-dom'
import ExperienceFieldsStack from './ExperienceFieldsStack'

const ExperienceInputs = () => {
  const { formState, addFieldsStack, checkRequiredsInArray, errors } = useForm()
  const { experiences } = formState

  const navigate = useNavigate()

  const clickHandler = () => {
    if (checkRequiredsInArray('experiences')) {
      navigate('/cv/education')
    }
  }

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
        className="button !bg-[#62A1EB] mt-[45px] mb-[111px]"
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
