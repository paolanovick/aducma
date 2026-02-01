const Hero = () => {
  return (
    <section id="inicio" className="relative h-screen overflow-hidden">
      
      {/* VIDEO DESKTOP */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover hidden lg:block"
      >
        <source src="/video-hero-desktop2.mp4" type="video/mp4" />
      </video>

      {/* VIDEO TABLET */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover hidden sm:block lg:hidden"
      >
        <source src="/video-hero-tablet2.mp4" type="video/mp4" />
      </video>

      {/* VIDEO MOBILE */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover sm:hidden"
      >
        <source src="/video-hero-mobile2.mp4" type="video/mp4" />
      </video>

      {/* Solo el botón */}
      <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-10">
        <a 
          href="#contacto" 
          className="inline-block bg-verde text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-verde-light transition-colors drop-shadow-lg text-sm sm:text-base"
        >
          Contactanos
        </a>
      </div>
    </section>
  );
};

export default Hero;