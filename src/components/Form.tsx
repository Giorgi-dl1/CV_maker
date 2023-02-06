import PersonalInfoInputs from './PersonalInfoInputs'

interface FormInterface {
  step: any
}

const Form = ({ step }: FormInterface) => {
  const renderInputs = (step: string) => {
    switch (step) {
      case 'personal_info':
        return <PersonalInfoInputs />
    }
  }
  console.log(step)
  return (
    <form action="" className="mt-[77px]">
      {renderInputs(step)}
    </form>
  )
}

export default Form
