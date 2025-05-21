# 🛍️ FitCompras - Catálogo de Productos Inteligente

**Plataforma desarrollada como proyecto final para la materia Prácticas Profesionalizantes II - Tecnicatura en Desarrollo de Software**

---

## 📋 Descripción General

**FitCompras** es una aplicación web que funciona como un **catálogo virtual de productos**, permitiendo a los usuarios explorar, guardar favoritos y visualizar promociones de manera organizada, intuitiva y accesible desde cualquier dispositivo.  
Está orientada a mejorar la planificación de compras mediante herramientas como filtros inteligentes, gestión personalizada y asistencia virtual por medio de un chatbot.

El proyecto se desarrolló con enfoque modular bajo arquitectura **MVC**, integrando tecnologías actuales del stack Java + Web, con base de datos relacional y soporte multiplataforma.

---

## 🚀 Funcionalidades Principales

- 🔎 **Exploración de Catálogo**: Navegación fluida por productos organizados por categorías, con descripción, imagen y precios actualizados.
- ❤️ **Productos Guardados**: Posibilidad de marcar productos como favoritos para acceder rápidamente a ellos más tarde.
- 🎯 **Promociones Dinámicas**: Visualización de ofertas especiales actualizadas periódicamente por día o banco.
- 🤖 **Chatbot de Asistencia**: Sistema automatizado de soporte, accesible desde cualquier sección, que responde consultas frecuentes.
- 👤 **Registro e Inicio de Sesión**: Autenticación segura y validación de credenciales para una experiencia personalizada.
- 🛠️ **Panel de Administración**: Módulo exclusivo para administradores con funcionalidades de alta, modificación y baja de productos.
- 📱 **Diseño Responsive**: Compatible con computadoras, tablets, garantizando una navegación uniforme.
- 🔐 **Autenticación y Seguridad**: Control de acceso por rol, cifrado de contraseñas y validación segura desde backend.

---
## 👥 Equipo de Desarrollo
- 👨‍💼 **Jefe de Proyecto: Nicolás Díaz** 

- 👨‍💻 **Backend Developer: Franco Villar Laz y Lautaro Martín**

- 🎨 **Frontend Developer: Matías Morán y Franco Villar Laz**

- 🖌️ **Diseño UI: Todo el equipo**

- 🧪 **Testing & QA: Nicolás Araya**
---

## 🧑‍💻 Tecnologías Utilizadas

### 🖥️ Frontend

- `HTML5`, `CSS3`, `JavaScript`
- `Bootstrap 5` para diseño responsive
- `jQuery` para interactividad dinámica

### 🛠️ Backend

- `Java` con `Spring Boot`
- `Spring Data JPA` para persistencia de datos
- `RESTful API` para interacción cliente-servidor

### 💾 Base de Datos

- `PostgreSQL` (modelada en 3FN)
- Gestión estructurada de productos, usuarios, subcategorías y descuentos

### 🧪 Desarrollo y Despliegue

- `Docker` para contenedores y despliegue local
- Arquitectura en capas (`MVC`)

---

## 🧱 Arquitectura del Proyecto

- `Vista (View)`: Interfaz de usuario construida con HTML, CSS y JS. Acceso al catálogo, chatbot y promociones.
- `Controlador (Controller)`: Maneja las solicitudes y respuestas entre cliente y servidor.
- `Modelo (Model)`: Lógica de negocio y entidades como Producto, Usuario y Descuento.
- `Repositorio`: Acceso a datos mediante JPA.
- `Seguridad`: Sistema de login y gestión de sesiones.

---

## 🧪 Pruebas Realizadas

- ✅ Pruebas de interfaz (UI) en distintos dispositivos
- ✅ Pruebas funcionales: catálogo, favoritos, promociones, chatbot, login
- ✅ Pruebas de rendimiento: consultas simultáneas y respuesta del sistema
- ✅ Validación de seguridad en sesiones y manipulación de datos

---

## 📦 Instalación del Proyecto

### 1. Clonar el repositorio
```bash
git clone https://github.com/N1CKWEB/FitCompras-Eccomerce.git
```

---

## 📄 Licencia

**Este proyecto está licenciado bajo MIT License.**
**Consultá el archivo LICENSE para más información.**
