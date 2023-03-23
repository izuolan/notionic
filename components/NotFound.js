import Link from 'next/link'
import { lang } from '@/lib/lang'
import { useRouter } from 'next/router'

const Page404 = ({ statusCode }) => {
  const { locale } = useRouter()
  const t = lang[locale]
  return (
    <div className='py-6 sm:py-8 lg:py-12'>
      <div className='max-w-screen-2xl px-4 md:px-8 mx-auto'>
        <div className='flex flex-col items-center'>
          <div className='inline-flex items-center gap-2.5 mb-8'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 100 100'
              className='h-6 hover:text-blue-500 fill-current dark:text-white'
            >
              <g transform='translate(0.000000,100) scale(0.080000,-0.080000)'>
                <path d='M762 1203 c-6 -15 -13 -46 -17 -68 -4 -22 -13 -49 -20 -61 -15 -23 -122 -69 -257 -109 -49 -14 -88 -28 -88 -29 0 -2 33 -20 73 -40 49 -24 87 -36 115 -36 28 0 42 -4 42 -13 0 -34 -295 -517 -390 -639 -40 -52 -4 -28 86 56 49 46 105 109 124 141 19 31 64 98 100 148 77 108 125 186 173 283 20 39 46 78 59 86 13 8 69 34 126 58 107 45 118 57 110 111 -3 21 -10 25 -78 34 l-75 10 -5 45 c-5 42 -7 45 -36 48 -26 3 -33 -1 -42 -25z' />
                <path d='M754 616 c-40 -19 -88 -39 -108 -46 -43 -14 -45 -30 -7 -72 25 -28 33 -31 80 -30 39 1 54 -3 58 -15 7 -18 -30 -140 -58 -192 -36 -67 6 -93 135 -84 l86 6 0 -26 c0 -14 -4 -37 -10 -51 -5 -14 -8 -26 -6 -26 7 0 110 68 129 85 11 10 17 30 17 60 0 62 -22 70 -150 57 -52 -5 -98 -6 -103 -2 -4 3 3 31 16 61 13 30 32 78 42 108 10 30 28 70 41 89 26 38 30 63 14 93 -17 31 -91 25 -176 -15z' />
              </g>
            </svg>
          </div>

          <p className='text-sm md:text-base font-semibold uppercase mb-4'>
            {t.ERROR.MESSAGE}
          </p>
          <h1 className='text-2xl md:text-3xl font-bold text-center mb-2'>
            {statusCode
              ? `${statusCode} - ${t.ERROR.TITLE}`
              : `Error - ${t.ERROR.TITLE}`}
          </h1>

          <p className='max-w-screen-md md:text-lg text-center mb-12'>
            {t.ERROR.HELP_TEXT}
          </p>

          <Link
            href='/'
            scroll={false}
            className='inline-block bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm md:text-base font-semibold text-center rounded-lg outline-none px-8 py-3'
          >
            {t.ERROR.BACK_TO_HOME}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Page404
