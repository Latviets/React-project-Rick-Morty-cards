
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export interface Favorite {
    id: number;
}
export type Favorites = Favorite[];


export function useFavorites() {
    const queryClient = useQueryClient();


    const { data: favorites, isLoading, error } = useQuery({
        queryKey: ['favorites'],
        queryFn: async () => {
            try {
                const response = await axios.get<Favorites>('http://localhost:3000/favorites');
                return response.data || [];
            } catch (error) {
                console.error("error", error);
                return [];
            }
        },
        staleTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: true
    });


    const toggleFavorite = async (id: number) => {
        try {

            if (favorites && favorites.some(favorite => favorite.id === id)) {
                return;
            }

            await axios.post('http://localhost:3000/favorites', {
                id,
            });

            queryClient.invalidateQueries({ queryKey: ['favorites'] });
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    return {
        favorites,
        toggleFavorite,
        isLoading,
        error
    };
} 