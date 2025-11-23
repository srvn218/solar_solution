import React, { useState } from 'react';
import { Button } from '../components/Button';
import { CheckCircle } from 'lucide-react';
import { storageService } from '../services/storageService';

const Quote: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    monthlyBill: '',
    roofType: 'Shingle',
    propertyType: 'Residential'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to mock storage
    storageService.saveQuote(formData);
    setStep(3); // Success step
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden">
        
        {/* Progress Bar */}
        <div className="bg-gray-100 h-2 w-full">
          <div 
            className="bg-primary-600 h-full transition-all duration-500" 
            style={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
          ></div>
        </div>

        <div className="p-6 md:p-12">
          {step === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Get Your Solar Quote</h2>
              <p className="text-gray-600 mb-8">Let's start with your energy needs. This helps us design the perfect system for you.</p>
              
              <div className="space-y-6">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                    <div className="grid grid-cols-2 gap-4">
                       {['Residential', 'Commercial'].map(type => (
                         <button
                           key={type}
                           type="button"
                           onClick={() => setFormData({...formData, propertyType: type})}
                           className={`py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                             formData.propertyType === type 
                             ? 'border-primary-600 bg-primary-50 text-primary-700' 
                             : 'border-gray-200 text-gray-500 hover:border-primary-200'
                           }`}
                         >
                           {type}
                         </button>
                       ))}
                    </div>
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Average Monthly Electricity Bill (INR or USD)</label>
                   <input
                     type="number"
                     name="monthlyBill"
                     value={formData.monthlyBill}
                     onChange={handleChange}
                     className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                     placeholder="e.g. 2000"
                   />
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Roof Type</label>
                   <select
                     name="roofType"
                     value={formData.roofType}
                     onChange={handleChange}
                     className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"
                   >
                     <option value="Shingle">Asphalt Shingle</option>
                     <option value="Tile">Tile (Spanish/Clay)</option>
                     <option value="Metal">Metal</option>
                     <option value="Flat">Flat Roof</option>
                     <option value="Concrete">Concrete</option>
                   </select>
                 </div>

                 <Button className="w-full mt-4" onClick={() => setStep(2)}>Next Step</Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Contact Details</h2>
              <p className="text-gray-600 mb-8">Where should we send your custom proposal?</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                   <input
                     type="text"
                     name="name"
                     required
                     value={formData.name}
                     onChange={handleChange}
                     className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                     placeholder="John Doe"
                   />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                     <input
                       type="email"
                       name="email"
                       required
                       value={formData.email}
                       onChange={handleChange}
                       className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                       placeholder="john@example.com"
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                     <input
                       type="tel"
                       name="phone"
                       required
                       value={formData.phone}
                       onChange={handleChange}
                       className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                       placeholder="(555) 123-4567"
                     />
                   </div>
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Installation Address</label>
                   <input
                     type="text"
                     name="address"
                     required
                     value={formData.address}
                     onChange={handleChange}
                     className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                     placeholder="123 Solar Street, Sunnyville"
                   />
                </div>

                <div className="flex gap-4 mt-6">
                  <Button type="button" variant="ghost" onClick={() => setStep(1)}>Back</Button>
                  <Button type="submit" className="flex-1">Submit Request</Button>
                </div>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="text-center animate-scale-in">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Request Received!</h2>
              <p className="text-gray-600 text-lg mb-8">
                Thank you, {formData.name}. Our engineering team is reviewing your property details. 
                We will send a preliminary solar design and quote to <strong>{formData.email}</strong> within 24 hours.
              </p>
              <Button onClick={() => window.location.href = '/'} variant="outline">Back to Home</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quote;