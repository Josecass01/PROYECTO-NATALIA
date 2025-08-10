# Feliz Cumpleaños, Mi Amor ❤️

Una página web especial de cumpleaños para Natalia, creada con amor y optimizada para el máximo rendimiento. Diseñada para celebrar su pasión por el arte y nuestros momentos especiales juntos.

## ✨ Características

- 🎨 **Diseño Artístico**: Inspirado en la pasión de Natalia por el dibujo
- 💕 **Temática Romántica**: Colores suaves y animaciones encantadoras
- 📱 **Completamente Responsivo**: Optimizado para todos los dispositivos
- ⚡ **Alto Rendimiento**: CSS y JS combinados < 75KB
- 🎵 **Experiencia Multimedia**: Galería interactiva con audio
- 🎭 **Animaciones Fluidas**: Efectos CSS optimizados para 60fps

## 🛠️ Stack Tecnológico

- **HTML5**: Estructura semántica y accesible
- **Tailwind CSS**: Framework CSS instalado localmente
- **JavaScript ES6+**: Interactividad moderna y optimizada
- **Swiper.js**: Carrusel de galería profesional
- **Google Fonts**: Typography premium (Dancing Script + Poppins)

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js (v14 o superior)
- npm (incluido con Node.js)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Josecass01/PROYECTO-NATALIA.git
   cd PROYECTO-NATALIA
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar el entorno de desarrollo**
   ```bash
   npm run dev
   ```
   Este comando iniciará Tailwind en modo watch para recompilar automáticamente los estilos.

4. **Abrir la página**
   - Abre `index.html` con Live Server en VS Code
   - O simplemente abre el archivo en tu navegador

## 🎨 Cómo Personalizar

### 📸 Reemplazar Imágenes

1. Ve a la carpeta `public/images/`
2. Reemplaza los archivos placeholder manteniendo los nombres:
   - `photo1_placeholder.jpg` hasta `photo10_placeholder.jpg`
   - Mantén el formato 800x800px para mejor rendimiento
   - Formatos recomendados: JPG (fotos) o PNG (gráficos)

### 🎵 Agregar Música

1. Ve a la carpeta `public/music/`
2. Reemplaza los archivos placeholder:
   - `main_song_placeholder.mp3` (canción principal de la carta)
   - `track1_placeholder.mp3` hasta `track10_placeholder.mp3`
   - Formato recomendado: MP3 (mejor compatibilidad)

### ✏️ Editar Textos

1. Abre `index.html`
2. Busca las secciones a modificar:
   - **Títulos principales**: Líneas 31-36
   - **Descripciones de fotos**: Dentro de cada `.flip-card-back`
   - **Carta de amor**: Sección `#letter-modal` (líneas 120-180)

### 🎨 Personalizar Colores

1. Abre `tailwind.config.js`
2. Modifica los colores en la sección `theme.extend.colors`:
   ```javascript
   colors: {
     'soft-purple': '#D8BFD8',    // Púrpura suave
     'serene-blue': '#87CEEB',    // Azul sereno
     'pearl-white': '#F5F5F5',    // Blanco perla
     'pastel-pink': '#FFC1CC',    // Rosa pastel
     'light-gold': '#FFD700',     // Oro claro
   }
   ```

### 🔤 Cambiar Fuentes

1. En `tailwind.config.js`, modifica:
   ```javascript
   fontFamily: {
     'sans': ['Poppins', 'sans-serif'],           // Texto general
     'display': ['Dancing Script', 'cursive'],    // Títulos decorativos
   }
   ```
2. Actualiza el enlace de Google Fonts en `index.html` (línea 16)

## 🏗️ Build y Despliegue

### Generar Archivos de Producción

```bash
npm run build
```

Este comando:
- Compila Tailwind CSS
- Minifica el archivo `styles.css`
- Purga clases CSS no utilizadas
- Optimiza para producción

### Desplegar en Vercel

1. **Preparar para despliegue**
   ```bash
   npm run build
   ```

2. **Subir a GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

3. **Configurar Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Conecta tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto estático
   - No necesita configuración adicional de build

4. **¡Listo!** Tu página estará disponible en una URL personalizada

## 📁 Estructura del Proyecto

```
proyecto-natalia/
├── public/
│   ├── images/              # Fotos de la galería (10 placeholders)
│   │   ├── photo1_placeholder.jpg
│   │   └── ...
│   └── music/               # Archivos de audio (10 placeholders)
│       ├── main_song_placeholder.mp3
│       └── ...
├── index.html               # Página principal
├── script.js               # Lógica JavaScript
├── styles.css              # CSS compilado (generado)
├── input.css               # CSS fuente para Tailwind
├── package.json            # Dependencias del proyecto
├── tailwind.config.js      # Configuración de Tailwind
└── README.md              # Esta documentación
```

## 🎯 Funcionalidades Principales

### 🖼️ Galería Interactiva
- Carrusel automático con Swiper.js
- Tarjetas flip en 3D al hacer clic
- Audio individual por foto
- Navegación táctil y por botones

### 💌 Carta de Amor
- Modal elegante con animaciones
- Texto personalizable
- Audio de fondo
- Cierre con ESC o clic externo

### ✨ Animaciones
- Efecto de escritura en el título
- Partículas flotantes (corazones, estrellas)
- Animaciones de entrada suaves
- Hover effects en botones

### 🎵 Sistema de Audio
- Control automático (un audio a la vez)
- Pausa inteligente durante interacciones
- Reproductores HTML5 nativos

## 🔧 Optimizaciones de Rendimiento

- **CSS Minificado**: < 50KB en producción
- **JavaScript Optimizado**: < 25KB total
- **Lazy Loading**: Imágenes cargadas bajo demanda
- **Preconnect**: Fonts cargadas eficientemente
- **Transform/Opacity**: Animaciones optimizadas para GPU

## 💡 Tips y Consejos

1. **Imágenes**: Usa herramientas como TinyPNG para optimizar el peso
2. **Audio**: Convierte a MP3 con bitrate 128kbps para balance calidad/peso
3. **Personalización**: Usa las clases de Tailwind existentes antes de agregar CSS custom
4. **Testing**: Prueba en diferentes dispositivos y navegadores

## ❤️ Créditos

Hecho con todo el amor del mundo para Natalia.
Un proyecto especial para celebrar su cumpleaños y su pasión por el arte.

---

*"Cada línea de código está escrita con amor, cada animación diseñada con cariño, cada detalle pensado para hacerte sonreír."* 💕
