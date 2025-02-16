# App de Tareas

Esta es una aplicación de lista de tareas desarrollada con **React Native** y **Expo**. La app permite a los usuarios:

- **Crear**, **editar** y **eliminar** tareas.
- Marcar tareas como **completadas**.
- **Reordenar** las tareas pendientes mediante arrastrar y soltar.
- Visualizar las tareas ordenadas: las pendientes se muestran en la parte superior y las completadas abajo.
- Navegar entre la pantalla principal y el formulario de edición/creación.

## Características

- **Navegación**: Implementada con React Navigation (Stack Navigator).
- **Persistencia de Datos**: Se utiliza `AsyncStorage` para almacenar y recuperar las tareas.
- **Interfaz**: 
  - Pantalla principal ("Inicio") que muestra la lista de tareas.
  - Área de "Ingresar tarea" que redirige al formulario.
  - Footer que muestra el número de tareas pendientes.
  - Funcionalidad de arrastrar y soltar (con `react-native-draggable-flatlist`) para reordenar las tareas pendientes.
- **Diseño adaptable**: Se usan estilos con Flexbox para una interfaz optimizada para dispositivos móviles.
- **Uso de íconos**: Se integran íconos de `@expo/vector-icons` para una mejor experiencia visual.

## Requisitos

- Node.js (recomendado la versión LTS) https://nodejs.org/en
- Expo CLI
- Un dispositivo (expo go) o emulador para probar la aplicación

## Instalación

1. **Clona el repositorio:**

   ```bash
   [git clone https://github.com/Mayderking/tu_repositorio.git](https://github.com/Mayderking/GestorTareas.git)
   cd tu_repositorio

instalar expo
  npm install --global expo

Dependencias
   npm install @react-native-async-storage/async-storage @react-navigation/native @react-navigation/stack react-native-draggable-flatlist
   iconos de expo si aun no los tienes:
   expo install @expo/vector-icons

iniciar app
-abrir una terminal powershell o la misma terminal de visual
-estar en el directorio de la app
-ejecutar npm start


