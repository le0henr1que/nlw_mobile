import { TouchableOpacity, View, Text} from 'react-native';
import { THEME } from '../../theme';
import { DueInfo } from '../DueInfo';
import {GameController} from 'phosphor-react-native'

import { styles } from './styles';

export interface DueCardProps{
    id: string;
    hourEnd: string;
    hourStart: string;
    name: string;
    useVoiceChannel: boolean,
    weekDays: string[];
    yearsPlaying: number,
}

interface Props {
    data: DueCardProps;
    onConnect: () => void;
}

export function DueCarde({data, onConnect}:Props) {
    
  return (
    <View style={styles.container}>
        <DueInfo 
            label="Nome"
            value={data.name}
        />
          <DueInfo 
            label="Tempo de jogo"
            value={`${data.yearsPlaying} anos`}
        />
          <DueInfo 
            label="Disponibilidade"
            value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
        />
          <DueInfo 
            label="Chamada de áudio"
            value={data.useVoiceChannel ? "Sim" : "Não"}
            colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
        />
        <TouchableOpacity style={styles.button} onPress={onConnect}>
            <GameController color={THEME.COLORS.TEXT} size={20}/>
            <Text style={styles.buttonTitle}>Contar</Text>

        </TouchableOpacity>
    </View>
  );
}