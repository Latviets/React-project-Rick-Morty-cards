import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface Favorite {
    id: string;
    characterId: number;
}

export function useFavorites() {
    const queryClient = useQueryClient();

    const { data: favorites = [], isLoading } = useQuery({
        queryKey: ['favorites'],
        queryFn: async () => {
            const response = await axios.get<Favorite[]>('http://localhost:3000/favorites');
            return response.data || [];
        },
    });

    const toggleFavoriteMutation = useMutation({
        mutationFn: async (characterId: number) => {
            const existingFavorite = favorites.find(fav => fav.characterId === characterId);
            if (existingFavorite) {
                await axios.delete(`http://localhost:3000/favorites/${existingFavorite.id}`);
            } else {
                await axios.post('http://localhost:3000/favorites', { characterId });
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
        }
    });

    return {
        favorites,
        toggleFavorite: toggleFavoriteMutation.mutate,
        isLoading
    };
} 