import axios from 'axios'
import './App.css'
import { useState } from 'react'
import { ApiResponse, Character } from './types'
import CardList from './components/molecules/CardList'
import Button from './components/Buttons/index'

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const getCharacters = async () => {
    const response = await axios.get<ApiResponse>(
      'https://rickandmortyapi.com/api/character')
    setCharacters(response.data.results)
  }

  return (
    <>
      <Button onClick={getCharacters}/>
      <CardList characters={characters} />
    </>
  )
}

export default App
