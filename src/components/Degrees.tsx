import useForm from '../hooks/useForm'
import vector from '../assets/Vector.png'
import { useState } from 'react'

const Degrees = ({ index }: { index: number }) => {
  const [showItems, setShowItems] = useState(false)

  const {
    errors,
    validatedInputs,
    formState,
    updateFormState,
    degrees,
    displayDegree,
  } = useForm()
  const errorsArr = errors['educations'] || [{}]
  const errorsObj = errorsArr[index] || {}

  const validsArr = validatedInputs['educations'] || [{}]
  const validsObj = validsArr[index] || {}

  const degreeId = formState['educations'][index]['degree']

  const setDegree = (value: number) => {
    updateFormState('educations', value, index, 'degree')
    setShowItems(false)
  }

  return (
    <div className="relative flex-grow min-w-[370px]">
      <div
        className={`label ${errorsObj['degree'] ? '!text-[#EF5050]' : null}`}
      >
        ხარისხი
      </div>
      <div
        onClick={() => setShowItems(!showItems)}
        className={`input bg-white cursor-pointer flex justify-between items-center ${
          validsObj['degree']
            ? '!border-[#98E37E]'
            : errorsObj['degree']
            ? '!border-[#EF5050]'
            : null
        }`}
      >
        <span>
          {degreeId ? (
            displayDegree(degreeId)
          ) : (
            <span className="text-[#909090]">აირჩიეთ ხარისხი</span>
          )}
        </span>
        <img className="-rotate-90 w-[6px]" src={vector} alt="" />
      </div>
      <div
        className={`${
          !showItems && '!scale-75 !opacity-0 pointer-events-none'
        } transition-all overflow-hidden duration-300 scale-100 opacity-100 absolute left-0 right-0 z-10 bg-white text-[#1A1A1A] rounded`}
      >
        {(degrees as any)?.map((degree: any) => (
          <div
            onClick={() => setDegree(degree.id)}
            key={degree.id}
            className="py-[10px] transition duration-300 hover:bg-[#e9e9e9] px-[16px] cursor-pointer"
          >
            {degree.title}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Degrees
