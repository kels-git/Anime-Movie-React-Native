import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ContainerWrapper } from '../../components/wrapper';
import { useTailwind } from 'tailwind-rn';
import { ResponsiveUi } from '../../components';
import { COLORS } from '../../constants/colors';
import FastImage from 'react-native-fast-image';
import { Anime } from '../../typings/Anime';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getStatusColor } from '../../helper/status';
import { MetricsSizes } from '../../helper/variables';
import { RootState } from '../../../store/rootReducer';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../../store-features/animeFavorite/animeFavoruiteSlice';
import { useDispatch, useSelector } from 'react-redux';

interface AnimeCardProps {
  item: Anime;
  handleAnimeClick?: (item: Anime) => void;
}

const AnimeCardComponent: React.FC<AnimeCardProps> = React.memo(
  ({ item, handleAnimeClick }) => {
    const dispatch = useDispatch();
    const selectedFavorites = useSelector((state: RootState) => state.animeFavoruiteSlice.selectedFavorites);
    const tailwind = useTailwind();
    const { title, rating, score, year, status, image_url, genres } = item;

    const imageUrl = image_url;
    const extractedTitle = Array.isArray(title) ? title[0] : title;
    const statusColors = getStatusColor(status);

    const isFavorite = React.useMemo(() => {
      return selectedFavorites.some(favItem => favItem.title === item.title);
    }, [selectedFavorites, item.title]);

    const handleToggleFavorite = React.useCallback(() => {
      if (isFavorite) {
        dispatch(removeFromFavorites(item));
      } else {
        dispatch(addToFavorites(item));
      }
    }, [isFavorite, item, dispatch]);

    return (
      <ContainerWrapper style={[tailwind('ml-4 mr-4')]}>
        <TouchableOpacity
          onPress={() => handleAnimeClick?.(item)}
          activeOpacity={0.9}>
          <ContainerWrapper
            style={[
              tailwind('mt-3 flex-row mb-1'),
              {
                padding: MetricsSizes.regular - 3,
                borderRadius: MetricsSizes.regular,
                backgroundColor: COLORS.WHITE,
                elevation: MetricsSizes.tiny - 3,
                shadowColor: COLORS.BLACK,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                overflow: 'hidden',
              },
            ]}>
            <FastImage
              style={{
                width: 60,
                height: 85,
                borderRadius: 8,
                backgroundColor: '#f0f0f0',
              }}
              source={{
                uri: imageUrl,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />

            <ContainerWrapper style={{
              flex: 1,
              marginLeft: 12,
              justifyContent: 'space-between',
            }}>
              <View style={{ flex: 1 }}>
                <ResponsiveUi.Text
                  h7
                  style={{
                    fontWeight: 'bold',
                    marginBottom: 4,
                    color: '#1a1a1a',
                  }}
                  numberOfLines={2}>
                  {extractedTitle || 'Unknown Title'}
                </ResponsiveUi.Text>

                <ResponsiveUi.Text
                  h8
                  style={{ color: '#666', marginBottom: 2 }}>
                  Rating: {rating || 'N/A'}
                </ResponsiveUi.Text>

                <ResponsiveUi.Text
                  h8
                  style={{ color: '#0066cc', fontWeight: '600', marginBottom: 2 }}>
                  Score: {score ? `${score}/10` : 'N/A'}
                </ResponsiveUi.Text>

                <ResponsiveUi.Text
                  h8
                  style={{ color: '#666', marginBottom: 8 }}>
                  Year: {year || 'Unknown'}
                </ResponsiveUi.Text>

                <ResponsiveUi.Text
                  h8
                  style={{ color: COLORS.PRIMARY, fontSize: 10 }}>
                  Genre: {genres?.map((genre: { name: any; }) => genre.name).join(', ') || 'Unknown'}
                </ResponsiveUi.Text>
              </View>

              <ContainerWrapper
                style={[
                  tailwind('flex-row items-center justify-between'),
                  { marginTop: 4 }
                ]}>
                <View
                  style={{
                    backgroundColor: statusColors.backgroundColor,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 12,
                    maxWidth: '65%',
                  }}>
                  <ResponsiveUi.Text
                    h8
                    style={{
                      color: statusColors.textColor,
                      fontWeight: '600',
                      fontSize: 11,
                    }}
                    numberOfLines={1}>
                    {status || 'Unknown'}
                  </ResponsiveUi.Text>
                </View>

                <TouchableOpacity
                  onPress={handleToggleFavorite}
                  style={{
                    padding: 4,
                    borderRadius: 20,
                  }}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                  <MaterialIcons
                    size={24}
                    color={COLORS.ERROR}
                    name={isFavorite ? 'favorite' : 'favorite-outline'}
                  />
                </TouchableOpacity>
              </ContainerWrapper>
            </ContainerWrapper>
          </ContainerWrapper>
        </TouchableOpacity>
      </ContainerWrapper>
    );
  },
);

export default AnimeCardComponent;