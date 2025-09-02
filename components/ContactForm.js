import { useState } from 'react'
import { lang } from '@/lib/lang'
import { useRouter } from 'next/router'

function Contact() {
  const [showResult, setShowResult] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const { locale } = useRouter()
  const t = lang[locale]

  const sentMessage = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    // setTimeout(() => {
    //   setSubmitting(false)
    //   setShowResult(true)
    // }, 3000)

    const tgUrl = '/api/sendtotg'
    const res = await fetch(tgUrl, {
      body: JSON.stringify({
        name: event.target.name.value,
        mail: event.target.mail.value,
        message: event.target.message.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    // await res.json()
    const result = await res.json()
    const status = result.status
    console.log('status:', status)
    if (status === 'Success') {
      setSubmitting(false)
      setShowResult(true)
    } else {
      alert(t.CONTACT.FAILED_MESSAGE)
    }
  }
  return (
    <>
      {showResult ? (
        <div>
          <p className='max-w-screen-md font-bold md:text-lg text-center mx-auto'>
            {t.CONTACT.SUCCESS_MESSAGE}
          </p>
        </div>
      ) : (
        <form
          className='max-w-screen-md grid sm:grid-cols-2 gap-4 mx-auto'
          onSubmit={sentMessage}
        >
          <div>
            <input
              name='name'
              id='name'
              type='text'
              required
              placeholder={t.CONTACT.FORM_USERNAME}
              className='block w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white dark:focus:bg-gray-600'
            />
          </div>
          <div>
            <input
              name='email'
              id='mail'
              type='text'
              required
              placeholder={t.CONTACT.FORM_EMAIL}
              className='block w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white dark:focus:bg-gray-600'
            />
          </div>

          <div className='sm:col-span-2'>
            <textarea
              name='message'
              id='message'
              type='text'
              required
              placeholder={t.CONTACT.FORM_CONTENT}
              className='h-64 block w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white dark:focus:bg-gray-600'
            ></textarea>
          </div>

          <div className='sm:col-span-2 flex justify-between items-center'>
            {submitting ? (
              <button
                disabled
                className='cursor-not-allowed inline-block bg-gray-300 dark:bg-gray-600 text-center rounded-lg outline-none transition duration-100 px-8 py-3'
              >
                <svg
                  className='animate-spin h-5 w-5 text-gray-600 dark:text-day'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='white'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
              </button>
            ) : (
              <button
                type='submit'
                className='cursor-pointer inline-block bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-center rounded-lg outline-none transition duration-100 px-8 py-3'
              >
                <p className='text-gray-400 h-5'>{t.CONTACT.SEND_BUTTON}</p>
              </button>
            )}
            <p className='mb-2 text-gray-400 text-xs'>
              {t.CONTACT.FORM_EMAIL_REQUIRED}
            </p>
          </div>
        </form>
      )}
    </>
  )
}

export default Contact
