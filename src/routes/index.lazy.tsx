import '../main.css'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
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
  const [searchTerm, setSearchTerm] = useState('');
  const ITEMS_PER_PAGE = 20;

  const { data: characters, isLoading: charactersLoading } = useQuery<Character[]>({
    queryKey: ['characters'],
    queryFn: async () => {
      let allCharacters: Character[] = [];
      let nextPage: string | null = 'https://rickandmortyapi.com/api/character';

      while (nextPage) {
        const response: { data: ApiResponse } = await axios.get(nextPage);
        allCharacters = [...allCharacters, ...response.data.results];
        nextPage = response.data.info.next;
      }
      setFilteredCharacters(allCharacters);
      return allCharacters;
    }
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
    <div className="min-h-screen bg-[#f8f3f3] m-0 p-0">
      <Header
        onFilterChange={handleFilterChange}
        currentFilter={currentFilter}
        onSearch={setSearchTerm}
      />
      <CardList
        characters={currentItems}
        onFavoriteToggle={toggleFavorite}
        favorites={favorites}
        searchTerm={searchTerm}
      />
      <div className="flex justify-center items-center gap-3 p-5">
        <button
          className="px-4 py-2 border-2 border-[#1abc9c] bg-white text-[#1abc9c] cursor-pointer rounded hover:bg-[#1abc9c] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-base text-[#666]">
          Page {currentPage} of {Math.ceil(filteredCharacters.length / ITEMS_PER_PAGE)}
        </span>
        <button
          className="px-4 py-2 border-2 border-[#1abc9c] bg-white text-[#1abc9c] cursor-pointer rounded hover:bg-[#1abc9c] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
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