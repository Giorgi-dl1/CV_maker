import { useEffect, useState } from 'react'
import useForm from '../hooks/useForm'
import { checkExistance } from '../utils'

const CVExperiences = () => {
  const [exists, setExists] = useState(false)

  const { formState, checkObjectFields } = useForm()
  const { experiences } = formState

  useEffect(() => {
    if (checkExistance(experiences) && !exists) {
      setExists(true)
    } else if (!checkExistance(experiences) && exists) {
      setExists(false)
    }
  }, [formState])

  return exists ? (
    <div className="mt-[19px] border-t border-[#C8C8C8]">
      <h2 className="pt-[24px] pb-[15px] cv-header">გამოცდილება</h2>
      {experiences.map((experience, index) => {
        return checkObjectFields(experience) ? (
          <div key={index}>
            <h3 className="font-medium pb-[7px]">
              {experience['position']}
              {experience['position'] && experience['employer'] && ', '}
              {experience['employer']}
            </h3>
            <div className="font-helavicta-italic italic mb-4 text-[#909090]">
              <span>{experience['start_date']?.split('/')?.join('-')}</span>
              {experience['start_date'] && experience['due_date'] && (
                <span> - </span>
              )}
              <span>{experience['due_date']?.split('/')?.join('-')}</span>
            </div>
            <div>{experience['description']}</div>
          </div>
        ) : null
      })}
    </div>
  ) : null
}

export default CVExperiences
