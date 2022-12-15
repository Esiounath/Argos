import React,{useEffect} from 'react'
import { Pressable, SafeAreaView, StyleSheet,View,Text,Image} from 'react-native'
import { useSelector } from 'react-redux';
import Svg, {Path} from 'react-native-svg';

 function Carte({navigation}) {
    const userData = useSelector((state) => state.auth)
    const ExitPage = (value) =>{
      navigation.navigate(value);
  }
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.tab}>
    <Pressable onPress={()=>{ExitPage('Body')}} style={{flexDirection:'row'}}>
    <Svg x="0px" y="0px"
width="60" height="60"
viewBox="0 -5 50 50">
                    <Path d="M11 39h7.5V26.5h11V39H37V19.5L24 9.75 11 19.5Zm-3 3V18L24 6l16 12v24H26.5V29.5h-5V42Zm16-17.65Z" stroke="#f1f1f1" strokeWidth="0.5" width="30" height="30" fill="#f1f1f1" />
                   </Svg>
    <Text style={styles.textBottom}>Home</Text>
    </Pressable>
    <Pressable>
      <Image style={styles.sos} 
         source={require('../../Picture/sos-btn.png')}/>
    </Pressable>
    <Pressable onPress={()=>{ExitPage('Event')}} style={{flexDirection:'row'}}>
    <Svg x="0px" y="0px"
width="60" height="60"
viewBox="0 -5 50 50">
                    <Path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h23.1l9.9 9.9V39q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V17.55h-8.55V9H9v30Zm4.95-5.55h20.1v-3h-20.1Zm0-15.9H24v-3H13.95Zm0 7.95h20.1v-3h-20.1ZM9 9v8.55V9v30V9Z" stroke="#f1f1f1" strokeWidth="0.5" width="30" height="30" fill="#f1f1f1" />
                   </Svg>
    <Text style={styles.textBottom}>Events</Text>
    </Pressable>
  </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  tab:{
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf:'stretch',
    alignItems: 'center',
  },
  container:{    
    flex: 4,
    width:'100%',
    height:'100%',
  },
sos:{
    height:70,
    width:70,
  },
  textBottom:{
    color:'#ffffff',
    marginVertical:10,
    fontSize:30,
},
});
export default Carte ;
