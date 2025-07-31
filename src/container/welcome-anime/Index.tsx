import {View, Text, TouchableOpacity} from 'react-native';
import {RootStackScreenProps} from '../../typings/Navigation';
import {SCREENS} from '../../constants/screens';
import FastImage from 'react-native-fast-image';
import {useTailwind} from 'tailwind-rn';
import {AnimePhoto} from '../../assets';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../constants/colors';
import { BUTTON_LABELS } from '../../enums/labels';
import { MetricsSizes } from '../../helper/variables';

const IndexWelcomeAnimeContainer = ({ navigation }: RootStackScreenProps<SCREENS.WELCOME>) => {
  const tailwind = useTailwind();

  const handleNextScreen = () => {
    console.log('click');
    navigation.navigate(SCREENS.DRAWER_NAVIGATOR);
  };
  return (
    <View style={[tailwind('justify-center items-center flex-1'), {}]}>
      <FastImage
        style={[tailwind('flex-1'),{width: '100%'}]}
        source={AnimePhoto}
        resizeMode={FastImage.resizeMode.cover}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          backgroundColor: 'lightblue',
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 25,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 6,
          shadowColor: COLORS.BLACK,
        }}
        activeOpacity={0.7}
        onPress={() => {
          handleNextScreen();
        }}>
        <Text style={{color: 'black', fontSize: MetricsSizes.regular}}>{BUTTON_LABELS.OPEN_APP}</Text>
        <MaterialIcons
          size={14}
          color={COLORS.BLACK}
          name={'arrow-forward-ios'}
          style={[tailwind('ml-2')]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default IndexWelcomeAnimeContainer;
