import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';
import '../../styles/FAQ.css';

/**
 * Composant FAQItem - Gère l'état d'ouverture d'une seule question
 */
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
      <div className="faq-question">
        <h3>{question}</h3>
        {isOpen ? <FiMinus /> : <FiPlus />}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="faq-answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-secondary">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * Section FAQ - Foire Aux Questions
 * Présentation minimaliste avec accordéons fluides.
 */
const FAQ = () => {
  const faqs = [
    {
      question: "Combien de temps faut-il pour cloner une voix ?",
      answer: "Grâce à notre technologie neuronale avancée, vous n'avez besoin que de 30 à 60 secondes d'audio de référence pour créer un clone numérique de haute qualité. Le traitement prend moins d'une minute."
    },
    {
      question: "Quelles langues sont supportées ?",
      answer: "Nous supportons actuellement plus de 20 langues, dont le français, l'anglais, l'espagnol, l'allemand, le chinois, le japonais et bien d'autres. Nos voix conservent des accents natifs dans toutes les langues."
    },
    {
      question: "Puis-je utiliser l'audio généré à des fins commerciales ?",
      answer: "Oui, les utilisateurs de nos forfaits Pro et Enterprise disposent de tous les droits commerciaux sur l'audio qu'ils génèrent. Les utilisateurs du forfait Gratuit peuvent utiliser l'audio pour des projets personnels non commerciaux."
    },
    {
      question: "Mes données vocales sont-elles sécurisées ?",
      answer: "Absolument. Nous utilisons des protocoles de sécurité et de cryptage conformes aux normes de l'industrie. Vos données vocales sont privées et ne sont jamais utilisées pour entraîner nos modèles de base sans votre consentement explicite."
    }
  ];

  return (
    <section id="faq" className="faq-section section-padding bg-primary">
      <div className="container">
        <div className="section-header text-center">
          <span className="badge">Questions</span>
          <h2>Questions Fréquemment Posées</h2>
          <p className="text-secondary">Tout ce que vous devez savoir sur VoiceClone AI.</p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, i) => (
            <FAQItem key={i} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
