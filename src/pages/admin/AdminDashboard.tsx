import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Card3D } from '../../components/ui/Card3D';
import { Button3D } from '../../components/ui/Button3D';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, TrendingUp, Users, PackageOpen, Check, ChefHat, Truck, CheckCircle2, BarChart3 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const mockRevenueData = [
  { name: 'Mon', revenue: 420 },
  { name: 'Tue', revenue: 380 },
  { name: 'Wed', revenue: 550 },
  { name: 'Thu', revenue: 450 },
  { name: 'Fri', revenue: 700 },
  { name: 'Sat', revenue: 950 },
  { name: 'Sun', revenue: 850 },
];

const mockOrderVolumeData = [
  { name: 'Week 1', orders: 145 },
  { name: 'Week 2', orders: 168 },
  { name: 'Week 3', orders: 210 },
  { name: 'Week 4', orders: 280 },
];

export function AdminDashboard() {
  const { orders, updateOrderStatus } = useStore();

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const activeOrders = orders.filter(o => o.status !== 'delivered').length;
  const uniqueCustomers = new Set(orders.map(o => o.customerId)).size;

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'preparing': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'on_the_way': return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
      case 'delivered': return 'text-green-500 bg-green-500/10 border-green-500/20';
      default: return 'text-brand-text-muted bg-brand-bg border-brand-border';
    }
  };

  const getNextAction = (status: string, orderId: string) => {
    switch(status) {
      case 'pending':
        return (
          <Button3D size="sm" onClick={() => updateOrderStatus(orderId, 'preparing')} className="w-full">
            <Check size={16} /> Accept & Prepare
          </Button3D>
        );
      case 'preparing':
        return (
          <Button3D size="sm" variant="secondary" onClick={() => updateOrderStatus(orderId, 'on_the_way')} className="w-full">
            <Truck size={16} /> Dispatch Order
          </Button3D>
        );
      case 'on_the_way':
        return (
          <Button3D size="sm" variant="outline" onClick={() => updateOrderStatus(orderId, 'delivered')} className="w-full">
            <CheckCircle2 size={16} /> Mark Delivered
          </Button3D>
        );
      case 'delivered':
        return (
          <div className="text-center py-2 text-green-500 font-bold flex items-center justify-center gap-2">
            <CheckCircle2 size={16} /> Completed
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-brand-border pb-6">
        <div>
          <h2 className="text-3xl font-black mb-2 flex items-center gap-3">
            <LayoutDashboard className="text-brand-pink" /> Admin Control
          </h2>
          <p className="text-brand-text-muted font-medium">Welcome to the central command, ATIK ULLAH.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card3D className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-brand-pink/20 text-brand-pink rounded-xl">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm text-brand-text-muted font-bold uppercase tracking-wider mb-1">Revenue</p>
              <h3 className="text-3xl font-black">${totalRevenue.toFixed(2)}</h3>
            </div>
          </div>
        </Card3D>
        
        <Card3D className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 text-blue-500 rounded-xl">
              <PackageOpen size={24} />
            </div>
            <div>
              <p className="text-sm text-brand-text-muted font-bold uppercase tracking-wider mb-1">Active Orders</p>
              <h3 className="text-3xl font-black">{activeOrders}</h3>
            </div>
          </div>
        </Card3D>

        <Card3D className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/20 text-green-500 rounded-xl">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-brand-text-muted font-bold uppercase tracking-wider mb-1">Customers</p>
              <h3 className="text-3xl font-black">{uniqueCustomers}</h3>
            </div>
          </div>
        </Card3D>
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 mb-8">
        <Card3D className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="text-brand-pink" size={20} />
            <h3 className="text-xl font-bold">Daily Revenue</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E21B70" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#E21B70" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis dataKey="name" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#E5E7EB', borderRadius: '0.5rem', color: '#333333' }}
                  itemStyle={{ color: '#E21B70', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#E21B70" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card3D>

        <Card3D className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="text-blue-500" size={20} />
            <h3 className="text-xl font-bold">Monthly Order Volume</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockOrderVolumeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis dataKey="name" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#E5E7EB', borderRadius: '0.5rem', color: '#333333' }}
                  itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                  cursor={{ fill: '#E5E7EB', opacity: 0.4 }}
                />
                <Bar dataKey="orders" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card3D>
      </div>

      {/* Order Management */}
      <div>
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          Live Orders <span className="flex h-3 w-3 rounded-full bg-red-500 animate-pulse ml-2" />
        </h3>
        
        {orders.length === 0 ? (
          <div className="text-center py-12 border border-brand-border border-dashed rounded-2xl bg-brand-card">
            <p className="text-brand-text-muted font-medium">No orders have been placed yet.</p>
          </div>
        ) : (
          <div className="space-y-4 perspective-1000">
            <AnimatePresence>
              {orders.map((order, idx) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, rotateX: -10 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card3D className="p-0 overflow-visible z-10">
                    <div className="p-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                      
                      {/* Customer Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-black text-lg text-brand-text">{order.id}</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${getStatusColor(order.status)}`}>
                            {order.status.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <p className="text-brand-text font-medium mb-1">
                          <span className="text-brand-text-muted">Customer:</span> {order.customerName}
                        </p>
                        <p className="text-brand-text-muted text-sm">
                          {order.items.length} items • {new Date(order.createdAt).toLocaleTimeString()}
                        </p>
                      </div>

                      {/* Items Preview */}
                      <div className="flex-1 w-full border-y lg:border-y-0 lg:border-x border-brand-border py-4 lg:py-0 lg:px-6">
                        <div className="text-sm space-y-2 max-h-24 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-brand-border">
                          {order.items.map(item => (
                            <div key={item.food.id} className="flex justify-between items-center bg-brand-bg p-2 rounded">
                              <span className="text-brand-text">
                                <span className="font-black text-brand-pink mr-2">{item.quantity}x</span>
                                {item.food.name}
                              </span>
                              <span className="text-brand-text-muted font-medium">${(item.food.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Status Action */}
                      <div className="flex-1 flex flex-col justify-end w-full lg:w-48 gap-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-brand-text-muted text-sm font-bold">Total:</span>
                          <span className="text-xl font-black text-brand-pink">${order.total.toFixed(2)}</span>
                        </div>
                        {getNextAction(order.status, order.id)}
                      </div>

                    </div>
                  </Card3D>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
