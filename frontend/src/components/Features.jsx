import "../App.css";

const data = [
  {
    title:"Clonage vocal",
    text:"Clonez une voix en quelques secondes."
  },
  {
    title:"Multi-langues",
    text:"Parlez dans plusieurs langues."
  },
  {
    title:"Temps réel",
    text:"Génération rapide."
  }
];

function Features() {
  return (
    <section
      id="features"
      className="features"
    >
      {data.map((item,index)=>(
        <article key={index}>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </section>
  );
}

export default Features;