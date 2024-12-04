import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import { ApiResponse, Character } from '../components/CharacterType/types'
import CardList from '../components/molecules/CardList'
import Header from '../components/molecules/Header'
import { useFavorites } from '../hooks/useFavorites'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  const { favorites, toggleFavorite, isLoading: favoritesLoading } = useFavorites();
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 18;

  const { data: characters, isLoading: charactersLoading } = useQuery({
    queryKey: ['characters'],
    queryFn: async () => {
      let allCharacters: Character[] = [];
      let nextPage: string | null = 'https://rickandmortyapi.com/api/character';

      while (nextPage) {
        const response: AxiosResponse<ApiResponse> = await axios.get(nextPage);
        allCharacters = [...allCharacters, ...response.data.results];
        nextPage = response.data.info.next;
      }
      return allCharacters;
    },
  });

  const handleFilterChange = (filter: string) => {
    setCurrentFilter(filter);
    setCurrentPage(1);
    if (filter === 'all') {
      setFilteredCharacters(characters || []);
    } else if (filter === 'favorites') {
      const favoritedChars = (characters || []).filter(char => 
        favorites.some(fav => fav.characterId === char.id)
      );
      setFilteredCharacters(favoritedChars);
    } else {
      const filtered = (characters || []).filter(char =>
        char.status.toLowerCase() === filter.toLowerCase()
      );
      setFilteredCharacters(filtered);
    }
  };

  if (charactersLoading || favoritesLoading) {
    return <div className="loading-container">Loading...</div>;
  }

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredCharacters.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <Header
        onFilterChange={handleFilterChange}
        currentFilter={currentFilter}
      />
      <CardList
        characters={currentItems}
        onFavoriteToggle={toggleFavorite}
        favorites={favorites}
      />
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {Math.ceil(filteredCharacters.length / ITEMS_PER_PAGE)}
        </span>
        <button
          className="pagination-button"
          onClick={() => setCurrentPage(prev => 
            Math.min(prev + 1, Math.ceil(filteredCharacters.length / ITEMS_PER_PAGE))
          )}
          disabled={currentPage === Math.ceil(filteredCharacters.length / ITEMS_PER_PAGE)}
        >
          Next
        </button>
      </div>
    </div>
  );
}