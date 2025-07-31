import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { ContainerWrapper } from '../../components/wrapper';
import { useTailwind } from 'tailwind-rn';
import { AnimeCardComponent, ResponsiveUi } from '../../components';
import { RootStackScreenProps } from '../../typings/navigation';
import { SCREENS } from '../../constants/screens';
import { Anime, AnimeListResponse } from '../../typings/Anime';
import { APIHelperService } from '../../services/api-helper-service';
import GenreFilter from '../../components/filter/genre-filter';
import { COLORS } from '../../constants/colors';
import { MetricsSizes } from '../../helper/variables';

const IndexListingAnimeContainer = ({ navigation }: RootStackScreenProps<SCREENS.ANIME_LISTING>) => {
  const tailwind = useTailwind();
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  const fetchAnime = useCallback(async (page: number, append: boolean = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setError(null);
      }

      const response: AnimeListResponse = await APIHelperService.fetchAnimeList(page, 10, selectedGenre ? selectedGenre.toString() : undefined);

      console.log('Fetched anime data:', response.data);

      if (append) {
        setAnimeList(prev => [...prev, ...response.data]);
      } else {
        setAnimeList(response.data);
      }

      setHasNextPage(response.pagination.has_next_page);
      setCurrentPage(page);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error in fetchAnime:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [selectedGenre]);

  const loadMore = useCallback(() => {
    if (!loadingMore && hasNextPage) {
      console.log('Loading more anime, page:', currentPage + 1);
      fetchAnime(currentPage + 1, true);
    }
  }, [currentPage, hasNextPage, loadingMore, fetchAnime]);

  const refresh = useCallback(() => {
    console.log('Refreshing anime list');
    setCurrentPage(1);
    fetchAnime(1, false);
  }, [fetchAnime]);

  useEffect(() => {
    console.log('Initial anime load');
    fetchAnime(1);
  }, [fetchAnime]);

  const availableGenres = useMemo(() => {
    const allGenres = animeList.flatMap(anime => anime.genres || []);
    return Array.from(new Map(allGenres.map(g => [g.mal_id, g])).values());
  }, [animeList]);

  const renderFooter = () => {
    if (!loadingMore) return null;

    return (
      <ContainerWrapper style={[tailwind('p-4 items-center'), {}]}>
        <ActivityIndicator size="small" color="#0066cc" />
        <ResponsiveUi.Text color={'#586069'} style={[tailwind('mt-3')]}>Loading more...</ResponsiveUi.Text>
      </ContainerWrapper>
    );
  };

  const renderEmpty = () => {
    if (loading) {
      return (
        <ContainerWrapper style={[tailwind('flex-1 justify-center items-center p-3'), {}]}>
          <ActivityIndicator size="large" color="#0066cc" />
          <ResponsiveUi.Text color={'#586069'} style={[tailwind('mt-3')]}>Loading anime...</ResponsiveUi.Text>
        </ContainerWrapper>
      );
    }

    if (error) {
      return (
        <ContainerWrapper style={[tailwind('flex-1 justify-center items-center p-3'), {}]}>
          <ResponsiveUi.Text color={'#d73a49'} style={[tailwind('mb-4 text-center'), {}]}>{error}</ResponsiveUi.Text>
          <TouchableOpacity style={{
            backgroundColor: '#0066cc',
            paddingHorizontal: MetricsSizes.regular + 1,
            paddingVertical: MetricsSizes.small - 2,
            borderRadius: MetricsSizes.tiny - 1,
          }} onPress={refresh}>
            <ResponsiveUi.Text tailwind='font-semibold' color={COLORS.WHITE} style={{}}>Retry</ResponsiveUi.Text>
          </TouchableOpacity>
        </ContainerWrapper>
      );
    }

    return null;
  }

  const handleAnimeClick = (item: Anime) => {
    console.log('Anime clicked:', item);
    navigation.navigate(SCREENS.DETAILS, { animeDetails: item });
  }


  return (
    <ContainerWrapper style={[tailwind('flex-1'), { backgroundColor: COLORS.BACKGROUND }]}>

      <GenreFilter
        selectedGenre={selectedGenre}
        onSelectGenre={setSelectedGenre}
        availableGenres={availableGenres}
      />

      <FlatList
        data={animeList}
        keyExtractor={(item: any) => item?.mal_id.toString()}
        renderItem={({ item }) => (
          <AnimeCardComponent
            item={item}
            handleAnimeClick={handleAnimeClick}
          />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refresh}
            colors={['#0066cc']}
          />
        }
      />
    </ContainerWrapper>
  )
};

export default IndexListingAnimeContainer;


