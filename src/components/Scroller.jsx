import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getPageTitle } from '../utils'

function Scroller() {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = getPageTitle(pathname)
    window.scrollTo({
      top: 0,
      left: 0,
    })
  }, [pathname])

  return null
}

export default Scroller
