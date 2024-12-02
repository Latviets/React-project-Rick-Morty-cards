import axios from 'axios'
import './App.css'
import { useState } from 'react'
import { ApiResponse, Character } from './components/CharacterType/types'
import CardList from './components/molecules/CardList'
import Header from './components/molecules/Header'
import Button from './components/Buttons'
import { useQuery } from '@tanstack/react-query'

function App() {
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([])
  const [currentFilter, setCurrentFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const ITEMS_PER_PAGE = 18

  const { data: characters, isLoading } = useQuery({
    queryKey: ['characters'],
    queryFn: async () => {
      let allCharacters: Character[] = []
      let nextPage: string | null = 'https://rickandmortyapi.com/api/character'

      while (nextPage) {
        const response: { data: ApiResponse } = await axios.get(nextPage)
        allCharacters = [...allCharacters, ...response.data.results]
        nextPage = response.data.info.next ?? null
      }
      setFilteredCharacters(allCharacters)
      return allCharacters
    }
  })

  const handleFilterChange = (filter: string) => {
    setCurrentFilter(filter)
    setCurrentPage(1)
    if (filter === 'all') {
      setFilteredCharacters(characters || [])
    } else if (filter === 'favorites') {
      const favoritedChars = (characters || []).filter(char => favorites.has(char.id))
      setFilteredCharacters(favoritedChars)
    } else {
      const filtered = (characters || []).filter(char =>
        char.status.toLowerCase() === filter.toLowerCase()
      )
      setFilteredCharacters(filtered)
    }
  }

  const toggleFavorite = (id: number) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(id)) {
      newFavorites.delete(id)
    } else {
      newFavorites.add(id)
    }
    setFavorites(newFavorites)
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
          <CardList
            characters={currentItems}
            onFavoriteToggle={toggleFavorite}
            favorites={favorites}
          />
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