import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Formulario = ( { item, eliminarPaciente } ) => {

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
        console.warn("A date has been picked: ", date);
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
        console.warn("A date has been picked: ", time);
        hideTimePicker();
    };

    return (
      <View style={styles.formulario}>

        <View>
            <Text style={styles.label}>Paciente: </Text>
            <TextInput style={styles.input}
                onChangeText={ (texto) => console.log(texto) }
            />
        </View>

        <View>
            <Text style={styles.label}>Dueño: </Text>
            <TextInput style={styles.input}
                onChangeText={ (texto) => console.log(texto) }
            />
        </View>

        <View>
            <Text style={styles.label}>Teléfono Contacto: </Text>
            <TextInput style={styles.input}
                onChangeText={ (texto) => console.log(texto) }
                keyboardType='numeric'
            />
        </View>

        <View>
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
        </View>

        <View>
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
        </View>

        <View>
            <Text style={styles.label}>Síntomas: </Text>
            <TextInput style={styles.input}
                multiline
                onChangeText={ (texto) => console.log(texto) }
            />
        </View>        

      </View>  
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
    }
  });

export default Formulario;