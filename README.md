# 🎬 CineVerse

CineVerse es una aplicación web **responsiva** inspirada en plataformas de streaming, que permite a los usuarios explorar **películas y series populares, en tendencia y próximos estrenos**.

---

## 🔗 Demo & Repositorio

- [🌐 Demo en vivo](https://cine-verse-app-lovat.vercel.app/signIn)  
- [💻 Código en GitHub](https://github.com/Srwolf2000/Cine-Verse)

---

## 🚀 Características principales

- 🔑 **Autenticación de usuarios** (login con validación de formularios).  
- 🎥 **Exploración de contenido**: películas populares, trending, próximos estrenos y series.   
- 🌍 **Cambio de idioma** (ES / EN).  
- 📱 **Diseño 100% responsivo** para desktop, tablet y móvil.  
- 📊 **Gestión global del estado** con Redux Toolkit.  
- 🖼️ **Vista de detalles** de películas con modal interactivo y recomendaciones similares.  

---

## 🛠️ Tecnologías utilizadas

- **Frontend**: React, Redux Toolkit, React Router  
- **Estilos**: Tailwind CSS  
- **API**: [The Movie Database (TMDb)](https://www.themoviedb.org/)  
- **Cliente HTTP**: Axios  
- **Deploy**: Vercel  

---

## ⚙️ Instalación y uso

1. **Clonar el repositorio**  
   git clone https://github.com/Srwolf2000/Cine-Verse.git
Entrar en la carpeta del proyecto

cd Cine-Verse
Instalar dependencias

npm install

npm run dev
Abrir en el navegador
http://localhost:5173

📸 Capturas de pantalla
![Login](/public/screenshots/login.png)
![Home](/public/screenshots/home.png)
![Home-SECTION](/public/screenshots/home.seccion.png)
![Detalle](/public/screenshots/detail.png)
![PROFILE](/public/screenshots/profile.png)

Detalle de película

📂 Estructura del proyecto
text
Copy code
Cine-Verse/
 ├── src/
 │   ├── components/   # Componentes reutilizables (cards, modals, sliders)
 │   ├── features/     # Redux slices
 │   ├── pages/        # Páginas principales (Home, Login, Movies, Shows)
 │   ├── router/       # Configuración de rutas
 │   └── App.jsx
 ├── public/           # Recursos estáticos (capturas, imágenes)
 ├── package.json
 └── README.md
✨ Aprendizajes
Este proyecto me permitió:

Implementar un flujo completo de autenticación de usuarios.

Optimizar la gestión del estado global con Redux Toolkit.

Aplicar buenas prácticas en arquitectura de proyectos React.

Profundizar en el consumo de APIs REST y manejo de errores.

Mejorar la experiencia de usuario con internacionalización y modo oscuro/claro.

📜 Licencia
Este proyecto está bajo la licencia MIT.

👤 Autor
Johan Stiven Restrepo Zapata
📍 Medellín, Colombia
📧 srestrepoz2000@gmail.com


