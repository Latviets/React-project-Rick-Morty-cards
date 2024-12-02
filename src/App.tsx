import axios from 'axios'
import './App.css'
import { useState, useEffect } from 'react'
import { ApiResponse, Character } from './components/CharacterType/types'
import CardList from './components/molecules/CardList'
import Header from './components/molecules/Header'
import Button from './components/Buttons'

function App() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([])
  const [currentFilter, setCurrentFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 18

  const getCharacters = async () => {
    try {
      setIsLoading(true)
      let allCharacters: Character[] = []
      let nextPage = 'https://rickandmortyapi.com/api/character'

      while (nextPage) {
        const response = await axios.get<ApiResponse>(nextPage)
        allCharacters = [...allCharacters, ...response.data.results]
        nextPage = response.data.info.next
      }

      setCharacters(allCharacters)
      setFilteredCharacters(allCharacters)
    } catch (error) {
      console.error('Error fetching characters:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getCharacters()
  }, [])

  const handleFilterChange = (filter: string) => {
    setCurrentFilter(filter)
    setCurrentPage(1)
    if (filter === 'all') {
      setFilteredCharacters(characters)
    } else {
      const filtered = characters.filter(char =>
        char.status.toLowerCase() === filter.toLowerCase()
      )
      setFilteredCharacters(filtered)
    }
  }

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE
  const currentItems = filteredCharacters.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredCharacters.length / ITEMS_PER_PAGE)

  return (
    <>
      <Header
        onFilterChange={handleFilterChange}
        currentFilter={currentFilter}
      />
      {isLoading ? (
        <div className="loading-container">
          Loading characters...
        </div>
      ) : (
        <>
          <CardList characters={currentItems} />
          <div className="pagination">
            <Button
              className="pagination-button"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="pagination-info">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              className="pagination-button"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </>
  )
}

export default App