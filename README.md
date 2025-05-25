
# 🛍️ FitCompras-Eccomerce

**Comercio Electrónico desarrollado para la materia de Prácticas Profesionalizante II**

## 📋 Descripción

FitCompras es una plataforma de comercio electrónico diseñada para ofrecer una experiencia de compra en línea fluida y segura. Este proyecto fue desarrollado como parte de la asignatura Prácticas Profesionalizante II, con el objetivo de aplicar y consolidar conocimientos en desarrollo web y comercio electrónico.

## 🚀 Características

- **Catálogo de Productos**: Navega por una amplia variedad de productos organizados en categorías.
- **Carrito de Compras**: Añade productos al carrito y gestiona tus selecciones antes de la compra.
- **Proceso de Pago Seguro**: Realiza transacciones de manera segura y confiable.
- **Panel de Administración**: Administra productos, categorías y pedidos desde una interfaz intuitiva.
- **Búsqueda Avanzada**: Encuentra productos rápidamente utilizando filtros y búsqueda por palabras clave.

## 🛠️ Tecnologías Utilizadas

- **Frontend**:
  - HTML5
  - CSS3
  - JavaScript ES6+
- **Backend**:
  - Java con Spring Boot
  - Base de datos MySQL
- **Herramientas y Librerías**:
  - Bootstrap para diseño responsivo
  - jQuery para interactividad
  - Hibernate/JPA para ORM

## 📦 Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/N1CKWEB/FitCompras-Eccomerce.git
   ```
2. **Configurar la base de datos**:
   - Crear una base de datos en MySQL llamada `fitcompras`.
   - Importar el esquema y datos iniciales desde el archivo `database/fitcompras.sql`.
3. **Configurar el archivo de propiedades**:
   - En el archivo `src/main/resources/application.properties`, actualizar las credenciales de la base de datos según tu configuración local.
4. **Compilar y ejecutar la aplicación**:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

## 📸 Capturas de Pantalla

![Página Principal](img/homepage.png)
*Pantalla de inicio mostrando las categorías destacadas.*

![Carrito de Compras](img/cart.png)
*Vista del carrito de compras con productos seleccionados.*

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si deseas colaborar:

1. Realiza un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Agregar nueva funcionalidad'`).
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request detallando tus modificaciones.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Contacto

Para consultas o sugerencias, puedes contactarnos a través de:

- **Correo Electrónico**: soporte@fitcompras.com
- **LinkedIn**: [FitCompras](https://www.linkedin.com/company/fitcompras)
- **Sitio Web**: [www.fitcompras.com](https://www.fitcompras.com)
