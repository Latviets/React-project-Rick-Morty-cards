import Button from '../../Buttons'
import './Header.css'

type Props = {
    onFilterChange: (filter: string) => void
    currentFilter: string
}

const Header = ({ onFilterChange, currentFilter }: Props) => {
    return (
        <div className="header">
            <div className="top-right-text">Created by Edvīns Vecvērdiņš-Ūdris</div>
            <h1>Rick & Morty Characters</h1>
            <div className="filter-container">
                <Button
                    onClick={() => onFilterChange('all')}
                    variant={currentFilter === 'all' ? 'primary' : 'secondary'}
                >
                    All
                </Button>
                <Button
                    onClick={() => onFilterChange('alive')}
                    variant={currentFilter === 'alive' ? 'primary' : 'secondary'}
                >
                    Alive
                </Button>
                <Button
                    onClick={() => onFilterChange('dead')}
                    variant={currentFilter === 'dead' ? 'primary' : 'secondary'}
                >
                    Dead
                </Button>
                <Button
                    onClick={() => onFilterChange('unknown')}
                    variant={currentFilter === 'unknown' ? 'primary' : 'secondary'}
                >
                    Unknown
                </Button>
                <Button
                    onClick={() => onFilterChange('favorites')}
                    className={currentFilter === 'favorites' ? 'active' : ''}
                >
                    Favorites
                </Button>
            </div>
        </div>
    )
}

export default Header