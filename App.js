import React, {useState, useRef} from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Keyboard} from 'react-native'
import api from './src/services/api'

export default function App(){
const [cep, setCep] = useState('')
const inputRef = useRef(null)
const [cepUser, setCepUser] = useState(null)

async function buscar(){
  if(cep == '') {
    alert('Digite um CEP valido')
    setCep('')
    return
  }
  try {

    const response = await api.get(`/${cep}/json`)
    console.log(response.data)
    setCepUser(response.data)
    Keyboard.dismiss(); //Garantir que o teclado será fechado

  }catch(error){
    console.log('ERROR:' + error )

  }

}

function limpar(){
  setCep('')
  inputRef.current.focus()
}

  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.text}>Digite o CEP desejado</Text>
        <TextInput 
        style={styles.input}
        placeholder="Ex: 95890000"
        value={cep}
        onChangeText={(texto) => setCep(texto) }
        keyboardType="numeric"
        ref={inputRef}
        />
      </View>
      <View style={styles.areaBtn}>
        <TouchableOpacity style={[styles.button, {backgroundColor: '#1D75CD'}]}
        onPress={buscar}
        >
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={limpar}
        style={[styles.button, {backgroundColor: '#CD3E1D'}]}>
          <Text style={styles.buttonText}>Limpar</Text>
        </TouchableOpacity>
      </View>
      
      {cepUser && 
        <View style={styles.resultado}>
        <Text style={styles.itemText}>CEP: {cepUser.cep} </Text>
        <Text style={styles.itemText}>Logradouro: {cepUser.logradouro}</Text>
        <Text style={styles.itemText}>Bairro: {cepUser.bairro}</Text>
        <Text style={styles.itemText}>Cidade: {cepUser.localidade}</Text>
        <Text style={styles.itemText}>Estado: {cepUser.uf}</Text>
     </View>
      }
     
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  text: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 18,
  },
  areaBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around'
  },
  button: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF'
  },
  resultado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    fontSize: 22,
  }
})