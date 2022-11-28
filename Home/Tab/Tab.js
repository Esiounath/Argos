import React,{useState,useEffect} from 'react'
import { Pressable,Image,View,StyleSheet,Text} from 'react-native';
import * as SMS from 'expo-sms';
import { useSelector } from 'react-redux';
import * as Location from 'expo-location';

export default function Tab(){
  const userData = useSelector((state) => state.auth)
  const [location,setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null);
  const [message,setMessage] = useState(null)
  const date = new Date();
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }else{
        setLocation(await Location.getCurrentPositionAsync({}));      }
    })();
  }, [location,message]);
  async function sendSMS(){
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable && location) {
      setMessage(`Argos Network - SOS call from ${userData.username} ${date.toLocaleString().toString()} https://www.google.com/maps/search/?api=1&query=${JSON.stringify(location?.coords.latitude)},${JSON.stringify(location?.coords.longitude)}`)
      await SMS.sendSMSAsync(`${userData.alertNumber}`,message).then((reponse)=>{
      console.log("Envoi effectué")
      }).catch((error)=>{
        console.log("Erreur",error)
      });
    } else{
      console.log("No location sercvies or SMS Sending is offline !")
    }
    return ;
  }
return(
    <View style={styles.tab}>
    <Pressable>
      <Image style={styles.alerts} source={require('../../Picture/AlertsReports.png')}/>
    </Pressable>
    <Text style={styles.text}>Alerts</Text>
    <Pressable onPress={sendSMS}>
      <Image style={styles.sos} 
         source={require('../../Picture/sos-btn.png')}/>
    </Pressable>
    <Text style={styles.text}>Map</Text>
    <Pressable>
      <Image style={styles.map} source={require('../../Picture/Map.png')}/>
    </Pressable>
  </View>
);
}
const styles = StyleSheet.create({
    text:{
        color:'#ffffff',
        fontSize:30,
        marginVertical:10,
        alignItems:'center',
        justifyContent:'center',
        textAlignVertical:'center',
        textAlign:'center',
    },
    sos:{
        height:70,
        width:70,
        marginHorizontal:60,
      },
      alerts:{
        height:50,
        width:50,
        marginHorizontal:60,
      },
      map:{
        height:50,
        width:50,
        marginHorizontal:60,
      },
      tab:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
      },
});