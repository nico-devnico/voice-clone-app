import "../App.css"

function Hero() {
  return (
    <section className="hero">
      <span>
        Voice Cloning Platform
      </span>

      <h1>
        Créez des voix IA
        naturellement humaines.
      </h1>

      <p>
        Clonage vocal et synthèse
        de parole en quelques secondes.
      </p>

      <div className="hero-actions">
        <button>
          Essayer gratuitement
        </button>

        <button className="secondary">
          Voir la démo
        </button>
      </div>
    </section>
  );
}

export default Hero;