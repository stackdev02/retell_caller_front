import React, { useState } from 'react';
import { Settings, X, Phone} from 'lucide-react';
import Retell from 'retell-sdk'; // Import the Retell SDK
// import { PhoneCallResponse } from 'retell-sdk/src/resources/call.js';


const APIKEY = import.meta.env.VITE_RETELL_API_KEY || "";
const PHONENUMBER = import.meta.env.VITE_RETELL_PHONE_NUMBER || "";

const sample_dynamicVariables = {
  customer_name: "John Doe",
  customer_email: "john.doe@example.com",
  customer_phone: "+1234567890",
  agent_name: "Agent Smith",
  followup_reason: "BNI followup",
};

function App() {
  const [apiKey, setApiKey] = useState(APIKEY);
  const [phoneNumber, setPhoneNumber] = useState(PHONENUMBER);
  const [dialNumber, setDialNumber] = useState('');
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [dynamicVariables, setDynamicVariables] = useState(sample_dynamicVariables);

  // Add new state for managing dynamic fields
  const [newFieldKey, setNewFieldKey] = useState('');
  const [newFieldValue, setNewFieldValue] = useState('');

  // Initialize Retell SDK
  const retell = new Retell({ apiKey });

  // Handle dialing a digit
  const handleDial = (digit: string) => {
    setDialNumber((prev) => prev + digit);
  };

  // Add handlers for dynamic variables
  const handleAddField = () => {
    if (newFieldKey.trim()) {
      setDynamicVariables(prev => ({
        ...prev,
        [newFieldKey.trim()]: newFieldValue
      }));
      setNewFieldKey('');
      setNewFieldValue('');
    }
  };

  const handleRemoveField = (keyToRemove: string) => {
    setDynamicVariables(prev => {
      const newVariables = { ...prev };
      delete newVariables[keyToRemove as keyof typeof newVariables];
      return newVariables;
    });
  };

  const handleUpdateField = (key: string, value: string) => {
    setDynamicVariables(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Handle making or ending a call
  const handleCall = async () => {
    if (!apiKey || !phoneNumber) {
      setIsConfigOpen(true);
      return;
    }


    // Start a new call
    try {
      alert('Dialing...');
      // Use dynamicVariables directly without parsing
      await retell.call.createPhoneCall({
        from_number: phoneNumber,
        to_number: dialNumber,
        retell_llm_dynamic_variables: dynamicVariables,
      });
      alert('Call connected successfully');
    } catch (error) {
      console.error('Error initiating call:', error);
      alert('Failed to initiate the call. Please check your API key and phone number.');
    }
  };

  // Dial pad numbers
  const dialPadNumbers = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', '#'],
  ];

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Panel - Call Controls */}
        <div className="space-y-6">
          <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Retell Caller
              </h2>
              <button
                onClick={() => setIsConfigOpen(!isConfigOpen)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={dialNumber}
                  onChange={(e) => setDialNumber(e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-3 bg-white/5 rounded-lg border border-white/10 text-xl font-mono tracking-wider"
                />
                {dialNumber && (
                  <button
                    onClick={() => setDialNumber('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3">
                {dialPadNumbers.map((row, rowIndex) => (
                  <React.Fragment key={rowIndex}>
                    {row.map((number) => (
                      <button
                        key={number}
                        onClick={() => handleDial(number)}
                        className="aspect-square rounded-xl bg-white/5 hover:bg-white/10 font-medium text-xl
                                   transition-all duration-200 hover:scale-105 active:scale-95"
                      >
                        {number}
                      </button>
                    ))}
                  </React.Fragment>
                ))}
              </div>

              <div className="flex justify-center items-center space-x-4">
                <button
                  onClick={handleCall}
                  className={`px-6 py-4 rounded-full flex items-center space-x-2 transition-all bg-green-500 hover:bg-green-600`}
                >
                  <Phone className="w-5 h-5" />
                  <span>Call</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Configuration */}
        <div className={`transition-all duration-300 ${isConfigOpen ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
          <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-6">Configuration</h3>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Retell API key"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Your Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1234567890"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Dynamic Variables
              </label>
              <div className="space-y-2">
                {Object.entries(dynamicVariables).map(([key, value]) => (
                  <div key={key} className="flex gap-2">
                    <input
                      type="text"
                      value={key}
                      disabled
                      className="input-field w-1/3 bg-gray-700/50"
                    />
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleUpdateField(key, e.target.value)}
                      className="input-field w-2/3"
                    />
                    <button
                      onClick={() => handleRemoveField(key)}
                      className="p-2 text-red-400 hover:text-red-300"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFieldKey}
                    onChange={(e) => setNewFieldKey(e.target.value)}
                    placeholder="New field name"
                    className="input-field w-1/3"
                  />
                  <input
                    type="text"
                    value={newFieldValue}
                    onChange={(e) => setNewFieldValue(e.target.value)}
                    placeholder="Value"
                    className="input-field w-2/3"
                  />
                  <button
                    onClick={handleAddField}
                    className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;