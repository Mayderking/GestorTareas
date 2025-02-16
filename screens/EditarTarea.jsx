// screens/EditarTarea.jsx

import React, { useState } from 'react';
import { View, Button, StyleSheet, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditarTarea = ({ navigation, route }) => {
  const tareaExistente = route?.params?.tarea;
  const [titulo, setTitulo] = useState(tareaExistente ? tareaExistente.titulo : '');
  const [descripcion, setDescripcion] = useState(
    tareaExistente ? tareaExistente.descripcion : ''
  );

  const guardarTarea = async () => {
    try {
      let tareas = JSON.parse(await AsyncStorage.getItem('tareas')) || [];

      if (tareaExistente) {
        // Editar
        tareas = tareas.map((t) =>
          t.id === tareaExistente.id ? { ...t, titulo, descripcion } : t
        );
      } else {
        // Crear
        const nuevaTarea = {
          id: Date.now().toString(),
          titulo,
          descripcion,
          completada: false,
          horaCreacion: new Date().toLocaleString(),
        };
        tareas.push(nuevaTarea);
      }

      await AsyncStorage.setItem('tareas', JSON.stringify(tareas));

      // Reemplazar la pantalla actual por "Inicio"
      navigation.replace('Inicio');
    } catch (error) {
      console.error('Error al guardar la tarea:', error);
    }
  };

  const eliminarTarea = async () => {
    if (!tareaExistente) return;
    Alert.alert(
      'Eliminar tarea',
      '¿Estás seguro de eliminar esta tarea?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              let tareas = JSON.parse(await AsyncStorage.getItem('tareas')) || [];
              tareas = tareas.filter((t) => t.id !== tareaExistente.id);
              await AsyncStorage.setItem('tareas', JSON.stringify(tareas));
              navigation.replace('Inicio');
            } catch (error) {
              console.error('Error al eliminar la tarea:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título de la tarea"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción de la tarea"
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <Button title="Guardar" onPress={guardarTarea} />

      {tareaExistente && (
        <View style={{ marginTop: 10 }}>
          <Button title="Eliminar" color="red" onPress={eliminarTarea} />
        </View>
      )}
    </View>
  );
};

export default EditarTarea;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#ccc',
  },
});

