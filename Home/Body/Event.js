import React,{useEffect} from 'react'
import { Pressable, SafeAreaView, StyleSheet,View,ScrollView,Text} from 'react-native'
import { useSelector } from 'react-redux';
import Svg, {Path} from 'react-native-svg';

 function Event({navigation}) {
    const userData = useSelector((state) => state.auth)
    useEffect(()=>{
        const time = setTimeout(()=>{
          if(userData.password === null && userData.token === null && userData.username === null && userData.alertNumber === null){
            navigation.navigate('Login')
          }
        },200)
        return () => clearTimeout(time)
      },[userData.username,userData.password,userData.token,userData.alertNumber]);
  return (
    <SafeAreaView style={styles.events}>
      <View style={styles.eventlists}>
      </View>
        <View style={styles.Backhome}>
        <Pressable onPress={()=>{navigation.navigate('Body')}}>
                 <Svg x="0px" y="0px"
width="60" height="60"
viewBox="0 0 50 50">
                    <Path d="M11 39h7.5V26.5h11V39H37V19.5L24 9.75 11 19.5Zm-3 3V18L24 6l16 12v24H26.5V29.5h-5V42Zm16-17.65Z" stroke="#f1f1f1" strokeWidth="0.5" width="30" height="30" fill="#f1f1f1" />
                   </Svg>
                 </Pressable>
        </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  eventlists:{
    backgroundColor:'brown',
    flex:1,
    backgroundColor:'transparent',
  },
  text: {
    fontSize: 32,
    color:'white',
  },
  scrollView:{
    marginHorizontal: 15,
  },
  events: {
    alignItems: "center",
    flex:4,
    justifyContent:"center",
    alignSelf:'center',
  },
  Backhome:{
    flex: 0,
    flexDirection: 'row',
    justifyContent:"flex-start",
    alignSelf:'center',
    alignItems: 'center',
    width:'100%',
    height:40
  }
});
export default Event ;
