import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView, SegmentedControlIOSBase } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid';

const Formulario = ( { citas, setCitas, guardarMostrarForm, guardarCitasStorage } ) => {

    //Definimos el state para guardar el paciente
    const [paciente, guardarPaciente] = useState('');
    //Definimos el state para guardar el propietario
    const [propietario, guardarPropietario] = useState('');
    //Definimos el state para guardar el telefono de contacto
    const [telefono, guardarTelefono] = useState('');
    //Definimos el state para guardar la fecha
    const [fecha, guardarFecha] = useState('');
    //Definimos el state para guardar la hora
    const [hora, guardarHora] = useState('');
    //Definimos el state para guardar los sintomas del paciente
    const [sintomas, guardarSintomas] = useState('');

    //Definimos el state del formato de la fecha
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    //Definimos el state del formato de la hora
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    //Mostramos el modal de la fecha
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    //Ocultamos el modal de la fecha 
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
  
    //Actualizamos el state de la fecha segun la seleccion del usuario
    const confirmarFecha = date => {
        const opciones = { year: 'numeric', month: 'long', day: '2-digit' }
        guardarFecha(date.toLocaleDateString('es-ES', opciones))
        //console.warn("A date has been picked: ", date);
        hideDatePicker();
    };

    //Mostramos el modal de la hora
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    //Ocultamos el modal de la hora 
    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    //Actualizamos el state de la hora segun la seleccion del usuario
    const confirmarHora = time => {
        const opciones = { hour: 'numeric', minute: '2-digit', hour12: false }
        guardarHora(time.toLocaleTimeString('en-US', opciones));
        //console.warn("A time has been picked: ", time);
        hideTimePicker();
    };

    //Creamos una nueva cita
    const crearNuevaCita = () => {
        //Validamos los datos introducidos por el usuario
        if (paciente.trim() === '' || propietario.trim() === '' ||
        telefono.trim() === '' || fecha.trim() === '' ||
        hora.trim() === '' || sintomas.trim() === '')
        {
            //Mostramos una alerta para el caso de que falle la validacion
            mostrarAlerta()
            return;
        }
        
        //Creamos una nueva cita
        const cita = { paciente, propietario, telefono, fecha, hora, sintomas }
    
        cita.id = shortid.generate();

        //console.log(cita);
        //Agregamos la cita al state
        /*setCitas([
            ...citas, cita
        ])*/        
        const citasNuevo = [ ...citas, cita ];
        setCitas(citasNuevo);
        
        //Actualizamos las citas en el storage
        guardarCitasStorage(JSON.stringify(citasNuevo));

        //Ocultamos el formulario
        guardarMostrarForm(false)

        //Resetear el formulario
        guardarSintomas('');
        guardarPropietario('');
        guardarPaciente('');
        guardarHora('');
        guardarFecha('');
        guardarTelefono('');
       
    }

    //Mostramos una alerta
    const mostrarAlerta = () => {
       Alert.alert(
           'Error', //Titulo
           'Todos los campos son obligatorios', //mensaje
           [{
               text: 'OK' //Arreglo de botones
           }]
       )
    }

    return (
      <ScrollView style={styles.formulario}>

        <View>
            <Text style={styles.label}>Paciente: </Text>
            <TextInput style={styles.input}
                onChangeText={ (texto) => guardarPaciente(texto) }
            />
        </View>

        <View>
            <Text style={styles.label}>Dueño: </Text>
            <TextInput style={styles.input}
                onChangeText={ (texto) => guardarPropietario(texto) }
            />
        </View>

        <View>
            <Text style={styles.label}>Teléfono Contacto: </Text>
            <TextInput style={styles.input}
                onChangeText={ (texto) => guardarTelefono(texto) }
                keyboardType='numeric'
            />
        </View>

        <View>
            <Text style={styles.label}>Fecha: </Text>
            <Button title='Seleccion Fecha' onPress={showDatePicker} />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode='date'
                onConfirm={confirmarFecha}
                onCancel={hideDatePicker}
                locale='es_ES'
                headerTextIOS='Elige una Fecha'
                cancelTextIOS='Cancelar'
                confirmTextIOS='Confirmar'
                is24Hour
            />
            <Text>{fecha}</Text>
        </View>

        <View>
            <Text style={styles.label}>Hora: </Text>
            <Button title='Seleccionar Hora' onPress={showTimePicker} />
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode='time'
                onConfirm={confirmarHora}
                onCancel={hideTimePicker}
                locale='es_ES'
                headerTextIOS='Elige una Hora'
                cancelTextIOS='Cancelar'
                confirmTextIOS='Confirmar'
                is24Hour
            />
            <Text>{hora}</Text>
        </View>

        <View>
            <Text style={styles.label}>Síntomas: </Text>
            <TextInput style={styles.input}
                multiline
                onChangeText={ (texto) => guardarSintomas(texto) }
            />
        </View>   

        <TouchableHighlight onPress={ () => crearNuevaCita() } style={styles.btnSubmit}>
            <Text style={styles.textoSubmit}>Enviar</Text>
        </TouchableHighlight>     

      </ScrollView>  
    )
}

//No se heredan los estilos entre el hijo y el padre
const styles = StyleSheet.create({
    formulario: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: '2.5%'
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    input: {
        marginTop: 20,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    btnSubmit: {
        padding: 10,
        backgroundColor: '#7d024e',
        marginVertical: 10
    },
    textoSubmit: {
      color: '#FFF',
      fontWeight: 'bold',
      textAlign: 'center'    
    }
  });

export default Formulario;