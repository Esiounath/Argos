import axios from '../API/Argos_LOGIN';
import React, {useState,useEffect} from 'react'
import { StyleSheet,View,SafeAreaView,TextInput,Text,Image,Pressable,Modal} from 'react-native'
import { useDispatch } from 'react-redux';
import { setCredentials } from '../Redux/Slice';
import { useSelector } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import * as SecureStore from 'expo-secure-store';


async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result ;
  }
}
export default function Login({navigation}){
    const [username,setUsername] = useState("Username");
    const [password,setPassword] = useState("Mot de passe");
   /* const CookiesUser = getValueFor('STORAGE_USER')
    const CookiesPassword = getValueFor('STORAGE_PASSWORD')*/
    const [errMsg,setErrMsg] = useState('')
    const [userToken,setuserToken] = useState()
    const [number,setNumber] = useState()
    const [modalVisible,setModalVisible] = useState(false)
    const [writer,setWriter] = useState('')
    const text = 'Welcome to Argos Network'
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.auth)
   useEffect(()=>{
      if(userData.password !== null && userData.username !== null && userData.token !== null ){
        navigation.navigate('Home')
      }
    },[userData]);

    async function handleSubmit(){
      if(username.length !== 0 || password.length !== 0){
        NetInfo.fetch().then(async state => {
          if(state.isConnected){
      await axios('/auth/login',{
        method:'POST',
        headers:{
          'content-type': 'application/json',
        },
        data:{
          username,
          password,
        },
      }).then(async (reponse)=>{
        setuserToken(reponse.data.token)
        setNumber(reponse.data.alertPhoneNumbers)
        dispatch(setCredentials({userToken,username,password,number}))
        setUsername("Enter your Username")
        setPassword("Enter your Password")
        /*await SecureStore.setItemAsync('STORAGE_USER',JSON.stringify({username,password}))
        await SecureStore.setItemAsync('STORAGE_TOKEN',JSON.stringify(userToken))*/
      }).catch((err)=>{
        if(!err.data){
          console.log('Error',err)
          setErrMsg('No server reponse')
          setModalVisible(!modalVisible)
        }else if(err.data?.status === 400){
          setErrMsg('Missing Password or Username')
          console.loh('Missing Password or Username')
        }
        else if(err.data?.status === 401){
          setErrMsg('Unauthorized')
          console.log('Unauthorized',err)
        }
        else{
          setErrMsg('Login Failed')
        }
      });
    }else{
      setErrMsg('No Internet connexion !')
    }
    });
    }else{
      setErrMsg('Username or Password is Empty !')
      setModalVisible(!modalVisible)
    }
    }
    useEffect(() => {
      const timeout = setTimeout(() => {
        setWriter(text.slice(0, writer.length + 1));
      }, 20);
      return () => clearTimeout(timeout);
    }, [writer]);
return(
    <SafeAreaView style={styles.login}>
          <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{errMsg}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
        <Image source={require('../Picture/Globe.png')} style={styles.globe}/>
        <Text style={styles.text}>{writer}</Text>
        <Text style={styles.text}>Username</Text>
    <TextInput
      style={styles.input}
      placeholder="Username"
      
      onChangeText={newUsername => setUsername(newUsername)}
      defaultValue={username}
    />
    <Text style={styles.text}>Password</Text>
     <TextInput
      style={styles.input}
      placeholder="Password"
      secureTextEntry
      enablesReturnKeyAutomatically
      autoCapitalize="none"
      onChangeText={newPassword => setPassword(newPassword)}
      defaultValue={password}
    />
      <Pressable style={styles.valid} onPress={()=>{handleSubmit()}}>
      <Text style={styles.signup}>Login In</Text>
    </Pressable>
    <Pressable style={{
                marginVertical:100,
    }}>
        <Text style={styles.anonymously}>use anonymoulsy</Text>
    </Pressable>
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor:'#1c2833',
    color: 'white',
  },
    message:{
        color:'#ffffff',
        fontSize:30,
        fontWeight:'300',
        textAlign:'center',
        lineHeight:40,
        fontStyle:'italic',
    },
    valid: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 0,
        backgroundColor: 'transparent',
      },
      signup: {
        fontSize: 22,
        lineHeight: 30,
        fontWeight: '700',
        letterSpacing: 0.50,
        color: '#ffffff',
        textTransform:'uppercase',
      },
      anonymously:{
        justifyContent:'flex-end',
        alignItems:'flex-end',
        fontSize: 18,
        lineHeight: 30,
        fontWeight: '400',
        letterSpacing: 0.25,
        elevation: 0,
        color:'#ffffff',
        backgroundColor:'transparent',
        textTransform:'uppercase',
      },
    globe:{
        height:70,
        width:70,
        marginBottom:22,
    },
    input:{
        backgroundColor:'#f1f1f1',
        color:'black',
        height:45,
        width:'70%',
        borderRadius:15,
        fontSize:22,
        alignItems:'center',
        textAlign:'center',
        justifyContent:'center',
        marginHorizontal:'10%',
        marginVertical:10,
        fontWeight:'400',
        fontStyle:'italic',
      },
      login:{
        marginVertical:'50%',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        flex:1,
        backgroundColor:'#1c2833'
      },
      modalView: {
        margin: 20,
        backgroundColor: '#2C3E50',
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.10,
        shadowRadius: 4,
        elevation: 6
      },
      button: {
        borderRadius: 10,
        padding: 10,
        elevation: 3,
        height:40,
        width:150,
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize:18,
        lineHeight:25,
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight:'500',
        fontStyle:'italic',
        fontSize:28,
        color:'red',
      }, 
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      text:{
        marginTop:15,
        fontSize:28,
        fontStyle:'italic',
        color:'#FFFFFF',
        fontWeight:'650',
      }
});