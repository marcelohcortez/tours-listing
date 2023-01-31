import { useState, useEffect } from 'react'

import Tours from './components/tours/tours.component'

import './App.css'

const URL = 'https://course-api.com/react-tours-project'

function App() {
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState('false')

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id)
    setTours(newTours)
  }

  const fecthTours = async () => {
    setLoading(true)

    try {
      const response = await fetch(URL)
      const data = await response.json()

      setLoading(false)
      setTours(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fecthTours()
  }, [])
  
  if (loading) {
    return (
      <main>
        <h2>Loading</h2>
      </main>
    )
  }

  if (tours.length === 0) {
    return (
      <main>
        <h2>NO DATA</h2>
        <button className='btn' onClick={() => fecthTours()}>Refresh</button>
      </main>
    )
  }

  return (
    <main>
      <Tours tours={tours} removeTour={removeTour}></Tours>
    </main>
  )
}

export default App
