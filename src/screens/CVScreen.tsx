import React from 'react'
import { useParams } from 'react-router-dom'

const CVScreen = () => {
  const { step } = useParams()
  return <div>{step}</div>
}

export default CVScreen
