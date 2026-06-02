import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import '../../styles/Pricing.css';

/**
 * Section Tarifs - Présente les différents plans d'abonnement
 */
const Pricing = () => {
  const plans = [
    {
      name: 'Gratuit',
      price: '0€',
      description: 'Parfait pour explorer notre technologie.',
      features: ['3 voix personnalisées', '10 min d\'audio/mois', 'Qualité standard', 'Support communautaire']
    },
    {
      name: 'Pro',
      price: '5€',
      description: 'Pour les créateurs et les professionnels.',
      features: ['Voix illimitées', '10 heures d\'audio/mois', 'Qualité Studio', 'Support prioritaire', 'Droits commerciaux'],
      popular: true
    },
    {
      name: 'Entreprise',
      price: 'Sur devis',
      description: 'Fonctionnalités avancées pour les grandes équipes.',
      features: ['Intégration personnalisée', 'Audio illimité', 'Support dédié', 'Option On-premise', 'Garantie SLA']
    }
  ];

  return (
    <section id="pricing" className="pricing-section section-padding bg-secondary coming-soon-overlay">
      <div className="container" style={{ opacity: 0.5, pointerEvents: 'none' }}>
        {/* En-tête */}
        <div className="section-header text-center">
          <span className="badge">Prochainement</span>
          <h2>Une tarification simple et transparente</h2>
          <p className="text-secondary">Choisissez le plan qui correspond à vos besoins.</p>
        </div>

        {/* Grille des tarifs */}
        <div className="pricing-grid">
          {plans.map((plan, i) => (
            <motion.div 
              key={plan.name}
              className={`pricing-card ${plan.popular ? 'popular' : ''}`}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {plan.popular && <span className="popular-badge">Le plus populaire</span>}
              <div className="plan-header">
                <h3>{plan.name}</h3>
                <div className="plan-price">
                  <span className="amount">{plan.price}</span>
                  {plan.price !== 'Sur devis' && <span className="period">/mois</span>}
                </div>
                <p className="text-secondary">{plan.description}</p>
              </div>
              
              {/* Liste des fonctionnalités */}
              <ul className="plan-features">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <FiCheck className="icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Bouton d'action */}
              <div className={`btn-plan ${plan.popular ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5, cursor: 'not-allowed' }}>
                {plan.name === 'Entreprise' ? 'Contacter les ventes' : 'Commencer'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/*<div className="future-badge">Indisponible</div>*/}
    </section>
  );
};

export default Pricing;
