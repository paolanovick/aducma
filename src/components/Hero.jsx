const Hero = () => {
  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video de fondo */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video-hero.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/5"></div>
      
      {/* Contenido */}
      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">ADUCMA</h1>
        <p className="text-xl md:text-2xl mb-8 text-white/90">
          Asociación Civil por el Cuidado Ambiental y los Derechos de los Animales
        </p>
        <a 
          href="#contacto" 
          className="inline-block bg-verde px-8 py-3 rounded-full font-semibold hover:bg-verde-light transition-colors"
        >
          Contactanos
        </a>
      </div>
    </section>
  );
};

export default Hero;