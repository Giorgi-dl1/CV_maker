import { useNavigate } from 'react-router-dom'
import vector from '../assets/Vector.png'
import CV from '../components/CV'
import exitIcon from '../assets/exit.png'
import { useState } from 'react'
import { useEffect } from 'react'
import useForm from '../hooks/useForm'
import { getPostProps } from '../utils'
import axios from 'axios'
import { formState } from '../types'

const ResultScreen = () => {
  const [showMessage, setShowMessage] = useState(false)
  const [success, setSuccess] = useState<string | boolean>(
    localStorage.getItem('success') || false,
  )
  const navigate = useNavigate()

  const { formState, resetForm, setFormState, checkFormState } = useForm()

  useEffect(() => {
    if (success) {
      localStorage.removeItem('success')
      resetForm()
      setSuccess(false)
      navigate('/')
      return
    }
    if (!checkFormState('educations')) {
      navigate('/cv/education')
    } else {
      const props = getPostProps(formState)
      const fetchDegrees = async (props: formState) => {
        setSuccess(false)
        localStorage.removeItem('success')
        try {
          const { data } = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/cvs`,
            props,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          )
          setSuccess(true)
          localStorage.setItem('success', 'true')
          setShowMessage(true)
          resetForm()
          setFormState(data)
        } catch (error) {
          alert(error)
        }
      }
      fetchDegrees(props)
    }
  }, [])

  return (
    <div className="relative min-h-screen py-[54px] flex justify-center">
      <a
        href="/"
        className="absolute w-[40px] bg-[#F9F9F9] rounded-full cursor-pointer grid place-content-center h-[40px] left-[48px] top-[45px]"
      >
        <img src={vector} alt="" />
      </a>
      <CV />
      <div className="absolute right-[70px]">
        <div
          className={`${
            showMessage ? '!scale-100 !opacity-100' : 'pointer-events-none'
          } scale-75 opacity-0 z-50 transition-all duration-500 relative rounded w-[427px] h-[167px] px-[30px] py-[40px]  bg-white success-shadow`}
        >
          <h2 className="font-helavicta-medium font-medium text-[28px]">
            რეზიუმე წარმატებით გაიგზავნა 🎉
          </h2>
          <img
            onClick={() => setShowMessage(false)}
            className="absolute right-[11px] top-[17px] cursor-pointer"
            src={exitIcon}
            alt="exit"
          />
        </div>
      </div>
    </div>
  )
}

export default ResultScreen
