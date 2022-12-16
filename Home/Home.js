import React,{useState,useEffect,useRef} from 'react'
import { Pressable,Image,View,StyleSheet,Text,DrawerLayoutAndroid,SafeAreaView} from 'react-native';
import {useDispatch} from 'react-redux';
import {setGlobalData} from "../Redux/Slice";
import PageEventInfo from './Body/PageEventInfo'
import Svg, {Path} from 'react-native-svg';
import Event from './Body/Event';
import Carte from './Body/Map'
import Body from './Body/Body';
import { logOut } from '../Redux/Slice';
import { useSelector } from 'react-redux';
import axios from '../API/Argos_GET_USERS'
import * as Location from 'expo-location';
import {DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


function Home({navigation}){
  const drawer = useRef(null);
  let size = 0 ;
  const userData = useSelector((state) => state.auth)
  const userToken = userData.token ;
  const [location,setLocation] = useState(null)
  const [message,setMessage] = useState(null)
  const [Data,setData] = useState({})
  const date = new Date();
  const Stack = createNativeStackNavigator()
  const dispatch = useDispatch()
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#f1f1f1',
    },
  };
  useEffect(()=>{
    const time = setTimeout(()=>{
      if(userData.password === null && userData.token === null && userData.username === null && userData.alertNumber === null){
        navigation.navigate('Login')
      }
    },200)
    return () => clearTimeout(time)
  },[userData.username,userData.password,userData.token,userData.alertNumber]);
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
          try{
            setData(reponse);
          }catch(err){
            console.log(err)
          }
      }).catch((error)=>{
        console.log("Erreur",error)
      });
    }
    Events();
    },500)
    return () => clearTimeout(timeout);
    },[])
    if(size <= 0){
      useEffect(()=>{
        const compteur = setTimeout(()=>{
          try{
            Object.keys(Data.data).forEach(x => size = Object.keys(x).length)
            if(Data !== null || Data !== undefined){
            dispatch(setGlobalData({Data}));
            return () => clearTimeout(compteur);
            }
          }catch(error){
            console.log(error)
          }
        },1000)
      })
    }
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
return(
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
      <Stack.Navigator initialRouteName="Body">
          <Stack.Screen component={Body} name="Body" options={{headerShown:false}}/>
          <Stack.Screen component={Event} name="Event" options={{headerShown:false}}/>
          <Stack.Screen component={Carte} name="Map" options={{headerShown:false}}/>
          <Stack.Screen component={PageEventInfo} name="PageEventInfo" options={{headerShown:false}}/>
        </Stack.Navigator>
  </DrawerLayoutAndroid>
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
      Events: {
        flex: 1,
        backgroundColor:'#1c2833',
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
        height:120,
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
});
export default Home ;