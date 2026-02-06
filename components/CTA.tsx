import React from 'react';

export const CallToAction: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-20 mt-40">
      <div className="bg-primary rounded-3xl p-12 md:p-20 relative overflow-hidden group">
        <div 
          className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity duration-500" 
          style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}
        ></div>
        
        <div className="relative z-10 text-center max-w-3xl mx-auto flex flex-col items-center gap-8">
          <h2 className="text-4xl md:text-6xl font-bold text-white">Pronto para elevar seu desenvolvimento?</h2>
          <p className="text-white/70 text-lg">
            Experimente o CodeWork gratuitamente por 14 dias. Sem cartão de crédito necessário.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
            <button className="bg-white text-primary px-10 py-4 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-colors shadow-lg shadow-black/20">
              Começar Trial Grátis
            </button>
            <button className="border border-white/20 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors">
              Falar com Vendas
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};