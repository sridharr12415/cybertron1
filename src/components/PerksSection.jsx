import { Utensils, Coffee, BarChart3, Swords } from 'lucide-react';

const perks = [
  {
    icon: Utensils,
    title: 'Dinner Provided',
    description: 'Fuel up for the battle',
  },
  {
    icon: Coffee,
    title: '8 Tea Breaks',
    description: 'Stay caffeinated',
  },
  {
    icon: BarChart3,
    title: 'Live Leaderboard',
    description: 'Track your progress',
  },
  {
    icon: Swords,
    title: 'Continuous Challenges',
    description: 'Non-stop action',
  },
];

const PerksSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <p className="font-mono text-matrix-green mb-2">[OPERATOR BENEFITS]</p>
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-foreground mb-4">
            PERKS & AMENITIES
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-matrix-green to-transparent mx-auto" />
        </div>

        {/* Perks Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {perks.map((perk, index) => {
            const Icon = perk.icon;
            
            return (
              <div
                key={index}
                className="group glass-card rounded-xl p-6 text-center hover-lift cursor-pointer"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-matrix-green/20 flex items-center justify-center group-hover:bg-matrix-green/30 transition-colors">
                  <Icon className="w-8 h-8 text-matrix-green group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-orbitron text-lg font-bold text-primary mb-2">
                  {perk.title}
                </h3>
                <p className="font-mono text-sm text-muted-foreground">
                  {perk.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PerksSection;
