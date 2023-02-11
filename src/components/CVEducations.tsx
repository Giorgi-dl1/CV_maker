import { useEffect, useState } from 'react'
import useForm from '../hooks/useForm'
import { checkExistance } from '../utils'

const CVEducations = () => {
  const [exists, setExists] = useState(false)

  const { formState, checkObjectFields, displayDegree } = useForm()
  const { educations } = formState

  useEffect(() => {
    if (checkExistance(educations) && !exists) {
      setExists(true)
    } else if (!checkExistance(educations) && exists) {
      setExists(false)
    }
  }, [formState])

  return exists ? (
    <div className="mt-[19px] border-t border-[#C8C8C8]">
      <h2 className="pt-[24px] pb-[15px] cv-header">განათლება</h2>
      {educations.map((education, index) => {
        return checkObjectFields(education) ? (
          <div key={index}>
            <h3 className="font-medium pb-[7px]">
              {education['institute']}
              {education['institute'] && education['degree'] && ', '}
              {education['degree'] && displayDegree(education['degree'])}
            </h3>
            <div className="font-helavicta-italic italic mb-4 text-[#909090]">
              {education['due_date']?.split('/')?.join('-')}
            </div>
            <div>{education['description']}</div>
          </div>
        ) : null
      })}
    </div>
  ) : null
}

export default CVEducations
