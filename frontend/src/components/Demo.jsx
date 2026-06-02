import "../App.css";

function Demo() {
  return (
    <section className="demo">
      <h2>
        Essayez maintenant
      </h2>

      <textarea
        placeholder="Entrez un texte..."
      />

      <button>
        Générer l'audio
      </button>
    </section>
  );
}

export default Demo;