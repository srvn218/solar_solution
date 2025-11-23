import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { QuoteSubmission, Product, Project } from '../types';
import { Button } from '../components/Button';
import { LogOut, Plus, Trash2, LayoutDashboard, Package, FolderOpen, ClipboardList } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'quotes' | 'products' | 'projects'>('quotes');
  const [quotes, setQuotes] = useState<QuoteSubmission[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  // Form states for adding new items
  const [showProductForm, setShowProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({ category: 'Panel' });
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({});

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin');
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = () => {
    setQuotes(storageService.getQuotes());
    setProducts(storageService.getProducts());
    setProjects(storageService.getProjects());
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin');
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price) {
      storageService.saveProduct({
        ...newProduct,
        id: Date.now().toString(),
        image: newProduct.image || 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=60'
      } as Product);
      setShowProductForm(false);
      setNewProduct({ category: 'Panel' });
      loadData();
    }
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Delete this product?')) {
      storageService.deleteProduct(id);
      loadData();
    }
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProject.title && newProject.location) {
      storageService.saveProject({
        ...newProject,
        id: Date.now().toString(),
        image: newProject.image || 'https://images.unsplash.com/photo-1565354577827-b088e622b79e?w=800&q=60'
      } as Project);
      setShowProjectForm(false);
      setNewProject({});
      loadData();
    }
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Delete this project?')) {
      storageService.deleteProject(id);
      loadData();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full hidden md:block">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
          <p className="text-xs text-gray-500">Aswin Solar Consultants</p>
        </div>
        <nav className="p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('quotes')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'quotes' ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <ClipboardList className="w-5 h-5" />
            <span>Quote Requests</span>
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'products' ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Package className="w-5 h-5" />
            <span>Products</span>
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'projects' ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <FolderOpen className="w-5 h-5" />
            <span>Projects</span>
          </button>
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <button onClick={handleLogout} className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 capitalize">{activeTab} Management</h1>
          <div className="md:hidden">
             <button onClick={handleLogout} className="text-sm text-red-600">Logout</button>
          </div>
        </div>

        {/* Quotes Tab */}
        {activeTab === 'quotes' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {quotes.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No quote requests received yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase">
                    <tr>
                      <th className="px-6 py-4 font-medium">Date</th>
                      <th className="px-6 py-4 font-medium">Name</th>
                      <th className="px-6 py-4 font-medium">Contact</th>
                      <th className="px-6 py-4 font-medium">Bill Amount</th>
                      <th className="px-6 py-4 font-medium">Property</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {quotes.map((quote) => (
                      <tr key={quote.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-500">{new Date(quote.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4 font-medium text-gray-900">{quote.name}</td>
                        <td className="px-6 py-4 text-gray-600">
                          <div>{quote.email}</div>
                          <div className="text-xs text-gray-400">{quote.phone}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-900">₹{quote.monthlyBill}</td>
                        <td className="px-6 py-4 text-gray-600">{quote.propertyType} <br/><span className="text-xs">({quote.roofType})</span></td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {quote.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <Button onClick={() => setShowProductForm(!showProductForm)} size="sm">
                <Plus className="w-4 h-4 mr-2" /> Add Product
              </Button>
            </div>

            {showProductForm && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-fade-in">
                <h3 className="font-bold mb-4">Add New Product</h3>
                <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input placeholder="Product Name" className="border p-2 rounded" value={newProduct.name || ''} onChange={e => setNewProduct({...newProduct, name: e.target.value})} required />
                  <input placeholder="Price (e.g. $500)" className="border p-2 rounded" value={newProduct.price || ''} onChange={e => setNewProduct({...newProduct, price: e.target.value})} required />
                  <select className="border p-2 rounded" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value as any})}>
                    <option value="Panel">Panel</option>
                    <option value="Inverter">Inverter</option>
                    <option value="Battery">Battery</option>
                    <option value="Accessory">Accessory</option>
                  </select>
                  <input placeholder="Specs (e.g. 400W)" className="border p-2 rounded" value={newProduct.specs || ''} onChange={e => setNewProduct({...newProduct, specs: e.target.value})} />
                  <input placeholder="Image URL" className="border p-2 rounded md:col-span-2" value={newProduct.image || ''} onChange={e => setNewProduct({...newProduct, image: e.target.value})} />
                  <textarea placeholder="Description" className="border p-2 rounded md:col-span-2" value={newProduct.description || ''} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
                  <div className="md:col-span-2 flex justify-end gap-2">
                    <Button type="button" variant="ghost" onClick={() => setShowProductForm(false)}>Cancel</Button>
                    <Button type="submit">Save Product</Button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <div key={product.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col relative group">
                  <button 
                    onClick={() => handleDeleteProduct(product.id)}
                    className="absolute top-2 right-2 p-2 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <img src={product.image} alt={product.name} className="h-32 w-full object-cover rounded-lg mb-4" />
                  <h3 className="font-bold text-gray-800">{product.name}</h3>
                  <p className="text-sm text-primary-600 font-semibold mb-2">{product.price}</p>
                  <p className="text-xs text-gray-500 mb-2">{product.category} | {product.specs}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <Button onClick={() => setShowProjectForm(!showProjectForm)} size="sm">
                <Plus className="w-4 h-4 mr-2" /> Add Project
              </Button>
            </div>

            {showProjectForm && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-fade-in">
                <h3 className="font-bold mb-4">Add New Project</h3>
                <form onSubmit={handleAddProject} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input placeholder="Project Title" className="border p-2 rounded" value={newProject.title || ''} onChange={e => setNewProject({...newProject, title: e.target.value})} required />
                  <input placeholder="Location" className="border p-2 rounded" value={newProject.location || ''} onChange={e => setNewProject({...newProject, location: e.target.value})} required />
                  <input placeholder="Capacity (e.g. 50kW)" className="border p-2 rounded" value={newProject.capacity || ''} onChange={e => setNewProject({...newProject, capacity: e.target.value})} />
                  <input placeholder="Completion Date" className="border p-2 rounded" value={newProject.completionDate || ''} onChange={e => setNewProject({...newProject, completionDate: e.target.value})} />
                  <input placeholder="Image URL" className="border p-2 rounded md:col-span-2" value={newProject.image || ''} onChange={e => setNewProject({...newProject, image: e.target.value})} />
                  <div className="md:col-span-2 flex justify-end gap-2">
                    <Button type="button" variant="ghost" onClick={() => setShowProjectForm(false)}>Cancel</Button>
                    <Button type="submit">Save Project</Button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map(project => (
                <div key={project.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4 relative group">
                  <button 
                    onClick={() => handleDeleteProject(project.id)}
                    className="absolute top-2 right-2 p-2 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <img src={project.image} alt={project.title} className="w-24 h-24 object-cover rounded-lg" />
                  <div>
                    <h3 className="font-bold text-gray-800">{project.title}</h3>
                    <p className="text-sm text-gray-500">{project.location}</p>
                    <div className="mt-2 text-xs bg-gray-100 inline-block px-2 py-1 rounded">
                      {project.capacity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;