import { useNavigate, useParams } from 'react-router-dom'
import vector from '../assets/Vector.png'
import CV from '../components/CV'
import Form from '../components/Form'
import useForm from '../hooks/useForm'

const CVScreen = () => {
  const { step } = useParams()
  const navigate = useNavigate()

  const { resetForm } = useForm()

  const getCurrentStep = (step: string) => {
    switch (step) {
      case 'personal_info':
        return {
          name: 'პირადი ინფო',
          number: 1,
        }
      case 'experience':
        return {
          name: 'გამოცდილება',
          number: 2,
        }
      case 'education':
        return {
          name: 'განათლება',
          number: 3,
        }
      default:
        return {
          name: 'Error',
          number: 0,
        }
    }
  }

  interface Step {
    name: string
    number: number
  }

  const currentStep: Step =
    typeof step === 'string'
      ? getCurrentStep(step)
      : {
          name: 'Error',
          number: 0,
        }

  const clickHandler = () => {
    resetForm()
    navigate('/')
  }

  return (
    <div className="relative flex flex-col min-h-screen md:flex-row">
      <div
        onClick={clickHandler}
        className="absolute w-[40px] rounded-full cursor-pointer grid place-content-center h-[40px] bg-white left-[48px] top-[45px]"
      >
        <img src={vector} alt="" />
      </div>
      <div className="w-[822px] md:w-full bg-[#F9F9F9] px-[100px] md:px-[20px] lg:px-[60px] py-[47px]">
        <div className="flex text-[#1A1A1A] pb-[12px] justify-between border-b border-[#1A1A1A]">
          <h1 className="text-2xl font-bold font-helavicta-bold">
            {currentStep.name}
          </h1>
          <div className="text-xl ">
            <span>{currentStep.number}</span>/<span>3</span>
          </div>
        </div>
        <Form step={step} />
      </div>
      <CV />
    </div>
  )
}

export default CVScreen
