import React, {useRef,useEffect, useState} from "react";
import {Image,SafeAreaView,Text, StyleSheet, Pressable,View} from "react-native";
import Svg, {Path} from 'react-native-svg';
import {useSelector} from 'react-redux';
import * as Location from 'expo-location';
import * as SMS from 'expo-sms';
import axios from '../../API/Argos_GET_USERS'
import * as Application from 'expo-application';


export default function Body({navigation}){
  const userData = useSelector((state) => state.auth)
  const [errorMsg, setErrorMsg] = useState(null);
  const [message,setMessage] = useState(null)
  const date = new Date()
  let size = 0 ;
  const [status,setStatus] = useState({
    yellow:{

    },
    red:{

    },
  })
  const [location,setLocation] = useState(null)
  const AlertState = useRef(null)
  //const [ErrMsg,setErrMsg] = useState(false)
  const [Data,setData] = useState({})
  const RedAlert = useRef(null)
  const YellowAlert = useRef(null)
  async function sendSMS(){
    try{
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable && location) {
        setMessage(`Argos Network - SOS call from ${userData.username} ${date.toLocaleString().toString()} https://www.google.com/maps/search/?api=1&query=${JSON.stringify(location?.coords.latitude)},${JSON.stringify(location?.coords.longitude)}`)
        await SMS.sendSMSAsync(`${userData.alertNumber}`,message).then((reponse)=>{
        }).catch((error)=>{
          console.log("Erreur",error)
        });
      } else{
        console.log("No location sercvies or SMS Sending is offline !")
      }
      return ;
    }catch(error){
      console.log(error)
    }
  }
  async function SendAlert(){
    try{
      if(location){   
/*        Object.keys(userData.GlobalDataUser.data).forEach(x => size = Object.keys(x).length)
        for(let i = 0 ; i < size ; i++){
        Object.entries(userData.GlobalDataUser.data).forEach((x) => x.forEach((d) => Object.entries(d[i]).filter((l)=>l.includes('event_type_id')).forEach(t => {return Object.assign(status,{event_type_id:t[1]})})));
        Object.entries(userData.GlobalDataUser.data).forEach((x) => x.forEach((d) => Object.entries(d[i]).filter((l)=>l.includes('event_type')).forEach(t => t.forEach((b) => Object.entries(Object.entries(b).filter(([key])=>key.includes('id')).map((p) => {return Object.assign(status,{id:p[1]})}))))));
        }*/
        const triggered_at = `${date.getFullYear().toString()}-${date.getMonth() + 1}-${date.getDate().toString()} ${date.getHours().toString()}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;//"2022-04-25 11:33:27"
        const event_type_id = status.event_type_id;
        const latitude = JSON.stringify(location?.coords.latitude)
        const longitude = JSON.stringify(location?.coords.longitude)
        const IMEI = Application.androidId ;
        const user_id = status.id ;
        const accuracy = JSON.stringify(location?.coords.accuracy) ;
        await axios('/event',{
          method:'post',
          timeout:500,
          withCredentials: false,
          data:{
            triggered_at,
            event_type_id,
            user_id,
            IMEI,
            latitude,
            longitude,
            accuracy,
          }
        }).then((reponse)=>{
          console.log("Reponse envoyée")
          console.log(reponse)
        }).catch((err)=>{
          console.log(err)
    
        });
      }else{
        console.log("No location")
      }
    }catch(error){
      console.log(error)
    }
  }
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
    try{
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable && location) {
        setMessage(`Argos Network - SOS call from ${userData.username} ${date.toLocaleString().toString()} https://www.google.com/maps/search/?api=1&query=${JSON.stringify(location?.coords.latitude)},${JSON.stringify(location?.coords.longitude)}`)
        await SMS.sendSMSAsync(`${userData.alertNumber}`,message).then((reponse)=>{
        }).catch((error)=>{
          console.log("Erreur",error)
        });
      } else{
        console.log("No location sercvies or SMS Sending is offline !")
      }
      return ;
    }catch(error){
      console.log(error)
    }
  }
  function SendRedAlert(){
    try{
      RedAlert.current.focus();
      if(RedAlert){
        SendAlert(value,id)
      }

    }catch(error){
      console.log(error)
    }
  }
  function SendYellowAlert(){
    try{
      YellowAlert.current.focus();
      if(YellowAlert){
        SendAlert()
      }

    }catch(error){
      console.log(error)
    }
  }
  function HomeAlert(){
    try{
      Object.keys(userData.GlobalDataUser.data).forEach(x => size = Object.keys(x).length)
      for(let i = 0 ; i < size ; i++){
        Object.entries(userData.GlobalDataUser.data).forEach((x) => x.forEach((d) => Object.entries(d[i]).filter((l)=>l.includes('event_type')).forEach(t => t.forEach(b => Object.entries(b).filter(u =>  u.includes("menace / insulte / intimidation")).forEach((t) => {return Object.assign(status.yellow,{menace:t[1],id:154})})))))//u.includes("menace / insulte / intimidation") "agression physique / vandalisme"
        Object.entries(userData.GlobalDataUser.data).forEach((x) => x.forEach((d) => Object.entries(d[i]).filter((l)=>l.includes('event_type')).forEach(t => t.forEach(b => Object.entries(b).filter(u =>  u.includes("https://secure.argos-network.com/uploads/event_type_img/3/0-action3.png")).forEach((t) => {return Object.assign(status.yellow,{url:t[1]})})))))
        Object.entries(userData.GlobalDataUser.data).forEach((x) => x.forEach((d) => Object.entries(d[i]).filter((l)=>l.includes('event_type')).forEach(t => t.forEach(b => Object.entries(b).filter(u =>  u.includes("agression physique / vandalisme")).forEach((t) => {return Object.assign(status.red,{agression:t[1],id:155})})))))//u.includes("menace / insulte / intimidation") "agression physique / vandalisme"
        Object.entries(userData.GlobalDataUser.data).forEach((x) => x.forEach((d) => Object.entries(d[i]).filter((l)=>l.includes('event_type')).forEach(t => t.forEach(b => Object.entries(b).filter(u =>  u.includes("https://secure.argos-network.com/uploads/event_type_img/3/0-action5.png")).forEach((t) => {return Object.assign(status.red,{url:t[1]})})))))
        Object.entries(userData.GlobalDataUser.data).forEach((x) => x.forEach((d) => Object.entries(d[i]).filter((l)=>l.includes('event_type_id')).forEach(t => {return Object.assign(status,{event_type_id:t[1]})})));
        Object.entries(userData.GlobalDataUser.data).forEach((x) => x.forEach((d) => Object.entries(d[i]).filter((l)=>l.includes('event_type')).forEach(t => t.forEach((b) => Object.entries(Object.entries(b).filter(([key])=>key.includes('id')).map((p) => {return Object.assign(status,{id:p[1]})}))))));
  }
      if(userData.GlobalDataUser.data !== null || userData.GlobalDataUser.data !== undefined){
        console.log(status)
        if(Object.keys(status.red).length === 3 && Object.keys(status.yellow).length === 3){//j.includes("agression physique / vandalisme")
          return (
          <View style={styles.homeAlert}>
            <Pressable ref={YellowAlert} style={{flexDirection:'row',textAlign:'center',alignItems:'center',}} onPress={()=>{SendYellowAlert()}}>
                 <Image  style={styles.AlertPicture} source={{
                   uri:status.yellow.url
                 }}/>
                 <Text style={styles.homeText}>
                   {status.yellow.menace}
                 </Text>
                 </Pressable>
                 <Pressable>
                 <Svg x="0px" y="0px"
width="40" height="40"
viewBox="0 0 50 50">
                    <Path d="M38.65 15.3V11h-4.3V8h4.3V3.65h3V8H46v3h-4.35v4.3ZM4.7 44q-1.2 0-2.1-.9-.9-.9-.9-2.1V15.35q0-1.15.9-2.075.9-.925 2.1-.925h7.35L15.7 8h14v3H17.1l-3.65 4.35H4.7V41h34V20h3v21q0 1.2-.925 2.1-.925.9-2.075.9Zm17-7.3q3.6 0 6.05-2.45 2.45-2.45 2.45-6.1 0-3.6-2.45-6.025Q25.3 19.7 21.7 19.7q-3.65 0-6.075 2.425Q13.2 24.55 13.2 28.15q0 3.65 2.425 6.1Q18.05 36.7 21.7 36.7Zm0-3q-2.4 0-3.95-1.575-1.55-1.575-1.55-3.975 0-2.35 1.55-3.9 1.55-1.55 3.95-1.55 2.35 0 3.925 1.55 1.575 1.55 1.575 3.9 0 2.4-1.575 3.975Q24.05 33.7 21.7 33.7Zm0-5.5Z" stroke="#f1f1f1" strokeWidth="0.5" width="30" height="30" fill="#f1f1f1" />
                   </Svg>
                 </Pressable>


                 <View style={styles.homeAlert}>
                 <Pressable ref={RedAlert} style={{flexDirection:'row',textAlign:'center',alignItems:'center',}} onPress={()=>{SendRedAlert()}}>
                 <Image  style={styles.AlertPicture} source={{
                   uri:status.red.url,
                 }}/>
                 <Text style={styles.homeText}>
                   {status.red.agression}
                 </Text>
                 </Pressable>
                 <Pressable>
                 <Svg x="0px" y="0px"
width="40" height="40"
viewBox="0 0 50 50">
                    <Path d="M38.65 15.3V11h-4.3V8h4.3V3.65h3V8H46v3h-4.35v4.3ZM4.7 44q-1.2 0-2.1-.9-.9-.9-.9-2.1V15.35q0-1.15.9-2.075.9-.925 2.1-.925h7.35L15.7 8h14v3H17.1l-3.65 4.35H4.7V41h34V20h3v21q0 1.2-.925 2.1-.925.9-2.075.9Zm17-7.3q3.6 0 6.05-2.45 2.45-2.45 2.45-6.1 0-3.6-2.45-6.025Q25.3 19.7 21.7 19.7q-3.65 0-6.075 2.425Q13.2 24.55 13.2 28.15q0 3.65 2.425 6.1Q18.05 36.7 21.7 36.7Zm0-3q-2.4 0-3.95-1.575-1.55-1.575-1.55-3.975 0-2.35 1.55-3.9 1.55-1.55 3.95-1.55 2.35 0 3.925 1.55 1.575 1.55 1.575 3.9 0 2.4-1.575 3.975Q24.05 33.7 21.7 33.7Zm0-5.5Z" stroke="#f1f1f1" strokeWidth="0.5" width="30" height="30" fill="#f1f1f1" />
                   </Svg>
                 </Pressable>
                 </View>
               </View>
               );
        }else if(Object.keys(status.yellow).length === 3){
          return(        
            <View style={styles.homeAlert}>
              <Pressable ref={YellowAlert} style={{flexDirection:'row',textAlign:'center',alignItems:'center',justifyContent:'space-between'}} onPress={()=>{SendYellowAlert()}}>
                   <Image  style={styles.AlertPicture} source={{
                     uri:status.yellow.url,
                   }}/>
                   <Text style={styles.homeText}>
                     {status.yellow.menace}
                   </Text>
                   </Pressable>
                   <Pressable>
                   <Svg x="0px" y="0px"
  width="40" height="40"
  viewBox="0 0 50 50">
                      <Path d="M38.65 15.3V11h-4.3V8h4.3V3.65h3V8H46v3h-4.35v4.3ZM4.7 44q-1.2 0-2.1-.9-.9-.9-.9-2.1V15.35q0-1.15.9-2.075.9-.925 2.1-.925h7.35L15.7 8h14v3H17.1l-3.65 4.35H4.7V41h34V20h3v21q0 1.2-.925 2.1-.925.9-2.075.9Zm17-7.3q3.6 0 6.05-2.45 2.45-2.45 2.45-6.1 0-3.6-2.45-6.025Q25.3 19.7 21.7 19.7q-3.65 0-6.075 2.425Q13.2 24.55 13.2 28.15q0 3.65 2.425 6.1Q18.05 36.7 21.7 36.7Zm0-3q-2.4 0-3.95-1.575-1.55-1.575-1.55-3.975 0-2.35 1.55-3.9 1.55-1.55 3.95-1.55 2.35 0 3.925 1.55 1.575 1.55 1.575 3.9 0 2.4-1.575 3.975Q24.05 33.7 21.7 33.7Zm0-5.5Z" stroke="#f1f1f1" strokeWidth="0.5" width="30" height="30" fill="#f1f1f1" />
                     </Svg>
                   </Pressable>
                   </View>
                   );
        }else if(Object.keys(status.red).length === 3){
          console.log("Red")
          return(
            <View style={styles.homeAlert}>
            <Pressable ref={RedAlert} style={{flexDirection:'row',textAlign:'center',alignItems:'center'}} onPress={()=>{SendRedAlert()}}>
            <Image  style={styles.AlertPicture} source={{
              uri:status.red.url,
            }}/>
            <Text style={styles.homeText}>
               {status.red.agression}
            </Text>
            </Pressable>
            <Pressable>
            <Svg x="0px" y="0px"
width="40" height="40"
viewBox="0 0 50 50">
               <Path d="M38.65 15.3V11h-4.3V8h4.3V3.65h3V8H46v3h-4.35v4.3ZM4.7 44q-1.2 0-2.1-.9-.9-.9-.9-2.1V15.35q0-1.15.9-2.075.9-.925 2.1-.925h7.35L15.7 8h14v3H17.1l-3.65 4.35H4.7V41h34V20h3v21q0 1.2-.925 2.1-.925.9-2.075.9Zm17-7.3q3.6 0 6.05-2.45 2.45-2.45 2.45-6.1 0-3.6-2.45-6.025Q25.3 19.7 21.7 19.7q-3.65 0-6.075 2.425Q13.2 24.55 13.2 28.15q0 3.65 2.425 6.1Q18.05 36.7 21.7 36.7Zm0-3q-2.4 0-3.95-1.575-1.55-1.575-1.55-3.975 0-2.35 1.55-3.9 1.55-1.55 3.95-1.55 2.35 0 3.925 1.55 1.575 1.55 1.575 3.9 0 2.4-1.575 3.975Q24.05 33.7 21.7 33.7Zm0-5.5Z" stroke="#f1f1f1" strokeWidth="0.5" width="30" height="30" fill="#f1f1f1" />
              </Svg>
            </Pressable>
            </View>
          );
        }else{
          console.log("Nope")
        }
    }else{
      console.log("No Data")
    }
    }catch(error){
      console.log(error)
    }
  }
  return (
      <SafeAreaView style={styles.header}>
            <View style={styles.home}>
    {Data !== undefined ? HomeAlert() : null}
    </View>
    <View style={styles.tab}>
    <Pressable onPress={()=>{navigation.navigate('Event')}} ref={AlertState} style={{flexDirection:'row'}}>
      <Image style={styles.alerts} source={require('../../Picture/AlertsReports.png')}/>
    <Text style={styles.text}>Alerts</Text>
    </Pressable>
    <Pressable onPress={sendSMS}>
      <Image style={styles.sos} 
         source={require('../../Picture/sos-btn.png')}/>
    </Pressable>
    <Pressable onPress={()=>{navigation.navigate('Map')}} style={{flexDirection:'row'}}>
    <Text style={styles.text}>Map</Text>
      <Image style={styles.map} source={require('../../Picture/Map.png')}/>
    </Pressable>
  </View>
      </SafeAreaView>
  );

};

const styles = StyleSheet.create({
  header:{ 
    alignItems: "center",
    flex:4,
    alignItems:'flex-start',
    justifyContent:'flex-start',
    backgroundColor:'transparent',
  },
  tab:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    alignSelf:'stretch',
    alignContent:'space-around',
  },
  sos:{
    height:70,
    width:70,
  },
  alerts:{
    height:50,
    width:50,
  },
  map:{
    height:50,
    width:50,
  },
  text:{
    color:'#ffffff',
    fontSize:30,
    marginVertical:10,
    alignItems:'center',
    justifyContent:'center',
    textAlignVertical:'center',
    textAlign:'center',
},
  home:{
    flexDirection:"column", 
    justifyContent:'flex-start',
    flex:1,
  },
  AlertPicture:{
    height:70,
    width:70
  },
  homeAlert:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    textAlign:'flex-start',
    width:'100%',
  },
  homeText:{
    fontSize:18,
    fontWeight:'700',
    color:"#f1f1f1"
  },
  textAlert:{
    color:'black',
    fontSize:18,
    fontStyle:'italic',
    fontWeight:'700',
    textTransform:'capitalize',
    textAlign:'center',
    margin:10,
  },
  logout:{
    color:'#000',
    fontSize:22,
    fontStyle:'italic',
    fontWeight:'700',
    textTransform:'capitalize',
    textAlign:'center',
  },
  event:{
    flex:0,
    flexDirection:'row',
    textAlign:'center',
    alignItems:'center',
    justifyContent:'flex-start',
    alignSelf:'center',
    marginBottom:5,
  },
  title:{
    marginVertical:10,
    fontSize:22,
    fontWeight:'700',
    color: 'white',
    textTransform:'capitalize',
  },
  menu:{
    marginVertical:10,
    marginHorizontal:10,
  },
  picture:{
    height:45,
    width:45,
    marginTop:5,
    alignItems: "center",
    justifyContent: "flex-start",
    alignItems:'flex-start',
  },
});