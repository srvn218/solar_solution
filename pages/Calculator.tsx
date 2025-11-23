import React, { useState, useEffect } from 'react';
import { Sun, DollarSign, Zap, BarChart3, Info, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

const Calculator: React.FC = () => {
  // Inputs
  const [bill, setBill] = useState(3000); // Default ~3000 INR
  const [sunHours, setSunHours] = useState(5.0); // Default moderate sun
  const [roofType, setRoofType] = useState(1.0); // Efficiency multiplier

  // Results state
  const [results, setResults] = useState({
    systemSize: 0,
    annualProduction: 0,
    systemCost: 0,
    utilityCost20Years: 0,
    savings20Years: 0,
    paybackPeriod: 0
  });

  // Tamil Nadu Districts with estimated peak sun hours
  const locations = [
    { label: 'Select District...', value: 0 },
    { label: 'Ariyalur', value: 5.2 },
    { label: 'Chengalpattu', value: 5.1 },
    { label: 'Chennai', value: 5.0 },
    { label: 'Coimbatore', value: 5.1 },
    { label: 'Cuddalore', value: 5.2 },
    { label: 'Dharmapuri', value: 5.3 },
    { label: 'Dindigul', value: 5.4 },
    { label: 'Erode', value: 5.3 },
    { label: 'Kallakurichi', value: 5.3 },
    { label: 'Kancheepuram', value: 5.1 },
    { label: 'Kanyakumari', value: 4.8 },
    { label: 'Karur', value: 5.5 },
    { label: 'Krishnagiri', value: 5.2 },
    { label: 'Madurai', value: 5.8 },
    { label: 'Nagapattinam', value: 5.3 },
    { label: 'Namakkal', value: 5.4 },
    { label: 'Nilgiris', value: 4.5 },
    { label: 'Perambalur', value: 5.4 },
    { label: 'Pudukkottai', value: 5.5 },
    { label: 'Ramanathapuram', value: 5.9 },
    { label: 'Ranipet', value: 5.2 },
    { label: 'Salem', value: 5.4 },
    { label: 'Sivaganga', value: 5.7 },
    { label: 'Tenkasi', value: 5.6 },
    { label: 'Thanjavur', value: 5.3 },
    { label: 'Theni', value: 5.2 },
    { label: 'Thoothukudi', value: 6.0 },
    { label: 'Tiruchirappalli', value: 5.6 },
    { label: 'Tirunelveli', value: 5.8 },
    { label: 'Tirupathur', value: 5.2 },
    { label: 'Tiruppur', value: 5.4 },
    { label: 'Tiruvallur', value: 5.1 },
    { label: 'Tiruvannamalai', value: 5.3 },
    { label: 'Tiruvarur', value: 5.2 },
    { label: 'Vellore', value: 5.3 },
    { label: 'Viluppuram', value: 5.2 },
    { label: 'Virudhunagar', value: 5.7 },
  ];

  // Calculation Logic
  useEffect(() => {
    // Assumptions for India/Tamil Nadu
    const electricityRate = 8.0; // ₹8.0 per kWh (Average blended tier rate)
    const costPerWatt = 65; // ₹65 per Watt (Approx market rate for rooftop solar)
    const utilityInflation = 0.04; // 4% annual rate hike

    // 1. Calculate Monthly kWh usage
    const monthlyKwh = bill / electricityRate;
    const dailyKwh = monthlyKwh / 30;

    // 2. Calculate Required System Size (kW)
    // Formula: Daily kWh / Sun Hours / Efficiency Factor (0.75 for system losses)
    let size = (dailyKwh / sunHours) / 0.75;
    size = size * roofType; // Adjust for roof difficulty
    
    // Round to nearest 0.5 kW
    size = Math.round(size * 2) / 2;
    if (size < 0) size = 0;

    // 3. System Cost (INR)
    const grossCost = size * 1000 * costPerWatt;
    // Assuming approx 20-30% subsidy/incentive (PM Surya Ghar / State subsidies)
    const netCost = grossCost * 0.80; 

    // 4. Production
    const annualProd = size * sunHours * 365 * 0.75; // kWh per year

    // 5. 20 Year Projection
    let totalUtilityCost = 0;
    let currentAnnualBill = bill * 12;

    for (let i = 0; i < 20; i++) {
      totalUtilityCost += currentAnnualBill;
      currentAnnualBill *= (1 + utilityInflation);
    }

    const savings = totalUtilityCost - netCost;

    setResults({
      systemSize: size,
      annualProduction: Math.round(annualProd),
      systemCost: Math.round(netCost),
      utilityCost20Years: Math.round(totalUtilityCost),
      savings20Years: Math.round(savings),
      paybackPeriod: Math.round(netCost / (bill * 12)) // Rough estimate
    });

  }, [bill, sunHours, roofType]);

  const savingsPercent = results.utilityCost20Years > 0 ? (results.savings20Years / results.utilityCost20Years) * 100 : 0;

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Solar Savings Calculator</h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Estimate your solar potential in Tamil Nadu. Calculate savings based on your district and electricity bill.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Controls Section */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="bg-primary-100 p-2 rounded-lg mr-3">
                  <Zap className="w-5 h-5 text-primary-600" />
                </span>
                Your Energy Profile
              </h3>

              {/* Monthly Bill Slider */}
              <div className="mb-8">
                <label className="flex justify-between text-sm font-medium text-gray-700 mb-4">
                  Average Monthly Bill
                  <span className="text-2xl font-bold text-primary-600">₹{bill.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min="500"
                  max="20000"
                  step="100"
                  value={bill}
                  onChange={(e) => setBill(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600 hover:accent-primary-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>₹500</span>
                  <span>₹20,000+</span>
                </div>
              </div>

              {/* Location */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Location (Tamil Nadu District)</label>
                <div className="relative">
                  <select
                    value={sunHours}
                    onChange={(e) => setSunHours(Number(e.target.value))}
                    className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none bg-white transition-shadow"
                  >
                    {locations.map((loc) => (
                      <option key={loc.label} value={loc.value}>{loc.label}</option>
                    ))}
                  </select>
                  <Sun className="absolute right-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Roof Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Roof Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setRoofType(1.0)}
                    className={`py-3 px-4 rounded-xl text-sm font-semibold border-2 transition-all ${roofType === 1.0 ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-100 hover:border-gray-200 text-gray-600'}`}
                  >
                    Standard / Sloped
                  </button>
                  <button
                    onClick={() => setRoofType(1.1)} // Less efficient usage of space/mounting
                    className={`py-3 px-4 rounded-xl text-sm font-semibold border-2 transition-all ${roofType === 1.1 ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-100 hover:border-gray-200 text-gray-600'}`}
                  >
                    Flat / Complex
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex items-start gap-4">
              <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 text-sm">Did you know?</h4>
                <p className="text-blue-800 text-sm mt-1">
                  Solar incentives, like the PM Surya Ghar scheme, can significantly reduce your upfront costs. This calculator estimates net cost after typical subsidies.
                </p>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Main Savings Card */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
               {/* Background decoration */}
               <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
               
               <h3 className="text-gray-300 font-medium mb-1 flex items-center gap-2 text-sm md:text-base">
                 <DollarSign className="w-4 h-4" /> Estimated 20-Year Savings
               </h3>
               <div className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 text-green-400 tracking-tight">
                 ₹{results.savings20Years.toLocaleString()}
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 border-t border-gray-700 pt-6">
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Old Utility Cost</div>
                    <div className="text-lg md:text-xl font-semibold text-gray-200">₹{results.utilityCost20Years.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Net Solar Cost</div>
                    <div className="text-lg md:text-xl font-semibold text-white">₹{results.systemCost.toLocaleString()}</div>
                  </div>
               </div>

               {/* Visual Bar Chart */}
               <div className="mt-8">
                 <div className="flex justify-between text-xs text-gray-400 mb-2">
                   <span>Cost Comparison</span>
                   <span>Save {Math.round(savingsPercent)}%</span>
                 </div>
                 <div className="h-4 bg-gray-700 rounded-full overflow-hidden flex">
                   <div 
                     className="h-full bg-green-500 transition-all duration-1000 ease-out"
                     style={{ width: `${Math.max(0, 100 - (results.utilityCost20Years > 0 ? (results.systemCost / results.utilityCost20Years * 100) : 0))}%` }}
                   ></div>
                 </div>
               </div>
            </div>

            {/* System Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="bg-yellow-100 p-3 rounded-full flex-shrink-0">
                  <Sun className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">System Size</div>
                  <div className="text-xl md:text-2xl font-bold text-gray-900">{results.systemSize} kW</div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Annual Production</div>
                  <div className="text-xl md:text-2xl font-bold text-gray-900">{results.annualProduction.toLocaleString()} kWh</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-full flex-shrink-0">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Break-even Point</div>
                  <div className="text-xl md:text-2xl font-bold text-gray-900">{results.paybackPeriod < 1 ? '< 1' : results.paybackPeriod} Years</div>
                </div>
              </div>
              
              {/* CTA Card */}
              <div className="bg-primary-50 p-6 rounded-2xl border border-primary-100 flex flex-col justify-center items-start">
                 <h4 className="font-bold text-primary-900 mb-2">Like these numbers?</h4>
                 <Link to="/quote" className="w-full">
                   <Button className="w-full justify-between group">
                     Get Official Quote 
                     <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </Button>
                 </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;