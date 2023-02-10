import { experience } from '../types'
import ArrayFormInput from './ArrayFormInput'

interface ExperienceFieldsStack {
  experience: experience
  index: number
}

const ExperienceFieldsStack = ({
  experience,
  index,
}: ExperienceFieldsStack) => {
  return (
    <div className="pb-[58px] border-b border-[#C1C1C1]">
      <ArrayFormInput
        label="თანამდებობა"
        placeholder="თანამდებობა"
        id="experiences"
        property="position"
        value={experience['position']}
        rule="მინიმუმ 2 სიმბოლო"
        index={index}
      />

      <div className="my-[31px]">
        <ArrayFormInput
          label="დამსაქმებელი"
          placeholder="დამსაქმებელი"
          id="experiences"
          property="employer"
          value={experience['employer']}
          rule="მინიმუმ 2 სიმბოლო"
          index={index}
        />
      </div>
      <div className="my-[31px] inputs-between">
        <div className="flex-grow">
          <ArrayFormInput
            label="დაწყების რიცხვი"
            id="experiences"
            property="start_date"
            type="date"
            value={experience['start_date']?.split('/')?.join('-')}
            index={index}
          />
        </div>

        <div className="flex-grow">
          <ArrayFormInput
            label="დამთავრების რიცხვი"
            id="experiences"
            property="due_date"
            type="date"
            value={experience['due_date']?.split('/')?.join('-')}
            index={index}
          />
        </div>
      </div>

      <ArrayFormInput
        label="აღწერა"
        placeholder="როლი თანამდებობაზ და ზოგადი აღწერა"
        id="experiences"
        property="description"
        value={experience['description']}
        index={index}
        type="textarea"
      />
    </div>
  )
}

export default ExperienceFieldsStack
