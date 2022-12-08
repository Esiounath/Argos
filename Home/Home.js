import React, {useRef,useEffect, useState} from "react";
import {Image,SafeAreaView, DrawerLayoutAndroid, Text, StyleSheet, Pressable,View} from "react-native";
import Tab from './Tab/Tab'
import Svg, {Path} from 'react-native-svg';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {logOut} from "../Redux/Slice";
import * as Location from 'expo-location';
import axios from '../API/Argos_GET_USERS'
import * as Application from 'expo-application';


export default function Sidebar({navigation}){
  const userData = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const date = new Date()
  let size = 0 ;
  const [status,setStatus] = useState({
    yellow:{

    },
    red:{

    },
  })
  const [location,setLocation] = useState(null)
  const userToken = userData.token ;
  const [ErrMsg,setErrMsg] = useState(false)
  const [Data,setData] = useState({})
  const RedAlert = useRef(null)
  const YellowAlert = useRef(null)
  useEffect(()=>{
  const timeout = setTimeout(()=>{
      async function Events(){
    await axios('/events',{
      method:'GET',
      headers:{
        timeout:500,
        'content-type': 'application/json',
      },
      data:{
        userToken,
      },
    }).then((reponse)=>{
        setData(reponse);
    }).catch((error)=>{
      console.log("Erreur",error)
    });
  }
  Events();
  },300)
  return () => clearTimeout(timeout);
  },[])
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }else{
        setLocation(await Location.getCurrentPositionAsync({}));      }
    })();
  }, [location]);
  async function SendAlert(){
    try{
      console.log(status)
      if(location){   
        Object.keys(Data.data).forEach(x => size = Object.keys(x).length)
        for(let i = 0 ; i < size ; i++){
        Object.entries(Data.data).forEach((x) => x.forEach((d) => Object.entries(d[i]).filter((l)=>l.includes('event_type_id')).forEach(t => {return Object.assign(status,{event_type_id:t[1]})})));
        Object.entries(Data.data).forEach((x) => x.forEach((d) => Object.entries(d[i]).filter((l)=>l.includes('event_type')).forEach(t => t.forEach((b) => Object.entries(Object.entries(b).filter(([key])=>key.includes('id')).map((p) => {return Object.assign(status,{id:p[1]})}))))));
        }
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
      }
    }catch(error){
      console.log(error)
    }
  }
  function SendRedAlert(){
    try{
      RedAlert.current.focus();
      if(RedAlert){
        //SendAlert(value,id)
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
  function NotificationsAlert(value,reference){
    return(
      <View style={styles.Home}>
    <View style={styles.HomeAlert}>
      <Pressable onPress={()=>{reference === YellowAlert ? SendYellowAlert() : SendRedAlert()}} ref={reference} >
           <Image  style={styles.AlertPicture} source={{
             uri:value.picto
           }}/>
           <Text style={styles.HomeText}>
             {value.name}
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
  }
  function HomeAlert(){
    try{
      Object.keys(Data.data).forEach(x => size = Object.keys(x).length)
      for(let i = 0 ; i < size ; i++){
        Object.entries(Data.data).forEach((x) => x.forEach((d) => Object.entries(d[i]).filter((l)=>l.includes('event_type')).forEach(t => t.forEach(b => Object.entries(b).filter(u =>  u.includes("menace / insulte / intimidation")).forEach((t) => {return Object.assign(status.yellow,{menace:t[1],id:154})})))))//u.includes("menace / insulte / intimidation") "agression physique / vandalisme"
        Object.entries(Data.data).forEach((x) => x.forEach((d) => Object.entries(d[i]).filter((l)=>l.includes('event_type')).forEach(t => t.forEach(b => Object.entries(b).filter(u =>  u.includes("https://secure.argos-network.com/uploads/event_type_img/3/0-action3.png")).forEach((t) => {return Object.assign(status.yellow,{url:t[1]})})))))
        Object.entries(Data.data).forEach((x) => x.forEach((d) => Object.entries(d[i]).filter((l)=>l.includes('event_type')).forEach(t => t.forEach(b => Object.entries(b).filter(u =>  u.includes("agression physique / vandalisme")).forEach((t) => {return Object.assign(status.red,{agression:t[1],id:155})})))))//u.includes("menace / insulte / intimidation") "agression physique / vandalisme"
        Object.entries(Data.data).forEach((x) => x.forEach((d) => Object.entries(d[i]).filter((l)=>l.includes('event_type')).forEach(t => t.forEach(b => Object.entries(b).filter(u =>  u.includes("https://secure.argos-network.com/uploads/event_type_img/3/0-action5.png")).forEach((t) => {return Object.assign(status.red,{url:t[1]})})))))
  }
      if(Data !== null || Data !== undefined){
        if(Object.entries(status.red).filter((f)=>f.includes(155)) === true && Object.entries(status.yellow).filter((f)=>f.includes(154)) === true){//j.includes("agression physique / vandalisme")
          return (
            <View style={styles.Home}>
          <View style={styles.HomeAlert}>
            <Pressable ref={YellowAlert} style={{flexDirection:'row',textAlign:'center',alignItems:'center',}} onPress={()=>{SendYellowAlert()}}>
                 <Image  style={styles.AlertPicture} source={{
                   uri:status.yellow.url
                 }}/>
                 <Text style={styles.HomeText}>
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


                 <View style={styles.HomeAlert}>
                 <Pressable ref={RedAlert} style={{flexDirection:'row',textAlign:'center',alignItems:'center',}} onPress={()=>{SendRedAlert()}}>
                 <Image  style={styles.AlertPicture} source={{
                   uri:status.red.url,
                 }}/>
                 <Text style={styles.HomeText}>
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
        }else if(Object.entries(status).filter((f)=>f.includes(154))){
          return(          <View style={styles.Home}>
            <View style={styles.HomeAlert}>
              <Pressable ref={YellowAlert} style={{flexDirection:'row',textAlign:'center',alignItems:'center',}} onPress={()=>{SendYellowAlert()}}>
                   <Image  style={styles.AlertPicture} source={{
                     uri:status.yellow.url,
                   }}/>
                   <Text style={styles.HomeText}>
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
                   </View>
                   );
        }else if(Object.entries(status).filter((f)=>f.includes(155))){
          console.log("Red")
          return(
            <View style={styles.Home}>
            <View style={styles.HomeAlert}>
            <Pressable ref={RedAlert} style={{flexDirection:'row',textAlign:'center',alignItems:'center',}} onPress={()=>{SendRedAlert()}}>
            <Image  style={styles.AlertPicture} source={{
              uri:status.red.url,
            }}/>
            <Text style={styles.HomeText}>
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
  function Onglets(){
    try{    
      if(Data !== null || Data !== undefined){
       const prop = Object.keys(Data.data.events[0].event_type.map).
       filter((key) => key.includes('name')).
       reduce((cur, key) => { return Object.assign(cur, { [key]: Data.data.events[0].event_type.map[key] })}, {});
       for(const size in Object.keys(prop)){
          return( 
            <View style={styles.eventAlert}>
              <Svg x="0px" y="0px"
width="40" height="40"
viewBox="0 0 50 50">
                <Path d="M24 44q-4.15 0-7.8-1.575-3.65-1.575-6.35-4.275-2.7-2.7-4.275-6.35Q4 28.15 4 24t1.575-7.8Q7.15 12.55 9.85 9.85q2.7-2.7 6.35-4.275Q19.85 4 24 4t7.8 1.575q3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24t-1.575 7.8q-1.575 3.65-4.275 6.35-2.7 2.7-6.35 4.275Q28.15 44 24 44Zm-2.15-3.05v-4.1q-1.75 0-2.95-1.3-1.2-1.3-1.2-3.05v-2.2L7.45 20.05q-.25 1-.35 1.975Q7 23 7 24q0 6.5 4.225 11.35t10.625 5.6Zm14.7-5.4q1.1-1.2 1.925-2.55.825-1.35 1.4-2.825t.85-3.025Q41 25.6 41 24q0-5.3-2.9-9.625T30.35 8.05v.9q0 1.75-1.2 3.05-1.2 1.3-2.95 1.3h-4.35v4.35q0 .85-.675 1.4-.675.55-1.525.55H15.5V24h12.9q.85 0 1.4.65.55.65.55 1.5v6.35h2.15q1.45 0 2.55.85 1.1.85 1.5 2.2Z" stroke="#7f8c8d" strokeWidth="1" width="30" height="30" fill="#7f8c8d"/>
              </Svg>
      <Text style={styles.textAlert}>{`${Data !== undefined ? prop.name : null}`}</Text>
      </View>
    );
         }
    }else{
      return ;
    }
  }catch(error){
    console.log(error)
    }
  }
useEffect(()=>{
  const time = setTimeout(()=>{
    if(userData.password === null && userData.token === null && userData.username === null && userData.alertNumber === null){
      navigation.navigate('Login')
    }
  },200)
  return () => clearTimeout(time)
},[userData.username,userData.password,userData.token,userData.alertNumber]);
  const drawer = useRef(null);
const drawerPosition = "left";
  const navigationView = () => (
    <SafeAreaView style={styles.navigationContainer}>
      <View style={styles.container}>
      <Image style={styles.globe} source={
        require('../Picture/Globe.png')
      }/>
      <Text style={styles.text}>{userData.username}</Text>
      </View>
      <View style={styles.event}>
        <Pressable onPress={()=>{dispatch(logOut())}} style={styles.event}>
        <Svg x="0px" y="0px"
width="30" height="30"
viewBox="0 0 50 50">
          <Path  d="M22.5 26.1V5.8h3v20.3Zm1.5 16q-3.7 0-6.975-1.425Q13.75 39.25 11.3 36.8q-2.45-2.45-3.875-5.725Q6 27.8 6 24.1q0-4 1.7-7.475 1.7-3.475 4.8-6.175l2.1 2.1q-2.65 2.15-4.125 5.125T9 24.1q0 6.25 4.375 10.625T24 39.1q6.25 0 10.625-4.375T39 24.1q0-3.45-1.475-6.475Q36.05 14.6 33.5 12.55l2.15-2.1q3 2.55 4.675 6.1Q42 20.1 42 24.1q0 3.7-1.425 6.975-1.425 3.275-3.85 5.725-2.425 2.45-5.7 3.875Q27.75 42.1 24 42.1Z" stroke="#000" strokeWidth="1" width="40" height="40" fill="#000"/>
        </Svg>
        <Text style={styles.logout}>LogOut</Text>
        </Pressable>
      </View>
      {Data !== undefined ? Onglets() : null}
    </SafeAreaView>
  );
  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={drawerPosition}
      renderNavigationView={navigationView}
    >
      <SafeAreaView style={styles.header}>
      <Pressable onPress={() => drawer.current.openDrawer()}>
      <Svg x="0px" y="0px"
width="30" height="30"
viewBox="0 0 30 30" style={styles.menu}>
      <Path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z" stroke="white" strokeWidth="1" width="50" height="50" fill="white" backgroundColor="#000" />
    </Svg>
      </Pressable>
      <Text style={styles.title}>Argos Network</Text>
      </SafeAreaView>
      {Data !== undefined ? HomeAlert() : null}
      <Tab navigation={navigation}/>
    </DrawerLayoutAndroid>
  );

};

const styles = StyleSheet.create({
  Home:{
    flexDirection:"column", 
    justifyContent:'flex-start',
    flex:3,
  },
  AlertPicture:{
    height:70,
    width:70
  },
  HomeAlert:{
    flex:0,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    textAlign:'flex-start',
  },
  HomeText:{
    fontSize:18,
    fontWeight:'700',
    color:"#f1f1f1"
  },
  eventAlert:{
    flex:2,
    flexDirection:'row',
    textAlign:'center',
    alignItems:'flex-start',
    justifyContent:'flex-start',
    alignSelf:'flex-start',
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
  globe:{
    height:50,
    width:50
  },
  sos:{
    height:60,
    width:60,
    marginHorizontal:60,
    marginVertical:10,
  },
  tab:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
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
  navigationContainer: {
    flex:1,
    backgroundColor:'#f1f1f1',
    justifyContent:'space-between',
    alignItems:'flex-start',
    textAlign:'center',
  },
  container: {
    height:100,
    width:'100%',
    backgroundColor:'#1c2833',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
  },
  header:{ 
    alignItems: "center",
    flexDirection:'row',
    flex:0,
    justifyContent:"flex-start",
    alignItems:'flex-start',
    paddingTop: 20,
    marginVertical:10,
    backgroundColor:'#283747',
  },
  picture:{
    height:45,
    width:45,
    marginTop:5,
    alignItems: "center",
    justifyContent: "flex-start",
    alignItems:'flex-start',
  },
  text:{
    color:'#f1f1f1',
    fontSize:22,
    fontStyle:'italic',
    fontWeight:'500',
    textTransform:'capitalize',
    textAlign:'center',
  },
});