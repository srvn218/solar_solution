import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { storageService } from '../services/storageService';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    setProducts(storageService.getProducts());
  }, []);

  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category + 's' === filter || p.category === filter); // Handle singular/plural matching roughly

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Premium Products</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            From high-efficiency panels to smart storage solutions, we provide everything you need for energy independence.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12 overflow-x-auto pb-4 px-2 md:pb-0">
          {['All', 'Panels', 'Inverters', 'Batteries', 'Accessories'].map((cat, idx) => (
             <button 
               key={idx} 
               onClick={() => setFilter(cat)}
               className={`px-4 md:px-6 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0 ${filter === cat ? 'bg-primary-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
             >
               {cat}
             </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col">
              <div className="relative h-56 md:h-64 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                  {product.category}
                </div>
              </div>
              <div className="p-5 md:p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900">{product.name}</h3>
                  <span className="text-primary-600 font-bold text-lg">{product.price}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4 font-mono bg-gray-50 inline-block p-1 rounded w-fit">{product.specs}</p>
                <p className="text-sm md:text-base text-gray-600 mb-6 flex-1">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;