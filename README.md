# ADUCMA - Landing Page

Landing page para **ADUCMA** (Asociación Civil por el Cuidado Ambiental y los Derechos de los Animales).

## 🌿 Descripción

Sitio web institucional para una asociación civil de Córdoba, Argentina, dedicada a la defensa de los derechos de consumidores, la protección animal y la defensa del medio ambiente.

## 🛠️ Tecnologías

### Frontend
- **React 18** (Vite)
- **Tailwind CSS**
- **React Router DOM**
- **Swiper** (carruseles)

### Backend
- **Node.js** + **Express**
- **MongoDB Atlas**
- **JWT** (autenticación)
- **PM2** (gestión de procesos)

### Infraestructura
- **Frontend**: Vercel
- **Backend**: Digital Ocean (167.172.31.249:5002)
- **Base de datos**: MongoDB Atlas

## 🎨 Paleta de Colores

| Color | Código | Uso |
|-------|--------|-----|
| Verde | `#318223` | Color principal |
| Verde Light | `#4a9e3a` | Acentos y hovers |
| Verde Dark | `#256619` | Variante oscura |
| Crema | `#ebe7df` | Fondos claros |
| Crema Light | `#f5f3ed` | Fondos secundarios |
| Dorado | `#765912` | Acentos (adhesiones) |

## 📁 Estructura del Proyecto

```
aducma/
├── public/
│   ├── video-hero-desktop.mp4
│   ├── video-hero-mobile.mp4
│   └── images/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── QueHacemos.jsx
│   │   ├── ComoTeAyudamos.jsx
│   │   ├── Contacto.jsx
│   │   ├── Novedades.jsx
│   │   ├── Cursos.jsx
│   │   ├── modals/
│   │   │   ├── ModalContacto.jsx
│   │   │   ├── ModalDenuncia.jsx
│   │   │   └── ModalAdhesion.jsx
│   │   └── ui/
│   │       ├── MagicContainer.jsx
│   │       └── Masonry.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── InscripcionesAdmin.jsx
│   │   ├── AdhesionesAdmin.jsx
│   │   └── ContenidoModal.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── backend/
│   ├── server.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Novedad.js
│   │   ├── Curso.js
│   │   ├── Inscripcion.js
│   │   └── Adhesion.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── novedades.js
│   │   ├── cursos.js
│   │   ├── inscripciones.js
│   │   └── adhesiones.js
│   └── middleware/
│       └── auth.js
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## 📄 Secciones Públicas

### 1. Hero
- Video de fondo responsive (desktop/mobile)
- Título y subtítulo animados
- Botón de contacto
- Indicador de scroll animado

### 2. Quiénes Somos (About)
- Swiper carrusel con efecto reveal
- 3 tarjetas: Misión, Visión, Valores
- Animaciones de entrada al scroll

### 3. Qué Hacemos
- Imagen de fondo con efecto parallax
- Glassmorphism en las cards
- 4 ejes de trabajo con iconos

### 4. Cómo Te Ayudamos
- Galería Masonry interactiva
- Imágenes en blanco/negro → color al hover
- 4 pasos del proceso

### 5. Novedades
- Listado de noticias desde MongoDB
- Diseño de tarjetas responsive

### 6. Cursos
- Listado de cursos/talleres
- Modal de inscripción integrado

### 7. Contacto
- 3 tarjetas interactivas:
  - **Contacto general**: Formulario de consultas
  - **Realizar denuncia**: Formulario categorizado (consumidores, ambiente, animales)
  - **Quiero adherirme**: Formulario de adhesión a la ONG
- Modales con validación y estados de carga

### 8. Footer
- Logo y descripción
- Links de navegación
- Redes sociales (Facebook, Instagram, WhatsApp)
- Créditos de desarrollo

## 🔐 Panel de Administración

### Acceso
- **URL**: `/admin`
- **Autenticación**: JWT

### Funcionalidades

#### Dashboard (`/dashboard`)
- Gestión de Novedades (CRUD)
- Gestión de Cursos (CRUD)
- Acceso a Inscripciones
- Acceso a Adhesiones

#### Inscripciones (`/dashboard/inscripciones`)
- Ver inscripciones a cursos
- Datos: nombre, email, teléfono, curso
- Acciones: WhatsApp, Email, Eliminar

#### Adhesiones (`/dashboard/adhesiones`)
- Ver solicitudes de adhesión
- Datos: nombre, email, teléfono, ciudad, mensaje
- Acciones: WhatsApp, Email, Eliminar

## 🗄️ API Endpoints

### Autenticación
```
POST /api/auth/login
```

### Novedades
```
GET    /api/novedades         # Públicas (activas)
GET    /api/novedades/todas   # Todas (admin)
POST   /api/novedades         # Crear (admin)
PUT    /api/novedades/:id     # Editar (admin)
DELETE /api/novedades/:id     # Eliminar (admin)
```

### Cursos
```
GET    /api/cursos            # Públicos (activos)
GET    /api/cursos/todas      # Todos (admin)
POST   /api/cursos            # Crear (admin)
PUT    /api/cursos/:id        # Editar (admin)
DELETE /api/cursos/:id        # Eliminar (admin)
```

### Inscripciones
```
POST   /api/inscripciones     # Crear (público)
GET    /api/inscripciones     # Listar (admin)
DELETE /api/inscripciones/:id # Eliminar (admin)
```

### Adhesiones
```
POST   /api/adhesiones        # Crear (público)
GET    /api/adhesiones        # Listar (admin)
DELETE /api/adhesiones/:id    # Eliminar (admin)
```

## ⚙️ Instalación

### Frontend
```bash
# Clonar repositorio
git clone [repo-url]
cd aducma

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar VITE_API_URL

# Iniciar desarrollo
npm run dev

# Build producción
npm run build
```

### Backend
```bash
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar MONGO_URI, JWT_SECRET, PORT

# Iniciar con PM2
pm2 start server.js --name aducma-api

# Ver logs
pm2 logs aducma-api
```

## 🔧 Variables de Entorno

### Frontend (`.env`)
```env
VITE_API_URL=http://167.172.31.249:5002
```

### Backend (`.env`)
```env
PORT=5002
MONGO_URI=mongodb+srv://[user]:[pass]@cluster.mongodb.net/aducma
JWT_SECRET=tu_secreto_jwt
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deploy

### Frontend (Vercel)
1. Conectar repositorio a Vercel
2. Configurar variable `VITE_API_URL`
3. Deploy automático en push a main

### Backend (Digital Ocean)
```bash
# SSH al servidor
ssh root@167.172.31.249

# Ir al proyecto
cd /var/www/aducma/backend

# Pull cambios
git pull origin main

# Reiniciar
pm2 restart aducma-api
```

### Dominio
- **Producción**: https://aducma.org.ar
- **API**: http://167.172.31.249:5002

## 📞 Contacto ADUCMA

- **Dirección**: Virgen Stella Maris 4474, Córdoba, Argentina
- **Teléfono**: 351 730 0674
- **Email**: aducmaasociacion@gmail.com
- **Facebook**: /aducma
- **Instagram**: @aducma_ong

## 📝 Notas Técnicas

- El efecto parallax solo funciona en desktop (≥1024px)
- Los videos del Hero deben estar en formato MP4
- Las animaciones usan IntersectionObserver
- CORS configurado para localhost y dominio producción
- Autenticación con JWT (24h expiración)

## 🔄 Historial de Cambios

### v2.0.0
- Sistema de adhesiones (formulario + admin)
- Refactor de Contacto en componentes modulares
- Panel de administración mejorado
- Fix altura Masonry

### v1.0.0
- Landing page inicial
- Sistema de novedades y cursos
- Panel de administración básico
- Deploy en Vercel + Digital Ocean

---

Desarrollado con 💚 para ADUCMA