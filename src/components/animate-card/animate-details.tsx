import React from 'react';
import { ScrollView } from 'react-native';
import { ContainerWrapper } from '../../components/wrapper';
import { useTailwind } from 'tailwind-rn';
import { ResponsiveUi } from '../../components';
import { COLORS } from '../../constants/colors';
import FastImage from 'react-native-fast-image';
import { Anime } from '../../typings/Anime';
import { getStatusColor } from '../../helper/status';


interface AnimeCardProps {
    animeDetails: Anime;
}

const AnimeCardDetailsComponent: React.FC<AnimeCardProps> = React.memo(({ animeDetails }) => {

    const tailwind = useTailwind();

    const statusColors = getStatusColor(animeDetails?.status);

    return (
        <ScrollView
            contentContainerStyle={[
                tailwind('mt-5'),
                { width: '100%', height: '100%' },
            ]}
            showsVerticalScrollIndicator={false}>

            <FastImage
                style={{
                    width: '90%',
                    height: '50%',
                    borderRadius: 5,
                    alignSelf: 'center',
                }}
                source={{
                    uri: animeDetails?.image_url,
                    priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.stretch}
                onError={() => console.log('FastImage Error')}
            />

            <ContainerWrapper style={[tailwind('mt-5')]}>
                <ContainerWrapper style={[tailwind('flex-row ml-2')]}>
                    <ResponsiveUi.Text h6 color={COLORS.BLACK} tailwind="font-regular">
                        Anime Id:
                    </ResponsiveUi.Text>
                    <ResponsiveUi.Text h6 color={COLORS.BLACK} tailwind="font-bold">
                        {animeDetails?.mal_id}
                    </ResponsiveUi.Text>
                </ContainerWrapper>

                <ContainerWrapper style={[tailwind('flex-row ml-2')]}>
                    <ResponsiveUi.Text h6 color={'#666'} tailwind="font-regular">
                        Year:
                    </ResponsiveUi.Text>
                    <ResponsiveUi.Text h6 color={'#666'} tailwind="font-bold">
                        {animeDetails?.year === null ? 'No year' : animeDetails?.year}
                    </ResponsiveUi.Text>
                </ContainerWrapper>
                <ContainerWrapper style={[tailwind('flex-row ml-2')]}>
                    <ResponsiveUi.Text h6 color={'#0066cc'} tailwind="font-regular">
                        Score:
                    </ResponsiveUi.Text>
                    <ResponsiveUi.Text h6 color={'#0066cc'} tailwind="font-bold">
                        {animeDetails?.score === null ? '0/10' : animeDetails?.score}
                    </ResponsiveUi.Text>
                </ContainerWrapper>
                <ContainerWrapper style={[tailwind('flex-row ml-2')]}>
                    <ResponsiveUi.Text h6 color={COLORS.BLACK} tailwind="font-regular">
                        Status:
                    </ResponsiveUi.Text>
                    <ResponsiveUi.Text
                        h6
                        color={COLORS.BLACK}
                        tailwind="font-bold"
                        style={{
                            backgroundColor: statusColors.backgroundColor,
                            borderRadius: 5,
                            color: statusColors.textColor,
                            fontWeight: 'bold',
                            paddingHorizontal: 10,
                            paddingVertical: 3,
                        }}>
                        {animeDetails?.status || 'N/A'}
                    </ResponsiveUi.Text>
                </ContainerWrapper>
                <ContainerWrapper style={[tailwind('flex-row ml-2')]}>
                    <ResponsiveUi.Text h6 color={COLORS.BLACK} tailwind="font-regular">
                        Rating:
                    </ResponsiveUi.Text>
                    <ResponsiveUi.Text h6 color={COLORS.BLACK} tailwind="font-bold">
                        {animeDetails?.rating || 'N/A'}
                    </ResponsiveUi.Text>
                </ContainerWrapper>

                <ContainerWrapper style={[tailwind('flex-row ml-2')]}>
                    <ResponsiveUi.Text h6 color={'#1a1a1a'} tailwind="font-regular">
                        Title:
                    </ResponsiveUi.Text>
                    <ResponsiveUi.Text h6 color={'#1a1a1a'} tailwind="font-bold">
                        {animeDetails?.title || 'N/A'}
                    </ResponsiveUi.Text>
                </ContainerWrapper>

                <ContainerWrapper style={[tailwind('flex-row ml-2')]}>
                    <ResponsiveUi.Text h6 color={COLORS.PRIMARY} tailwind="font-regular">
                        Genre:
                    </ResponsiveUi.Text>
                    <ResponsiveUi.Text h6 color={COLORS.PRIMARY} tailwind="font-bold">
                        {animeDetails?.genres.map((genre: { name: any; }) => genre.name).join(', ') || 'Unknown'}
                    </ResponsiveUi.Text>
                </ContainerWrapper>
            </ContainerWrapper>
        </ScrollView>
    );
},
);

export default AnimeCardDetailsComponent;