import useForm from '../hooks/useForm'
import phoneIcon from '../assets/phone.png'
import emailIcon from '../assets/email.png'
import { formatNumber } from '../utils'

const CVAbout_me = () => {
  const { formState } = useForm()

  const imageURL =
    formState['image'].split('/')[1] === 'storage'
      ? `${process.env.REACT_APP_BASE_URL}${formState['image']}`
      : formState['image']

  return (
    <div className="flex gap-2">
      <div className="w-[425px]">
        <h1 className="pb-[7px] pt-[20px] gap-[20px] break-words max-w-[425px] text-4xl font-helavicta-bold text-[#F93B1D] font-bold">
          {formState['name'] && <>{formState['name']}</>}{' '}
          {formState['surname'] && <>{formState['surname']}</>}
        </h1>
        {formState['email'] && (
          <div className="flex items-center text-[18px] gap-[10px] my-[10px]">
            <img
              src={emailIcon}
              alt="email icon"
              className="w-[16px] h-[16px]"
            />
            <span>{formState['email']}</span>
          </div>
        )}
        {formState['phone_number'] && (
          <div className="flex items-center text-[18px] gap-[10px] my-[10px]">
            <img
              src={phoneIcon}
              alt="phone icon"
              className="w-[16px] h-[16px]"
            />
            <span>{formatNumber(formState['phone_number'])}</span>
          </div>
        )}
        {formState['about_me'] && (
          <div>
            <h2 className="cv-header mt-[34px] mb-[15px]">ჩემ შესახებ</h2>
            <p>{formState['about_me']}</p>
          </div>
        )}
      </div>
      <div>
        {formState['image'] && (
          <img
            src={imageURL}
            alt="hero"
            className="w-[246px] h-[246px] rounded-full object-cover"
          />
        )}
      </div>
    </div>
  )
}

export default CVAbout_me
