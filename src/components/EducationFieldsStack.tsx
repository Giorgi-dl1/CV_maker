import { education } from '../types'
import ArrayFormInput from './ArrayFormInput'
import Degrees from './Degrees'

interface EducationFieldsStack {
  education: education
  index: number
}

const EducationFieldsStack = ({ education, index }: EducationFieldsStack) => {
  return (
    <div className="pb-[58px] border-b border-[#C1C1C1]">
      <ArrayFormInput
        label="სასწავლებელი"
        placeholder="სასწავლებელი"
        id="educations"
        property="institute"
        value={education['institute']}
        rule="მინიმუმ 2 სიმბოლო"
        index={index}
      />
      <div className="my-[31px] inputs-between">
        <div className="flex-grow">
          <Degrees index={index} />
        </div>

        <div className="flex-grow">
          <ArrayFormInput
            label="დამთავრების რიცხვი"
            id="educations"
            property="due_date"
            type="date"
            value={education['due_date']?.split('/')?.join('-')}
            index={index}
          />
        </div>
      </div>
      <ArrayFormInput
        label="აღწერა"
        placeholder="განათლების აღწერა"
        id="educations"
        property="description"
        value={education['description']}
        index={index}
        type="textarea"
      />
    </div>
  )
}

export default EducationFieldsStack
