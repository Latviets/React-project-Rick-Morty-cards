import { ChangeEvent } from 'react'

type Props = {
    onSearch: (searchTerm: string) => void
}

const SearchBar = ({ onSearch }: Props) => {
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value)
    }

    return (
        <div className="w-full max-w-xl mx-auto mb-8 px-4">
            <input
                type="text"
                placeholder="Search characters..."
                onChange={handleSearch}
                className="w-full px-4 py-2 border-2 border-[#1abc9c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1abc9c] focus:border-transparent transition-all duration-300"
            />
        </div>
    )
}

export default SearchBar 