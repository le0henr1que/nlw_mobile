import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation, useRoute} from '@react-navigation/native'
import { Background } from '../../components/Background';
import {Entypo} from '@expo/vector-icons'
import logoImg from '../../assets/logo-nlw-esports.png';

import { styles } from './styles';
import { GameParams } from '../../@types/@navigation';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { THEME } from '../../theme';
import { Heading } from '../../components/Heading';
import { DueCarde, DueCardProps } from '../../components/DueCarde';
import { useEffect, useState } from 'react';
import { DueMatch } from '../../components/DueMatch';



export function Game() {

  const [duos, setDuoes] = useState<DueCardProps[]>([])
  const [discordDuoSelected, setDiscordDuoSelected] = useState('')
  const navigation = useNavigation()
  const route = useRoute();
  const game = route.params as GameParams;

  function handleGoBack(){
    navigation.goBack()
  }
  async function getDiscordUser(adsId:String){
    fetch(`http://192.168.15.2:3333/ads/${adsId}/discord`)
    .then(response => response.json())
    .then(data => setDiscordDuoSelected(data.discord))
  }
 
  useEffect(() => {
    fetch(`http://192.168.15.2:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => setDuoes(data))
  }, [])
  return (
    <Background>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleGoBack}>
              <Entypo 
                name="chevron-thin-left"
                color={THEME.COLORS.CAPTION_300}
              />
            </TouchableOpacity>
            <Image
              source={logoImg}
              style={styles.logo}
              resizeMode="cover"
            />
            <View style={styles.right}/>
          </View>

          <Image 
            source={{uri: game.bannerUrl}}
            style={styles.cover}
            
            />


          <Heading
            title={game.title}
            subtitle="Conecte-se e comece a jogar!"
            />

          <FlatList 
          horizontal
          contentContainerStyle={[styles.contentList, duos.length == 0 && {flex:1, alignItems:'center', justifyContent:'center'}]}
          showsHorizontalScrollIndicator={false}
          style={[styles.containerList]}
            data={duos}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <DueCarde data={item} onConnect={() => getDiscordUser(item.id)}/>

            )}
            ListEmptyComponent={() => (
              <Text style={styles.emptyListText}>
                Não há Jogadores Disponiveis ainda.
              </Text>
            )}
          />


          <DueMatch visible={discordDuoSelected.length > 0} discord={discordDuoSelected} onClose={() => setDiscordDuoSelected('')}/>
        </SafeAreaView>
    </Background>
  );
}
