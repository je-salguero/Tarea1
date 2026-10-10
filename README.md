Netlify: https://tr4dw.netlify.app/
Render: https://tarea1-ytwb.onrender.com

En esta fase se llevó a cabo el paso a producción de la aplicación **JDM Tuning Store** (Stack MERN), logrando la comunicación exitosa entre el cliente y el servidor en la nube:
Tarea complicada jajaja pero se logró

Diagrama o resumen de la arquitectura de carpetas del backend:

jdm-backend/
├── config/              # Configuración de conexión a la base de datos MongoDB Atlas
├── controllers/         # Lógica de negocio (authController, piezaController, usuarioController)
├── middleware/          # Validaciones intermedias y protección de rutas con JWT
├── models/              # Esquemas de datos de Mongoose (User, Pieza)
├── routes/              # Definición de endpoints de la API REST
├── .env                 # Variables de entorno ocultas (PORT, MONGO_URI, JWT_SECRET)
├── package.json         # Dependencias del proyecto
└── server.js            # Punto de entrada principal de la aplicación Express

Desarrollado por José Eduardo Salguero Aquino 9490-19-456
