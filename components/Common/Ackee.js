'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import useAckee from 'use-ackee'

const Ackee = ({ ackeeServerUrl, ackeeDomainId }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const asPath = searchParams?.toString()
    ? `${pathname}?${searchParams.toString()}`
    : pathname

  useAckee(
    asPath,
    { server: ackeeServerUrl, domainId: ackeeDomainId },
    { detailed: false, ignoreLocalhost: true }
  )
  return null
}

export default Ackee
