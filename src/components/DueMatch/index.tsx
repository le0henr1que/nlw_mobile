import React, { useState } from 'react';
import { View, Modal, ModalProps, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import { Text } from 'react-native';
import { MaterialIcons} from '@expo/vector-icons'
import { Activity, CheckCircle} from 'phosphor-react-native'
import * as Clipboard from 'expo-clipboard'
import { styles } from './styles';
import { THEME } from '../../theme';
import { Heading } from '../Heading';

interface Props extends ModalProps{
    discord:string;
    onClose:() => void;
}

export function DueMatch({discord, onClose, ...rest}:Props) {
    const [isCopping, setIsCopping] = useState(false);

  async function handleCopyDiscordToClipboard(){
    setIsCopping(true)
    await Clipboard.setStringAsync(discord)

    Alert.alert('Discrd Copiado!', 'Usuário copiado para você copiar no Discord e encontrar o jogador')
    setIsCopping(false)
  }
  
  return (
    <Modal {...rest} transparent statusBarTranslucent animationType='fade'>

        <View style={styles.container}>
          <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
          <MaterialIcons name="close" size={20} color={THEME.COLORS.CAPTION_500}/>
          </TouchableOpacity>

          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold"/>
          <Heading title="Let's play!" subtitle='Agora é só começar a jogar!' style={{alignItems:'center', marginTop:24}}/>
          <Text style={styles.label}>Adicione o seu Discord!</Text>
            <TouchableOpacity style={styles.discordButton} onPress={handleCopyDiscordToClipboard} disabled={isCopping}>
              <Text style={styles.discord}>
                {isCopping ? <ActivityIndicator /> : discord}
              </Text>
            </TouchableOpacity>
          </View>

        </View>
    </Modal>
  );
}