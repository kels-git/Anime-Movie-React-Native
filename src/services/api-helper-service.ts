import { findImageUrl } from '../helper/image';
import { Anime, AnimeListResponse } from '../typings/Anime';
import { ApiGatewayService } from './api-gateway-service';

const ANIME_ENDPOINTS = {
  getAnimeList: { path: '' },
  getAnimeById: { path: (id: number) => `/${id}` },
};

export class APIHelperService {

    static async fetchAnimeList(page: number = 1, perPage: number = 10, genres?: string): Promise<AnimeListResponse> {
        try {
          const response = await ApiGatewayService.get(
            ANIME_ENDPOINTS.getAnimeList,
            {
              queryStringParameters: {
                page,
                limit: perPage,
                order_by: 'popularity',
                genres
              }
            }
          );
    
          const formattedData: Anime[] = response.data.data?.map((anime: any) => ({
            mal_id: anime.mal_id,
            title: anime.title,
            score: anime.score,
            year: anime.year,
            status: anime.status,
            rating: anime.rating,
            image_url: findImageUrl(anime.images),
            genres: anime.genres
          })) || [];
    
          return {
            data: formattedData,
            pagination: response.data.pagination
          };
        } catch (error) {
          console.error('Error fetching anime list:', error);
          // Throw the error so the calling code can handle it
          throw new Error('Failed to fetch anime data');
        }
      }
    
      static async fetchAnimeById(id: number): Promise<any> {
        try {
          const response = await ApiGatewayService.get(
            ANIME_ENDPOINTS.getAnimeById,
            {},
            id
          );
          
          console.log('Anime Detail Data:', response.data);
          return response.data;
        } catch (error) {
          console.error('Error fetching anime details:', error);
          // Throw the error so the calling code can handle it
          throw new Error('Failed to fetch anime details');
        }
      }
    }
