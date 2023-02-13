import { useEffect } from 'react'
import logo from '../assets/logo.png'
import background from '../assets/background.png'
import logo2 from '../assets/logo2.png'
import { Link } from 'react-router-dom'
import useForm from '../hooks/useForm'
import { formStateStarter } from '../initialVariables'
const HomeScreen = () => {
  const { resetForm, setFormState } = useForm()
  useEffect(() => {
    resetForm()
    setFormState({ ...formStateStarter })
    localStorage.removeItem('success')
  }, [])
  return (
    <div className="relative w-screen h-screen overflow-hidden x-padding">
      <header className="py-[15px] md:py-[25px] border-b border-[#1A1A1A]">
        <img src={logo} alt="logo" className="w-[150px] md:w-[236px] h-full" />
      </header>
      <main>
        <img
          src={background}
          alt=""
          loading="lazy"
          className="absolute pointer-events-none top-0 w-screen h-screen object-cover left-0 z-[-2]"
        />
        <img
          src={logo2}
          alt=""
          loading="lazy"
          className="w-[150px] h-[150px] pointer-events-none md:w-[299px] md:h-[299px] absolute left-[50%] top-[50%] -translate-y-[25%] md:translate-x-[40%]"
        />
        <Link to={'/cv/personal_info'}>
          <button className="absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] w-[464px] max-w-[90vw] py-[18px] bg-[#1A1A1A] text-white rounded-lg text-xl font-medium">
            რეზიუმეს დამატება
          </button>
        </Link>
      </main>
    </div>
  )
}

export default HomeScreen
