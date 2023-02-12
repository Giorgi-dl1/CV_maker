import EducationInputs from './EducationInputs'
import ExperienceInputs from './ExperienceInputs'
import PersonalInfoInputs from './PersonalInfoInputs'

interface FormInterface {
  step: any
}

const Form = ({ step }: FormInterface) => {
  const renderInputs = (step: string) => {
    switch (step) {
      case 'personal_info':
        return <PersonalInfoInputs />
      case 'experience':
        return <ExperienceInputs />
      case 'education':
        return <EducationInputs />
    }
  }
  return <form className="mt-[77px]">{renderInputs(step)}</form>
}

export default Form
