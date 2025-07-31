import { FlatList, SafeAreaView } from 'react-native';
import { RootStackScreenProps } from '../../typings/Navigation';
import { SCREENS } from '../../constants/screens';
import { AnimeCardComponent, ResponsiveUi } from '../../components';
import { useTailwind } from 'tailwind-rn';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { ContainerWrapper } from '../../components/wrapper';
import { Anime } from '../../typings/Anime';

const IndexFavouriteAnimeContainer = ({ navigation }: RootStackScreenProps<SCREENS.FAVOURITE>) => {
  const tailwind = useTailwind();

  const Favourite = useSelector( (state: RootState) => state.animeFavoruiteSlice.selectedFavorites,
  );

  const handleAnimeClick = (item: Anime) => {
    navigation.navigate(SCREENS.DETAILS, { animeDetails: item });
  }

  const renderAnimeItem = ({ item }: { item: Anime }) => (
    <AnimeCardComponent
      item={item}
      handleAnimeClick={handleAnimeClick}
    />
  );

  return (
    <SafeAreaView>
      <ContainerWrapper style={[tailwind('mb-6'), {}]}>
        {Favourite.length === 0 ? (
          <ContainerWrapper
            style={[tailwind('items-center justify-center mt-20')]}>
            <ResponsiveUi.Text>Anime favourite list is Empty</ResponsiveUi.Text>
          </ContainerWrapper>
        ) : (
          <FlatList
            data={Favourite}
            renderItem={renderAnimeItem}
            keyExtractor={(_item, index) => index.toString()}
            contentContainerStyle={[tailwind(''), { paddingHorizontal: 10 }]}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.5}
          />
        )}
      </ContainerWrapper>
    </SafeAreaView>

  );
};

export default IndexFavouriteAnimeContainer;
