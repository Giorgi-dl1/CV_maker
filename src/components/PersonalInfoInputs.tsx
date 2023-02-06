import Input from './Input'
import useForm from '../hooks/useForm'
import { useNavigate } from 'react-router-dom'

const PersonalInfoInputs = () => {
  const navigate = useNavigate()
  const { updateFormState, formState, errors, checkRequireds } = useForm()

  const imageHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    const file: File = (target.files as FileList)[0]

    const reader = new FileReader()

    reader.addEventListener('load', () => {
      updateFormState('image', reader.result)
    })
    reader.readAsDataURL(file)
  }

  const textareaHandler = (e: any) => {
    const target = e.target as HTMLInputElement
    let height = target.scrollHeight
    if (height > 103) {
      target.style.height = height + 'px'
    } else {
      target.style.height = '103px'
    }
    updateFormState('about_me', target.value)
  }

  const requiredFields = ['name', 'surname', 'image', 'email', 'phone_number']

  const clickHandler = () => {
    console.log(checkRequireds(requiredFields))
    if (checkRequireds(requiredFields)) {
      navigate('/cv/experience')
    }
  }

  return (
    <>
      <div className="flex md:gap-[16px] lg:gap-[56px] flex-wrap">
        <div className="flex-grow">
          <Input
            label="სახელი"
            id="name"
            placeholder="ანზორ"
            rule="მინიმუმ 2 ასო, ქართული ასოები"
          />
        </div>
        <div className="flex-grow">
          <Input
            label="გვარი"
            id="surname"
            placeholder="მუმლაძე"
            rule="მინიმუმ 2 ასო, ქართული ასოები"
          />
        </div>
      </div>

      <div className="flex gap-[19px] items-center mt-[54px] mb-[49px]">
        <div className={`label ${errors['image'] ? '!text-[#EF5050]' : ''}`}>
          პირადი ფოტოს ატვირთვა
        </div>
        <label
          htmlFor="image"
          className="px-[19px] cursor-pointer py-[5px] text-white bg-[#0E80BF] rounded"
        >
          ატვირთვა
        </label>
        <input
          onChange={imageHandler}
          type="file"
          id="image"
          name="image"
          accept="image/png, image/jpeg, image/jpg"
          className="hidden"
        />
      </div>

      <div className="input-wrapper">
        <label htmlFor="about_me" className="label">
          ჩემ შესახებ (არასავალდებულო)
        </label>
        <textarea
          onChange={textareaHandler}
          value={formState['about_me']}
          name="about_me"
          id="about_me"
          placeholder="ზოგადი ინფო შენ შესახებ"
          className={`resize-none input h-max min-h-[103px] ${
            formState['about_me'] ? '!border-[#98E37E]' : ''
          }`}
        ></textarea>
      </div>

      <div className="mb-[29px] mt-[33px]">
        <Input
          label="ელ. ფოსტა"
          placeholder="anzor66@redberry.ge"
          id="email"
          rule="უნდა მთავრდებოდეს @redberry.ge-ით"
        />
      </div>
      <Input
        label="მობილურის ნომერი"
        placeholder="+995 551 12 34 56"
        id="phone_number"
        rule="უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს"
      />
      <div className="mt-[160px] mb-[65px] flex justify-end">
        <div
          onClick={() => clickHandler()}
          className="px-[35px] cursor-pointer py-[14px] rounded bg-[#6B40E3] text-white "
        >
          შემდეგი
        </div>
      </div>
    </>
  )
}

export default PersonalInfoInputs
