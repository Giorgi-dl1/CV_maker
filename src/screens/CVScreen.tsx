import { Link, useParams } from 'react-router-dom'
import vector from '../assets/Vector.png'
import CV from '../components/CV'
import Form from '../components/Form'

const CVScreen = () => {
  const { step } = useParams()

  const getCurrentStep = (step: string) => {
    switch (step) {
      case 'personal_info':
        return {
          name: 'პირადი ინფო',
          number: 1,
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

  return (
    <div className="relative flex min-h-screen">
      <Link
        to="/"
        className="absolute w-[40px] rounded-full grid place-content-center h-[40px] bg-white left-[48px] top-[45px]"
      >
        <img src={vector} alt="" />
      </Link>
      <div className="w-full bg-[#F9F9F9] px-[150px] py-[47px]">
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
