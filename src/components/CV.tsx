import { useLocation } from 'react-router-dom'
import CVAbout_me from './CVAbout_me'
import CVEducations from './CVEducations'
import CVExperiences from './CVExperiences'
import cvLogo from '../assets/CV_LOGO.png'

const CV = () => {
  const { pathname } = useLocation()

  return (
    <div
      className={`max-w-[822px] ${
        pathname === '/result' && 'border-[0.8px] border-black'
      } min-w-[822px] relative w-full px-[75px] py-[48px] min-h-[1080px] max-h-max`}
    >
      <CVAbout_me />
      <CVExperiences />
      <CVEducations />
      <img className="absolute bottom-[44px] left-[78px]" src={cvLogo} alt="" />
    </div>
  )
}

export default CV
