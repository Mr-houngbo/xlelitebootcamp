'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function DebugPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testConnection = async () => {
    setLoading(true);
    addLog('Starting Supabase connection test...');
    
    try {
      // Test environment variables
      addLog(`NEXT_PUBLIC_SUPABASE_URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}`);
      addLog(`NEXT_PUBLIC_SUPABASE_ANON_KEY: ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}`);
      
      // Test basic connection
      const { data, error } = await supabase.from('groups').select('count').limit(1);
      if (error) {
        addLog(`❌ Connection error: ${error.message}`);
      } else {
        addLog('✅ Supabase connection successful');
      }
      
      // Test auth
      addLog('Testing authentication...');
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: 'test@example.com',
        password: 'testpassword'
      });
      
      if (authError) {
        addLog(`❌ Auth error: ${authError.message}`);
        addLog(`Error details: ${JSON.stringify(authError)}`);
      } else {
        addLog(`✅ Auth successful: ${authData.user?.email}`);
        addLog(`User session: ${authData.session ? '✅ Active' : '❌ No session'}`);
      }
      
    } catch (error: any) {
      addLog(`❌ Test failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testSignOut = async () => {
    try {
      await supabase.auth.signOut();
      addLog('✅ Signed out');
    } catch (error: any) {
      addLog(`❌ Sign out error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Supabase Debug</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex gap-4 mb-6">
            <button
              onClick={testConnection}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Testing...' : 'Test Connection & Auth'}
            </button>
            <button
              onClick={testSignOut}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Sign Out
            </button>
            <button
              onClick={() => setLogs([])}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Clear Logs
            </button>
          </div>
          
          <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm h-96 overflow-y-auto">
            {logs.length === 0 ? (
              <div className="text-gray-500">Click "Test Connection & Auth" to start debugging...</div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="mb-1">{log}</div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
