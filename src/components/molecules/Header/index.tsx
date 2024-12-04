import Button from "../../Buttons"

type Props = {
    onFilterChange: (filter: string) => void
    currentFilter: string
}

const Header = ({ onFilterChange, currentFilter }: Props) => {
    return (
        <div className="relative h-[400px] w-full text-center text-white bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('/rickmorty.png')] bg-center bg-cover bg-no-repeat flex flex-col justify-center items-center overflow-hidden mb-5">
            <div className="absolute top-5 right-5 text-[#11e551] text-lg [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]">
                Created by Edvīns Vecvērdiņš-Ūdris
            </div>

            <h1 className="text-6xl font-bold text-[#00b300] uppercase tracking-[3px] animate-[glow_1s_ease-in-out_infinite_alternate] [text-shadow:3px_3px_0_#000,_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000]">
                Rick & Morty Characters
            </h1>

            <div className="mt-5 flex justify-center gap-2.5">
                <Button
                    onClick={() => onFilterChange('all')}
                    className={`px-5 py-2.5 text-base border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#1abc9c] rounded transition-all duration-300 ${currentFilter === 'all' ? 'bg-white text-[#1abc9c]' : ''}`}
                >
                    All
                </Button>
                <Button
                    onClick={() => onFilterChange('alive')}
                    className={`px-5 py-2.5 text-base border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#1abc9c] rounded transition-all duration-300 ${currentFilter === 'alive' ? 'bg-white text-[#1abc9c]' : ''}`}
                >
                    Alive
                </Button>
                <Button
                    onClick={() => onFilterChange('dead')}
                    className={`px-5 py-2.5 text-base border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#1abc9c] rounded transition-all duration-300 ${currentFilter === 'dead' ? 'bg-white text-[#1abc9c]' : ''}`}
                >
                    Dead
                </Button>
                <Button
                    onClick={() => onFilterChange('unknown')}
                    className={`px-5 py-2.5 text-base border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#1abc9c] rounded transition-all duration-300 ${currentFilter === 'unknown' ? 'bg-white text-[#1abc9c]' : ''}`}
                >
                    Unknown
                </Button>
                <Button
                    onClick={() => onFilterChange('favorites')}
                    className={`px-5 py-2.5 text-base border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#1abc9c] rounded transition-all duration-300 ${currentFilter === 'favorites' ? 'bg-white text-[#1abc9c]' : ''}`}
                >
                    Favorites
                </Button>
            </div>
        </div>
    )
}

export default Header