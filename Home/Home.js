import React, {useRef,useEffect, useState} from "react";
import {Image,SafeAreaView, DrawerLayoutAndroid, Text, StyleSheet, Pressable,View} from "react-native";
import Tab from './Tab/Tab'
import Svg, {Path} from 'react-native-svg';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {logOut} from "../Redux/Slice";
import axios from '../API/Argos_GET_USERS'


export default function Sidebar({navigation}){
  const userData = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const userToken = userData.token ;
  const [ErrMsg,setErrMsg] = useState(false)
  const [Data,setData] = useState({})
  //console.log(userToken)
  function Test(){
    try{    
      Events()
      console.log(Data)
      if(Data !== null || Data !== undefined){
          return( 
            <View style={{
              flexDirection:'column',
              justifyContent:'center',
              textAlign:'center',
              alignSelf:'center',
              alignItems:'center',
              marginTop:50,
            }}>
            <View style={styles.eventAlert}>
              <Svg x="0px" y="0px"
width="40" height="40"
viewBox="0 0 50 50">
                <Path d="M24 44q-4.15 0-7.8-1.575-3.65-1.575-6.35-4.275-2.7-2.7-4.275-6.35Q4 28.15 4 24t1.575-7.8Q7.15 12.55 9.85 9.85q2.7-2.7 6.35-4.275Q19.85 4 24 4t7.8 1.575q3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24t-1.575 7.8q-1.575 3.65-4.275 6.35-2.7 2.7-6.35 4.275Q28.15 44 24 44Zm-2.15-3.05v-4.1q-1.75 0-2.95-1.3-1.2-1.3-1.2-3.05v-2.2L7.45 20.05q-.25 1-.35 1.975Q7 23 7 24q0 6.5 4.225 11.35t10.625 5.6Zm14.7-5.4q1.1-1.2 1.925-2.55.825-1.35 1.4-2.825t.85-3.025Q41 25.6 41 24q0-5.3-2.9-9.625T30.35 8.05v.9q0 1.75-1.2 3.05-1.2 1.3-2.95 1.3h-4.35v4.35q0 .85-.675 1.4-.675.55-1.525.55H15.5V24h12.9q.85 0 1.4.65.55.65.55 1.5v6.35h2.15q1.45 0 2.55.85 1.1.85 1.5 2.2Z" stroke="#7f8c8d" strokeWidth="1" width="30" height="30" fill="#7f8c8d"/>
              </Svg>
      <Text style={styles.textAlert}>{`Alertes : ${Data !== undefined ? Data.event_type.map.name : null}`}</Text>
      </View>
      </View>
    );
    }else{
      return ;
    }
  }catch(error){
    console.log(error)
    }
  }
useEffect(()=>{
  if(userData.password === null && userData.token === null && userData.username === null && userData.alertNumber === null){
    navigation.navigate('Login')
  }
},[userData.username,userData.password,userData.token,userData.alertNumber]);
async function Events(){
  await axios('/events',{
    method:'GET',
    headers:{
      'content-type': 'application/json',
    },
    data:{
      userToken,
    },
  }).then((reponse)=>{
    setData(reponse.data.events[4])
  }).catch((error)=>{
    console.log("Erreur",error)
  });
}
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
width="40" height="40"
viewBox="0 0 50 50">
          <Path  d="m19.4 44-1-6.3q-.95-.35-2-.95t-1.85-1.25l-5.9 2.7L4 30l5.4-3.95q-.1-.45-.125-1.025Q9.25 24.45 9.25 24q0-.45.025-1.025T9.4 21.95L4 18l4.65-8.2 5.9 2.7q.8-.65 1.85-1.25t2-.9l1-6.35h9.2l1 6.3q.95.35 2.025.925Q32.7 11.8 33.45 12.5l5.9-2.7L44 18l-5.4 3.85q.1.5.125 1.075.025.575.025 1.075t-.025 1.05q-.025.55-.125 1.05L44 30l-4.65 8.2-5.9-2.7q-.8.65-1.825 1.275-1.025.625-2.025.925l-1 6.3ZM24 30.5q2.7 0 4.6-1.9 1.9-1.9 1.9-4.6 0-2.7-1.9-4.6-1.9-1.9-4.6-1.9-2.7 0-4.6 1.9-1.9 1.9-1.9 4.6 0 2.7 1.9 4.6 1.9 1.9 4.6 1.9Zm0-3q-1.45 0-2.475-1.025Q20.5 25.45 20.5 24q0-1.45 1.025-2.475Q22.55 20.5 24 20.5q1.45 0 2.475 1.025Q27.5 22.55 27.5 24q0 1.45-1.025 2.475Q25.45 27.5 24 27.5Zm0-3.5Zm-2.2 17h4.4l.7-5.6q1.65-.4 3.125-1.25T32.7 32.1l5.3 2.3 2-3.6-4.7-3.45q.2-.85.325-1.675.125-.825.125-1.675 0-.85-.1-1.675-.1-.825-.35-1.675L40 17.2l-2-3.6-5.3 2.3q-1.15-1.3-2.6-2.175-1.45-.875-3.2-1.125L26.2 7h-4.4l-.7 5.6q-1.7.35-3.175 1.2-1.475.85-2.625 2.1L10 13.6l-2 3.6 4.7 3.45q-.2.85-.325 1.675-.125.825-.125 1.675 0 .85.125 1.675.125.825.325 1.675L8 30.8l2 3.6 5.3-2.3q1.2 1.2 2.675 2.05Q19.45 35 21.1 35.4Z" stroke="#000" strokeWidth="1" width="40" height="40" fill="#000"/>
        </Svg>
        <Text style={styles.logout}>LogOut</Text>
        </Pressable>
      </View>
      {Data !== undefined ? Test() : null}
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
    <Tab/>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  eventAlert:{
    flex:1,
    flexDirection:'row',
    textAlign:'center',
    alignItems:'flex-start',
    justifyContent:'center',
    alignSelf:'flex-start',
  },
  textAlert:{
    color:'black',
    fontSize:15,
    fontStyle:'italic',
    fontWeight:'500',
    textTransform:'capitalize',
    textAlign:'center',
    margin:20,
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
    flex:1,
    flexDirection:'column',
    textAlign:'center',
    alignItems:'flex-start',
    justifyContent:'flex-start',
    alignSelf:'flex-start',
    margin:10,
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