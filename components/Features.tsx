import React, { useRef } from 'react';
import { useScrollReveal } from '../hooks/useParallax';

const FEATURES = [
  {
    icon: 'hub',
    title: 'Indicação Guiada',
    description: 'A IA te diz exatamente o que perguntar e o que responder ao cliente, passo a passo.',
  },
  {
    icon: 'handshake',
    title: 'Comissão Garantida',
    description: 'Cada cliente aprovado gera comissão fixa. Você indica, o projeto é feito, você recebe.',
  },
  {
    icon: 'bolt',
    title: 'Zero Responsabilidade Técnica',
    description: 'Você não programa, não negocia preço e não fala de prazo. Só conecta o cliente certo.',
  },
];

const FeatureCard: React.FC<{ feature: typeof FEATURES[0]; index: number }> = ({ feature, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isVisible } = useScrollReveal(ref);

  return (
    <div
      ref={ref}
      className={`glass-effect bg-white/50 dark:bg-white/5 p-8 rounded-2xl border border-primary/10 dark:border-white/10 flex flex-col gap-4 hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-700 group ${isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-16'
        }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <span className="material-symbols-outlined">{feature.icon}</span>
      </div>
      <h3 className="text-xl font-bold text-primary dark:text-white">{feature.title}</h3>
      <p className="text-primary/70 dark:text-gray-400 text-sm leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
};

export const Features: React.FC = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const { isVisible: titleVisible } = useScrollReveal(titleRef);

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-20 mt-40">
      <div
        ref={titleRef}
        className={`text-center mb-16 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary dark:text-white">
          A Central do Afiliado
        </h2>
        <p className="text-primary/60 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Indique projetos, siga o passo a passo da IA e ganhe por cada cliente aprovado.<br />
          <span className="font-medium">Sem vender. Sem prometer. Sem dor de cabeça.</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {FEATURES.map((feature, idx) => (
          <FeatureCard key={idx} feature={feature} index={idx} />
        ))}
      </div>
    </section>
  );
};