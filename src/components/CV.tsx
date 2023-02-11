import CVAbout_me from './CVAbout_me'
import CVEducations from './CVEducations'
import CVExperiences from './CVExperiences'

const CV = () => {
  return (
    <div className="max-w-[822px] min-w-[822px] w-full px-[75px] py-[48px]">
      <CVAbout_me />
      <CVExperiences />
      <CVEducations />
    </div>
  )
}

export default CV
