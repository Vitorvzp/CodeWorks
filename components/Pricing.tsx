import React, { useRef } from 'react';
import { useScrollReveal } from '../hooks/useParallax';

const plans = [
    {
        name: 'Starter',
        price: 'Grátis',
        description: 'Perfeito para começar',
        features: [
            '5 projetos',
            '1.000 completions/mês',
            'Suporte via email',
            'Extensões básicas',
        ],
        cta: 'Começar Grátis',
        popular: false,
    },
    {
        name: 'Pro',
        price: 'R$ 49',
        period: '/mês',
        description: 'Para desenvolvedores sérios',
        features: [
            'Projetos ilimitados',
            '50.000 completions/mês',
            'Suporte prioritário',
            'Todas as extensões',
            'Refatoração automática',
            'Análise de segurança',
        ],
        cta: 'Começar Trial',
        popular: true,
    },
    {
        name: 'Enterprise',
        price: 'Sob consulta',
        description: 'Para times e empresas',
        features: [
            'Tudo do Pro',
            'Completions ilimitadas',
            'SSO & SAML',
            'SLA garantido',
            'Treinamento dedicado',
            'Deploy on-premise',
        ],
        cta: 'Falar com Vendas',
        popular: false,
    },
];

export const Pricing: React.FC = () => {
    const titleRef = useRef<HTMLDivElement>(null);
    const { isVisible: titleVisible } = useScrollReveal(titleRef);

    return (
        <section className="max-w-7xl mx-auto px-6 md:px-20 py-32">
            <div
                ref={titleRef}
                className={`text-center mb-16 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
            >
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary dark:text-white">
                    Preços Simples
                </h2>
                <p className="text-primary/60 dark:text-gray-400 max-w-2xl mx-auto">
                    Escolha o plano ideal para você. Sem taxas escondidas, sem surpresas.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan, idx) => (
                    <PricingCard key={idx} plan={plan} index={idx} />
                ))}
            </div>
        </section>
    );
};

const PricingCard: React.FC<{ plan: typeof plans[0]; index: number }> = ({ plan, index }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { isVisible } = useScrollReveal(ref);

    return (
        <div
            ref={ref}
            className={`relative p-8 rounded-3xl transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                } ${plan.popular
                    ? 'bg-primary text-white scale-105 shadow-2xl shadow-primary/20'
                    : 'glass-effect bg-white/50 dark:bg-white/5 border border-primary/10 dark:border-white/10'
                }`}
            style={{ transitionDelay: `${index * 150}ms` }}
        >
            {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-primary text-sm font-bold rounded-full shadow-lg">
                    Mais Popular
                </div>
            )}

            <div className="text-center mb-8">
                <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-primary dark:text-white'}`}>
                    {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                    <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-primary dark:text-white'}`}>
                        {plan.price}
                    </span>
                    {plan.period && (
                        <span className={plan.popular ? 'text-white/70' : 'text-primary/60 dark:text-gray-400'}>
                            {plan.period}
                        </span>
                    )}
                </div>
                <p className={`mt-2 text-sm ${plan.popular ? 'text-white/70' : 'text-primary/60 dark:text-gray-400'}`}>
                    {plan.description}
                </p>
            </div>

            <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                        <span className={`material-symbols-outlined text-lg ${plan.popular ? 'text-white' : 'text-primary dark:text-white'}`}>
                            check_circle
                        </span>
                        <span className={`text-sm ${plan.popular ? 'text-white/90' : 'text-primary/80 dark:text-gray-300'}`}>
                            {feature}
                        </span>
                    </li>
                ))}
            </ul>

            <button
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] ${plan.popular
                        ? 'bg-white text-primary hover:bg-gray-100'
                        : 'bg-primary text-white hover:bg-primary/90 dark:bg-white dark:text-primary dark:hover:bg-gray-100'
                    }`}
            >
                {plan.cta}
            </button>
        </div>
    );
};
