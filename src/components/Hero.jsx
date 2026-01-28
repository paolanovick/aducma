const Hero = () => {
  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
      
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
        className="absolute inset-0 w-full h-full object-cover hidden md:block lg:hidden"
      >
        <source src="/video-hero-tablet.mp4" type="video/mp4" />
      </video>

      {/* VIDEO MOBILE - celulares */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover md:hidden"
      >
        <source src="/video-hero-mobile.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* CONTENIDO */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
          ADUCMA
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
          Asociación Civil por el Cuidado Ambiental y los Derechos de los Animales
        </p>
        <a 
          href="#contacto" 
          className="inline-block bg-verde px-8 py-3 rounded-full font-semibold hover:bg-verde-light transition-colors"
        >
          Contactanos
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;