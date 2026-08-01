import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Navigation, Home, Briefcase, Heart, Plus, ChevronLeft, Check } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { useNavigate } from 'react-router-dom';

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

const DIVISIONS = ['Dhaka', 'Chattogram', 'Sylhet', 'Rajshahi', 'Khulna', 'Barishal', 'Rangpur', 'Mymensingh'];
const AREAS: Record<string, string[]> = {
  Dhaka: ['Dhanmondi', 'Gulshan', 'Uttara', 'Mirpur', 'Banani', 'Mohakhali', 'Badda', 'Khilgaon'],
  Chattogram: ['Agrabad', 'GEC Circle', 'Halishahar', 'Khulshi', 'Nasirabad'],
  Sylhet: ['Zindabazar', 'Amberkhana', 'Subidbazar', 'Shibganj', 'Uposhohor'],
  // Add other areas as needed
};

export function CustomerAddresses() {
  const navigate = useNavigate();
  const [view, setView] = useState<'list' | 'map' | 'details'>('list');
  const [markerPosition, setMarkerPosition] = useState({ lat: 23.8103, lng: 90.4125 }); // Dhaka center
  
  // Form state
  const [addressType, setAddressType] = useState('Home');
  const [division, setDivision] = useState('');
  const [area, setArea] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [instructions, setInstructions] = useState('');

  const [savedAddresses, setSavedAddresses] = useState([
    { id: 1, type: 'Home', division: 'Dhaka', area: 'Gulshan', street: 'House 12, Road 5', instructions: 'Leave at front desk' },
    { id: 2, type: 'Work', division: 'Dhaka', area: 'Banani', street: 'Block C, Road 11', instructions: 'Call upon arrival' }
  ]);

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddress = {
      id: Date.now(),
      type: addressType,
      division,
      area,
      street: streetAddress,
      instructions
    };
    setSavedAddresses([...savedAddresses, newAddress]);
    setView('list');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Home': return <Home size={20} />;
      case 'Work': return <Briefcase size={20} />;
      case 'Partner/Friend': return <Heart size={20} />;
      default: return <MapPin size={20} />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20 md:pb-0">
      <AnimatePresence mode="wait">
        {view === 'list' && (
          <motion.div key="list" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="flex items-center gap-4 mb-2">
              <button onClick={() => navigate(-1)} className="p-2 bg-brand-bg rounded-full hover:bg-brand-card transition-colors text-brand-text">
                <ChevronLeft size={20} />
              </button>
              <h2 className="text-2xl font-black text-brand-text">Saved Addresses</h2>
            </div>

            <button 
              onClick={() => setView('map')}
              className="w-full flex items-center justify-between p-4 bg-brand-card border border-brand-pink/50 rounded-2xl hover:bg-brand-pink/5 transition-colors group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-pink/10 text-brand-pink flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus size={24} />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-bold text-brand-pink">Add New Address</h3>
                  <p className="text-xs text-brand-text-muted">Pinpoint on map</p>
                </div>
              </div>
            </button>

            <div className="space-y-3">
              {savedAddresses.map((addr) => (
                <div key={addr.id} className="flex items-start gap-4 p-4 bg-brand-card border border-brand-border rounded-2xl shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-brand-bg text-brand-text-muted flex items-center justify-center shrink-0">
                    {getTypeIcon(addr.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-brand-text">{addr.type}</h3>
                    <p className="text-sm text-brand-text-muted mt-1">{addr.street}, {addr.area}, {addr.division}</p>
                    {addr.instructions && (
                      <p className="text-xs text-brand-text-muted italic mt-2 text-brand-pink/80">"{addr.instructions}"</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {view === 'map' && (
          <motion.div key="map" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="h-[80vh] flex flex-col relative rounded-2xl overflow-hidden shadow-lg border border-brand-border">
            <div className="absolute top-4 left-4 z-10">
               <button onClick={() => setView('list')} className="p-3 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors text-brand-text">
                 <ChevronLeft size={24} />
               </button>
            </div>
            
            <div className="flex-1 bg-brand-bg relative">
              {hasValidKey ? (
                <APIProvider apiKey={API_KEY} version="weekly">
                  <Map
                    defaultCenter={markerPosition}
                    defaultZoom={15}
                    mapId="ADDRESS_MAP_ID"
                    style={{width: '100%', height: '100%'}}
                    disableDefaultUI={true}
                    onClick={(e) => {
                      if (e.detail.latLng) {
                        setMarkerPosition({ lat: e.detail.latLng.lat, lng: e.detail.latLng.lng });
                      }
                    }}
                  >
                    <AdvancedMarker position={markerPosition}>
                      <div className="w-10 h-10 bg-brand-pink rounded-full flex items-center justify-center shadow-lg border-2 border-white -translate-y-1/2">
                        <MapPin size={24} className="text-white" />
                      </div>
                    </AdvancedMarker>
                  </Map>
                </APIProvider>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <MapPin size={48} className="text-brand-pink mb-4 opacity-30" />
                  <p className="text-lg font-bold text-brand-text">Map API Key Required</p>
                  <p className="text-sm text-brand-text-muted mt-2 max-w-sm">Add GOOGLE_MAPS_PLATFORM_KEY in Settings &gt; Secrets to use the interactive map.</p>
                </div>
              )}

              <div className="absolute bottom-6 right-6 z-10">
                 <button className="p-4 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors text-brand-text flex items-center justify-center">
                   <Navigation size={24} className="text-blue-500" />
                 </button>
              </div>
            </div>

            <div className="p-6 bg-white border-t border-brand-border">
              <h3 className="text-lg font-bold text-brand-text mb-1">Confirm delivery location</h3>
              <p className="text-sm text-brand-text-muted mb-4">Drag the map to pin your exact location</p>
              <button 
                onClick={() => setView('details')}
                className="w-full py-3.5 bg-brand-pink text-white rounded-xl font-bold hover:bg-brand-pink/90 transition-colors shadow-sm"
              >
                Confirm Location
              </button>
            </div>
          </motion.div>
        )}

        {view === 'details' && (
          <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setView('map')} className="p-2 bg-brand-bg rounded-full hover:bg-brand-card transition-colors text-brand-text">
                <ChevronLeft size={20} />
              </button>
              <h2 className="text-2xl font-black text-brand-text">Address Details</h2>
            </div>

            <form onSubmit={handleSaveAddress} className="space-y-6 bg-brand-card p-6 rounded-2xl border border-brand-border shadow-sm">
              <div className="space-y-3">
                <label className="text-sm font-bold text-brand-text">Save as</label>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {['Home', 'Work', 'Partner/Friend', 'Other'].map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setAddressType(type)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold whitespace-nowrap transition-colors ${
                        addressType === type 
                          ? 'border-brand-pink bg-brand-pink/10 text-brand-pink' 
                          : 'border-brand-border bg-brand-bg text-brand-text-muted hover:border-brand-text-muted'
                      }`}
                    >
                      {getTypeIcon(type)}
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-text">Division / District</label>
                  <select 
                    value={division} 
                    onChange={(e) => { setDivision(e.target.value); setArea(''); }}
                    className="w-full p-3 bg-brand-bg border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-pink focus:border-brand-pink outline-none text-brand-text"
                    required
                  >
                    <option value="">Select Division</option>
                    {DIVISIONS.map(div => <option key={div} value={div}>{div}</option>)}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-text">Area / Thana</label>
                  <select 
                    value={area} 
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full p-3 bg-brand-bg border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-pink focus:border-brand-pink outline-none text-brand-text"
                    required
                    disabled={!division}
                  >
                    <option value="">Select Area</option>
                    {division && AREAS[division]?.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-text">Detailed Address</label>
                <input 
                  type="text" 
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  placeholder="House Number, Road Name, Flat/Unit" 
                  className="w-full p-3 bg-brand-bg border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-pink focus:border-brand-pink outline-none text-brand-text"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-text">Delivery Instructions (Optional)</label>
                <textarea 
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g. Leave at front desk, Ring the doorbell" 
                  className="w-full p-3 bg-brand-bg border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-pink focus:border-brand-pink outline-none text-brand-text resize-none"
                  rows={3}
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 bg-brand-pink text-white rounded-xl font-bold hover:bg-brand-pink/90 transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Check size={20} /> Save Address
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
