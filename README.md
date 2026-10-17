# JDM Tuning Store – Tarea 5: autenticación con JSON Web Tokens

- **Frontend (Netlify):** https://tr5dw.netlify.app/
- **Backend (Render):** https://tarea1-ytwb.onrender.com
- **Rama:** `Tarea5`

Esta tarea consiste en proteger la aplicación con JSON Web Tokens (JWT), para que solo puedan usarla las personas que iniciaron sesión. Cuando el usuario escribe su correo y contraseña correctos, el servidor le entrega un token. Ese token funciona como un pase de acceso y dura exactamente 5 minutos.
si el token ya pasó sus 5 minutos o no se envió, el servidor responde 401 Unauthorized

La aplicación cliente gestiona los rechazos mediante un interceptor global configurado en Axios (`src/api.js`). Cuando este interceptor detecta un error 401 proveniente de una ruta protegida, dispara un manejador de estado que:
1. Elimina inmediatamente el token almacenado en el `localStorage`.
2. Renderiza un componente modal informando que la sesión ha caducado.
3. Ejecuta una redirección automática hacia la ruta `/login` utilizando `useNavigate` de React Router.

Desarrollado por José Eduardo Salguero Aquino 9490-19-456
