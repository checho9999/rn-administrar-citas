import React, { useState } from 'react';
import { Text, StyleSheet, View, FlatList } from 'react-native';
import Cita from './componentes/Cita';

const App = () => {

  //Definimos el state de las citas
  const [ citas, setCitas ] = useState([
    { id: "1", paciente: "Hook", propietario: "Juan", sintomas: "No Come" }, 
    { id: "2", paciente: "Redux", propietario: "Pedro", sintomas: "No Duerme" },
    { id: "3", paciente: "Native", propietario: "Maria", sintomas: "No Canta" }
  ])

  return (
      <View style={styles.contenedor}>

        <Text style={styles.titulo}>Administrador de Citas</Text>

        <FlatList
          data={citas}
          renderItem={ ( { item } ) => <Cita item={item} /> }
          keyExtractor={ cita => cita.id }
        />

        {/*citas.map(cita => (
          <View> 
            <Text>{cita.paciente}</Text>
          </View>
        ))*/}

      </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#AA076B',
    flex: 1
  },
  titulo: {
    color: '#FFF',
    marginTop: 40,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'    
  }
});

export default App;
