import { StatusBar } from 'react-native';
import { Background } from './src/components/Background';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold, 
  Inter_700Bold, 
  Inter_900Black
} from '@expo-google-fonts/inter'
import { Loader } from './src/components/Loader';
import { Home } from './src/screens/Home';

export default function App() {
 const [fontsLoad] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold, 
    Inter_700Bold, 
    Inter_900Black
  })


  return (
    <Background>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent/>
      {fontsLoad ? <Home/> : <Loader/>}
   
    </Background>
  );
}

