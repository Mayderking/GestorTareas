import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { useNavigation } from '@react-navigation/native';

const Inicio = () => {
  const navigation = useNavigation();
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    cargarTareas();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      cargarTareas();
    });
    return unsubscribe;
  }, [navigation]);

  const cargarTareas = async () => {
    try {
      const data = await AsyncStorage.getItem('tareas');
      if (data) {
        setTareas(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error al cargar tareas:', error);
    }
  };

  const guardarTareas = async (nuevasTareas) => {
    try {
      await AsyncStorage.setItem('tareas', JSON.stringify(nuevasTareas));
    } catch (error) {
      console.error('Error al guardar tareas:', error);
    }
  };

  const toggleCompletada = (id) => {
    const nuevasTareas = tareas.map((t) =>
      t.id === id ? { ...t, completada: !t.completada } : t
    );
    const pendientes = nuevasTareas.filter((t) => !t.completada);
    const completadas = nuevasTareas.filter((t) => t.completada);
    const nuevasOrdenadas = [...pendientes, ...completadas];
    setTareas(nuevasOrdenadas);
    guardarTareas(nuevasOrdenadas);
  };

  const sortedTareas = [...tareas].sort((a, b) => {
    if (!a.completada && b.completada) return -1;
    if (a.completada && !b.completada) return 1;
    return 0;
  });

  const contadorPendientes = sortedTareas.filter((t) => !t.completada).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>App de tareas</Text>
        <View style={styles.searchContainer}>
          <TouchableOpacity
            style={styles.placeholderButton}
            onPress={() => navigation.navigate('EditarTarea')}
          >
            <Text style={styles.placeholderText}>Ingresar tarea</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('EditarTarea')}>
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.listWrapper}>
        <DraggableFlatList
          data={sortedTareas}
          keyExtractor={(item) => item.id}
          activationDistance={20}
          renderItem={({ item, drag, isActive }) => (
            <TouchableOpacity
              onLongPress={!item.completada ? drag : null}
              onPress={() => navigation.navigate('EditarTarea', { tarea: item })}
              disabled={isActive}
            >
              <View style={styles.taskCard}>
                <View>
                  <Text style={styles.taskText}>{item.titulo}</Text>
                  {item.horaCreacion && (
                    <Text style={styles.taskTime}>
                      Creada: {item.horaCreacion}
                    </Text>
                  )}
                  {!item.completada && (
                    <Text style={styles.dragHint}>
                      Mantén presionado para arrastrar
                    </Text>
                  )}
                </View>
                <TouchableOpacity onPress={() => toggleCompletada(item.id)}>
                  {item.completada ? (
                    <Ionicons name="checkmark-circle" size={32} color="green" />
                  ) : (
                    <Ionicons name="ellipse-outline" size={32} color="#ccc" />
                  )}
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          onDragEnd={({ data }) => {
            const pendientes = data.filter((t) => !t.completada);
            const completadas = data.filter((t) => t.completada);
            const nuevasOrdenadas = [...pendientes, ...completadas];
            setTareas(nuevasOrdenadas);
            guardarTareas(nuevasOrdenadas);
          }}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Tienes pendientes {contadorPendientes} tarea
          {contadorPendientes !== 1 ? 's' : ''}
        </Text>
      </View>
    </View>
  );
};

export default Inicio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2979FF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  placeholderButton: {
    flex: 1,
    marginRight: 10,
  },
  placeholderText: {
    color: '#fff',
    fontSize: 16,
  },
  listWrapper: {
    flex: 1,
  },
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
  taskTime: {
    fontSize: 12,
    color: '#888',
    marginTop: 3,
  },
  dragHint: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 16,
  },
});
