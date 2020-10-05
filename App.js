import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableHighlight, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Cita from './componentes/Cita';
import Formulario from './componentes/Formulario';
import AsyncStorage from '@react-native-community/async-storage';

const App = () => {

  //Definimos el state para mostrar el formulario
  const [ mostrarForm, guardarMostrarForm ] = useState(false);

  //Definimos el state de las citas
  const [ citas, setCitas ] = useState([
  /*  { id: "1", paciente: "Hook", propietario: "Juan", sintomas: "No Come" }, 
    { id: "2", paciente: "Redux", propietario: "Pedro", sintomas: "No Duerme" },
    { id: "3", paciente: "Native", propietario: "Maria", sintomas: "No Canta" }*/
  ])

  useEffect(() => { 
    ObtenerCitasStorage()
  }, [])

  //Eliminamos los pacientes del state
  const eliminarPaciente = id => {
    /*setCitas( (citasActuales) => {
      return citasActuales.filter( cita => cita.id !== id)
    })*/
    const citasFiltradas = citas.filter( cita => cita.id !== id);
    setCitas(citasFiltradas); 
    //Actualizamos el storage con las citas filtradas...esto seria una varainte a usar AsyncStorage.removeItem
    guardarCitasStorage(JSON.stringify(citasFiltradas)); 
  }

  //Mostrar u ocultar el formulario
  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarForm)
  } 
  
  //Ocultamos el teclado cuando tocamos fuera del input
  const cerrarTeclado = () => {
      Keyboard.dismiss()
  }
  
  //Guardamos la cita del del usuario en el storage con AsyncStorage.setItem
  const guardarCitasStorage = async (citasJSON) => {
    //console.log('Guardando datos...: ', citasJSON)
    try {
      await AsyncStorage.setItem('citas', citasJSON);      
    }
    catch(error) {
      console.log(error);
    }
  }

  //Obtenemos las citas guardadas con AsyncStorage.getItem
  const ObtenerCitasStorage = async () => {    
    try {
      const citasStorage = await AsyncStorage.getItem('citas');
      //console.log('Obteniendo citas...: ', citasStorage)
      if (citasStorage) {
        setCitas(JSON.parse(citasStorage));
      }
      
    }
    catch(error) {
      console.log(error);
    }
  }

  //FlatList nos permite renderizar solo lo que se ve en pantalla, mejorando la performance con respecto a map o ScrollView
  return (
      <TouchableWithoutFeedback onPress={ () => cerrarTeclado() }>

        <View style={styles.contenedor}>

          <Text style={styles.titulo}>Administrador de Citas</Text>

          <TouchableHighlight onPress={ () => mostrarFormulario() } style={styles.btnMostrarForm}>
              <Text style={styles.textoMostrarForm}>{ mostrarForm ? 'Cancelar Nueva Cita' : 'Crear Nueva Cita' }</Text>
          </TouchableHighlight>

          <View style={styles.contenido}>

            { mostrarForm ? (
              <>
              <Text style={styles.titulo}>Crear Nueva Cita</Text>
              <Formulario 
                citas={citas}
                setCitas={setCitas}
                guardarMostrarForm={guardarMostrarForm}
                guardarCitasStorage={guardarCitasStorage}
              />
              </>
            ) : (
              <>
              <Text style={styles.titulo}> {citas.length > 0 ? 'Administra tus citas' : 'No hay citas' } </Text>

              <FlatList style={styles.listado}
                data={citas}
                renderItem={ ( { item } ) => <Cita item={item} eliminarPaciente={eliminarPaciente} /> }
                keyExtractor={ cita => cita.id }
              />
              </>
            )}

          </View>

          {/*citas.map(cita => (
            <View> 
              <Text>{cita.paciente}</Text>
            </View>
          ))*/} 

        </View>

      </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#AA076B',
    flex: 1
  },
  titulo: {
    color: '#FFF',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'    
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%'
  },
  listado: {
    flex: 1
  },
  btnMostrarForm: {
      padding: 10,
      backgroundColor: '#7d024e',
      marginVertical: 10
  },
  textoMostrarForm: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'    
  }
});

export default App;
