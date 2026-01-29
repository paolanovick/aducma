const Hero = () => {
  return (
    <section id="inicio" className="relative h-screen flex items-end justify-center overflow-hidden">
      
      {/* VIDEO DESKTOP - pantallas grandes */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover hidden lg:block"
      >
        <source src="/video-hero-desktop.mp4" type="video/mp4" />
      </video>

      {/* VIDEO TABLET - pantallas medianas */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover hidden sm:block lg:hidden"
      >
        <source src="/video-hero-tablet.mp4" type="video/mp4" />
      </video>

      {/* VIDEO MOBILE - celulares */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover sm:hidden"
      >
        <source src="/video-hero-mobile.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* CONTENIDO - abajo de la pantalla */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto pb-24 sm:pb-28 md:pb-32">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
          ADUCMA
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
          Asociación Civil por el Cuidado Ambiental y los Derechos de los Animales
        </p>
         <p className="text-sm sm:text-base md:text-lg mb-6 text-white/80 max-w-3xl mx-auto leading-relaxed">
          Trabajamos por la defensa de consumidores y usuarios, la protección del ambiente y el respeto por todas las formas de vida. Promovemos acciones de concientización, defensa y acompañamiento frente a situaciones de vulneración de derechos, daño ambiental y maltrato animal.
        </p>
        <a 
          href="#contacto" 
          className="inline-block bg-verde px-8 py-3 rounded-full font-semibold hover:bg-verde-light transition-colors"
        >
          Contactanos
        </a>
      </div>

      {/* Scroll indicator */}
      
    </section>
  );
};

export default Hero;