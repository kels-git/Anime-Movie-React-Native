import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ContainerWrapper } from '../../components/wrapper';
import { useTailwind } from 'tailwind-rn';
import { ResponsiveUi } from '../../components';
import { RootStackScreenProps } from '../../typings/navigation';
import { SCREENS } from '../../constants/screens';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS } from '../../constants/colors';
import { getStatusColor } from '../../helper/status';
import AnimeCardDetailsComponent from '../../components/animate-card/animate-details';


const IndexDetailAnimeContainer = ({ route, navigation }: RootStackScreenProps<SCREENS.DETAILS>) => {

  const { animeDetails }: any = route.params
  const tailwind = useTailwind();

  const statusColors = getStatusColor(animeDetails?.status);

  return (
    <ContainerWrapper style={[tailwind('flex-1 ml-3 mr-3 mt-5'), {}]}>
      <ContainerWrapper style={[tailwind(''), {}]}>
        <ContainerWrapper style={[tailwind('flex-row'), {}]}>
          <TouchableOpacity
            style={[tailwind('flex-row items-center'), { flex: 1 }]}
            onPress={() => navigation.goBack()}>
            <AntDesign
              size={24}
              color={COLORS.BLACK}
              name={'arrowleft'}
              style={[tailwind('')]}
            />
          </TouchableOpacity>

          <ContainerWrapper style={[tailwind('ml-10'), { flex: 3 }]}>
            <ResponsiveUi.Text h4 color={COLORS.BLACK}>
              Details Anime
            </ResponsiveUi.Text>
          </ContainerWrapper>
        </ContainerWrapper>
      </ContainerWrapper>

      <AnimeCardDetailsComponent animeDetails={animeDetails}/>
    </ContainerWrapper>
  );
};

export default IndexDetailAnimeContainer;
