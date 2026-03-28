import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnalysis } from '@/context/AnalysisContext';
import { TREE_SPECIES, TreeSize } from '@/lib/data';
import { Input, Label } from '@/components/ui/Input';
import { 
  TreePine, Droplets, ThermometerSnowflake, Wind, 
  Coins, Map, Activity, BarChart3, Info
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell
} from 'recharts';

function Card({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-card border border-border/50 rounded-2xl p-5 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function ResultBadge({ icon: Icon, label, value, unit, colorClass }: any) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-background/50 border border-border/30">
      <div className={`p-2.5 rounded-lg ${colorClass}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground font-medium">{label}</p>
        <p className="text-base font-bold text-foreground">
          {value} <span className="text-xs font-normal text-muted-foreground">{unit}</span>
        </p>
      </div>
    </div>
  );
}

export function Sidebar() {
  const [activeTab, setActiveTab] = useState<'arbor' | 'water'>('arbor');
  const { 
    area, setArea, 
    speciesId, setSpeciesId, 
    treeSize, setTreeSize,
    rainfall, setRainfall,
    numGardens, setNumGardens,
    treesNeeded, tempReduction, co2Absorbed, totalCost,
    waterCaptured, waterPerGarden, runoffReduction, waterTanks
  } = useAnalysis();

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    // In this frontend-only app, state updates trigger reactivity instantly.
    // The button is mainly for UX satisfaction.
    const btn = document.getElementById('calc-btn');
    if(btn) {
      btn.classList.add('scale-95');
      setTimeout(() => btn.classList.remove('scale-95'), 150);
    }
  };

  // Chart Data
  const chartData = [
    { name: 'Mezquite', count: Math.ceil(area / TREE_SPECIES.mezquite.shadeArea.medium) },
    { name: 'Palo Verde', count: Math.ceil(area / TREE_SPECIES.paloverde.shadeArea.medium) },
    { name: 'Fresno', count: Math.ceil(area / TREE_SPECIES.fresno.shadeArea.medium) },
  ];

  const pieData = [
    { name: 'Captada', value: waterCaptured, color: 'hsl(var(--water))' },
    { name: 'Escurrimiento', value: Math.max((area * rainfall) - waterCaptured, 0), color: 'hsl(var(--muted-foreground))' },
  ];

  return (
    <div className="w-full md:w-[420px] lg:w-[480px] h-full flex flex-col bg-background border-r border-border shadow-2xl shadow-primary/5 z-10">
      
      {/* Header */}
      <div className="p-6 pb-4 relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative z-10 flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm border border-white/20">
            <LeafLogo className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold">Jardín de Lluvia</h1>
            <p className="text-primary-foreground/80 text-sm font-medium">Análisis de Arborización · Hermosillo</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-6 pt-6 gap-2">
        <button 
          onClick={() => setActiveTab('arbor')}
          className={`flex-1 py-3 px-4 text-sm font-bold rounded-t-xl border-b-2 transition-colors ${
            activeTab === 'arbor' 
              ? 'border-primary text-primary bg-primary/5' 
              : 'border-transparent text-muted-foreground hover:bg-muted'
          }`}
        >
          <TreePine className="w-4 h-4 inline-block mr-2" />
          Arborización
        </button>
        <button 
          onClick={() => setActiveTab('water')}
          className={`flex-1 py-3 px-4 text-sm font-bold rounded-t-xl border-b-2 transition-colors ${
            activeTab === 'water' 
              ? 'border-water text-water bg-water/5' 
              : 'border-transparent text-muted-foreground hover:bg-muted'
          }`}
        >
          <Droplets className="w-4 h-4 inline-block mr-2" />
          Microclima
        </button>
      </div>

      {/* Content Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth">
        
        {/* Global Input (Area) - Shared between tabs */}
        <Card className="bg-gradient-to-br from-background to-muted/50">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-display font-semibold text-lg flex items-center gap-2">
                <Map className="w-5 h-5 text-primary" />
                Zona de Intervención
              </h3>
              <p className="text-sm text-muted-foreground">Define el área a intervenir en el mapa o ingresa el valor.</p>
            </div>
          </div>
          
          <div>
            <Label htmlFor="area">Área Total (m²)</Label>
            <div className="relative">
              <Input 
                id="area" 
                type="number" 
                value={area} 
                onChange={(e) => setArea(Number(e.target.value) || 0)} 
                className="pl-4 pr-12 text-lg font-semibold"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">m²</span>
            </div>
          </div>
        </Card>

        <form onSubmit={handleCalculate}>
          <AnimatePresence mode="wait">
            {activeTab === 'arbor' ? (
              <motion.div 
                key="arbor"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Inputs */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Especie de Árbol</Label>
                    <select 
                      value={speciesId}
                      onChange={(e) => setSpeciesId(e.target.value)}
                      className="w-full h-11 rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all cursor-pointer"
                    >
                      {Object.values(TREE_SPECIES).map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label>Tamaño Esperado</Label>
                    <select 
                      value={treeSize}
                      onChange={(e) => setTreeSize(e.target.value as TreeSize)}
                      className="w-full h-11 rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all cursor-pointer"
                    >
                      <option value="small">Pequeño (1-3 años)</option>
                      <option value="medium">Mediano (3-10 años)</option>
                      <option value="large">Grande (+10 años)</option>
                    </select>
                  </div>
                </div>

                <button 
                  id="calc-btn"
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                >
                  Actualizar Análisis
                </button>

                {/* Results */}
                <div>
                  <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    Resultados Proyectados
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <ResultBadge 
                      icon={TreePine} 
                      label="Árboles Necesarios" 
                      value={treesNeeded} 
                      unit="unidades"
                      colorClass="bg-leaf/10 text-leaf" 
                    />
                    <ResultBadge 
                      icon={ThermometerSnowflake} 
                      label="Reducción Temp." 
                      value={`-${tempReduction.toFixed(1)}`} 
                      unit="°C max"
                      colorClass="bg-blue-500/10 text-blue-600" 
                    />
                    <ResultBadge 
                      icon={Wind} 
                      label="Absorción CO2" 
                      value={co2Absorbed.toLocaleString()} 
                      unit="kg/año"
                      colorClass="bg-emerald-500/10 text-emerald-600" 
                    />
                    <ResultBadge 
                      icon={Coins} 
                      label="Inversión Aprox." 
                      value={`$${totalCost.toLocaleString()}`} 
                      unit="MXN"
                      colorClass="bg-amber-500/10 text-amber-600" 
                    />
                  </div>
                </div>

                {/* Chart */}
                <Card className="pt-6">
                  <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-muted-foreground" />
                    Comparativa: Árboles por Especie (Medianos)
                  </h4>
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                        <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

              </motion.div>
            ) : (
              <motion.div 
                key="water"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Context Alert */}
                <div className="bg-water/10 border border-water/20 rounded-xl p-4 flex gap-3">
                  <Info className="w-5 h-5 text-water shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Hermosillo recibe en promedio <strong className="text-water">350mm</strong> de lluvia al año. Implementar microclimas permite aprovechar esta agua antes de que se evapore o escurra.
                  </p>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Precipitación Anual</Label>
                    <div className="relative">
                      <Input 
                        type="number" 
                        value={rainfall}
                        onChange={(e) => setRainfall(Number(e.target.value) || 0)}
                        className="pr-12"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">mm</span>
                    </div>
                  </div>
                  <div>
                    <Label>Cant. Jardines Infiltrantes</Label>
                    <Input 
                      type="number" 
                      value={numGardens}
                      onChange={(e) => setNumGardens(Number(e.target.value) || 0)}
                    />
                  </div>
                </div>

                <button 
                  id="calc-btn"
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold bg-water text-white shadow-lg shadow-water/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                >
                  Calcular Captación
                </button>

                {/* Results */}
                <div>
                  <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-water" />
                    Potencial Hídrico
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <ResultBadge 
                      icon={Droplets} 
                      label="Captación Total" 
                      value={waterCaptured.toLocaleString()} 
                      unit="L/año"
                      colorClass="bg-water/10 text-water" 
                    />
                    <ResultBadge 
                      icon={Activity} 
                      label="Agua por Jardín" 
                      value={waterPerGarden.toLocaleString()} 
                      unit="L"
                      colorClass="bg-teal-500/10 text-teal-600" 
                    />
                    <ResultBadge 
                      icon={Map} 
                      label="Reducción Escurrimiento" 
                      value={`${runoffReduction.toFixed(1)}`} 
                      unit="%"
                      colorClass="bg-blue-500/10 text-blue-600" 
                    />
                    <ResultBadge 
                      icon={Info} 
                      label="Equivalencia" 
                      value={waterTanks} 
                      unit="pipas (10k L)"
                      colorClass="bg-indigo-500/10 text-indigo-600" 
                    />
                  </div>
                </div>

                {/* Chart */}
                <Card className="pt-6">
                  <h4 className="text-sm font-semibold text-foreground mb-4 text-center">Destino del Agua Pluvial</h4>
                  <div className="h-[180px] w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col">
                      <span className="text-2xl font-bold text-foreground">80%</span>
                      <span className="text-xs text-muted-foreground">Eficiencia</span>
                    </div>
                  </div>
                </Card>

              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}

// Simple Logo SVG Component
function LeafLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </svg>
  );
}
