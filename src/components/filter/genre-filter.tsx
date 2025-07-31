import React, { useMemo } from 'react';
import { TouchableOpacity} from 'react-native';
import { MetricsSizes } from '../../helper/variables';
import { COLORS } from '../../constants/colors';
import { Dropdown } from 'react-native-element-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ContainerWrapper } from '../wrapper';
import { useTailwind } from 'tailwind-rn';

interface GenreDropdownProps {
    selectedGenre: number | null;
    onSelectGenre: (genreId: number | null) => void;
    availableGenres: Array<{mal_id: number, name: string}>;
  }

  const GenreDropdown: React.FC<GenreDropdownProps> = ({  selectedGenre,  onSelectGenre, availableGenres }) => {
    const tailwind = useTailwind();
    const fourteen = MetricsSizes.regular - 1;

    const dropdownData = useMemo(() => [
      { label: 'All Genres', value: null },
      ...availableGenres.map(genre => ({
        label: genre.name,
        value: genre.mal_id
      }))
    ], [availableGenres]);
  
    return (
      < ContainerWrapper style={{ marginHorizontal: MetricsSizes.regular, marginBottom: MetricsSizes.small, marginTop: MetricsSizes.regular }}>
        <Dropdown
          style={{
            height: 42,
            backgroundColor: COLORS.WHITE,
            borderRadius: MetricsSizes.small - 2,
            padding: MetricsSizes.small,
            borderWidth: MetricsSizes.tiny - 4,
            borderColor: COLORS.LIGHT_GREY,
          }}
          placeholderStyle={{
            fontSize: fourteen,
            color: COLORS.GREY,
          }}
          selectedTextStyle={{
            fontSize: fourteen,
            color: COLORS.BLACK,
          }}
          inputSearchStyle={{
            height: MetricsSizes.medium * 2,
            fontSize: fourteen,
          }}
          iconStyle={{
            width: MetricsSizes.medium,
            height: MetricsSizes.medium,
          }}
          data={dropdownData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select genre"
          searchPlaceholder="Search genres..."
          value={selectedGenre}
          onChange={item => onSelectGenre(item.value)}
          renderLeftIcon={() => (
            <MaterialIcons 
              name="filter-alt" 
              size={20} 
              color={COLORS.PRIMARY} 
              style={[tailwind('mr-2'),{ }]}
            />
          )}
          renderRightIcon={() => selectedGenre ? (
            <TouchableOpacity onPress={() => onSelectGenre(null)}>
              <MaterialIcons 
                name="close" 
                size={20} 
                color={COLORS.GREY} 
                style={[tailwind('rounded-lg'),]}
              />
            </TouchableOpacity>
          ) : null}
          itemTextStyle={{ color: COLORS.BLACK }}
          activeColor={COLORS.PRIMARY}
          containerStyle={[tailwind('rounded-lg')]}
          showsVerticalScrollIndicator={false}
        />
      </ContainerWrapper>
    );
  };
  
  export default GenreDropdown;