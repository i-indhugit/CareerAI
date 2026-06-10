import React, { useState, useEffect } from 'react';
import { 
  Users, Award, Activity, ShieldCheck, TrendingUp, 
  BarChart2, Star, Calendar, ArrowRight, UserPlus
} from 'lucide-react';
import { 
  BarChart, Bar, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { apiService } from '../services/api';

export default function AdminPanel() {
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch admin analytical statistics
  const fetchAdminData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getAdminStats();
      setStats(data);
      
      // Pull users from mock DB for display/role modifications
      const dbUsers = JSON.parse(localStorage.getItem('mock_db_users') || '[]');
      setUsers(dbUsers);
    } catch (e: any) {
      setError(e.message || 'Failed to retrieve administrative diagnostics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  // Modify User Role (Promote/Demote)
  const handleToggleRole = (userId: string, currentRole: string) => {
    const dbUsers = JSON.parse(localStorage.getItem('mock_db_users') || '[]');
    const userIdx = dbUsers.findIndex((u: any) => u.id === userId);
    
    if (userIdx > -1) {
      dbUsers[userIdx].role = currentRole === 'admin' ? 'user' : 'admin';
      localStorage.setItem('mock_db_users', JSON.stringify(dbUsers));
      fetchAdminData();
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center gap-4">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-primary-600 rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-slate-500">Loading administrative metrics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4 px-6">
        <ShieldCheck className="w-12 h-12 text-rose-500 mx-auto" />
        <h3 className="font-title text-xl font-bold text-slate-800">Access Restricted</h3>
        <p className="text-sm text-slate-500 leading-relaxed">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* HUD Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="border border-slate-200 bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-xs font-bold uppercase text-slate-400">Total Users</span>
            <span className="text-2xl font-black text-slate-800">{stats?.totalUsers || 0}</span>
          </div>
        </div>

        <div className="border border-slate-200 bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-xs font-bold uppercase text-slate-400">Assessments</span>
            <span className="text-2xl font-black text-slate-800">{stats?.totalAssessments || 0}</span>
          </div>
        </div>

        <div className="border border-slate-200 bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-xs font-bold uppercase text-slate-400">Average Fit</span>
            <span className="text-2xl font-black text-slate-800">{stats?.averageScore || 0}%</span>
          </div>
        </div>

        <div className="border border-slate-200 bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-xs font-bold uppercase text-slate-400">Activity Level</span>
            <span className="text-2xl font-black text-slate-800">SaaS Ready</span>
          </div>
        </div>

      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Category Match Distribution Bar Chart */}
        <div className="border border-slate-200/80 rounded-2xl bg-white p-6 shadow-sm space-y-4">
          <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <BarChart2 className="w-4.5 h-4.5 text-primary-600" /> Assessment Category Splits
          </h4>
          
          {stats?.matchDistribution?.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              No distribution data available yet.
            </div>
          ) : (
            <div className="h-[240px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.matchDistribution} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                  <XAxis type="number" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis dataKey="category" type="category" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} width={90} />
                  <Tooltip 
                    contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '11px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
                  />
                  <Bar dataKey="count" name="Assessments" fill="#2563eb" radius={[0, 4, 4, 0]} barSize={14}>
                    {stats.matchDistribution.map((entry: any, index: number) => {
                      const colors = ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#3b82f6'];
                      return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Weekly Signup Line Graph */}
        <div className="border border-slate-200/80 rounded-2xl bg-white p-6 shadow-sm space-y-4">
          <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Calendar className="w-4.5 h-4.5 text-primary-600" /> User Signup Timeline
          </h4>

          {stats?.signupsTimeline?.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              No timeline data available.
            </div>
          ) : (
            <div className="h-[240px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.signupsTimeline} margin={{ top: 15, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    stroke="#94a3b8" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(tick) => {
                      try {
                        const parts = tick.split('-');
                        if (parts.length === 3) {
                          return `${parts[1]}/${parts[2]}`; // MM/DD
                        }
                        return tick;
                      } catch {
                        return tick;
                      }
                    }}
                  />
                  <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '11px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    name="Signups"
                    stroke="#2563eb" 
                    strokeWidth={2.5} 
                    activeDot={{ r: 6 }} 
                    dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

      </div>

      {/* User Management Accounts Table */}
      <div className="border border-slate-200/80 rounded-2xl bg-white p-6 shadow-sm space-y-4">
        <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <ShieldCheck className="w-4.5 h-4.5 text-primary-600" /> User Accounts Authorization Console
        </h4>

        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-400 font-bold uppercase border-b border-slate-100">
                <th className="p-3.5">User</th>
                <th className="p-3.5">Email</th>
                <th className="p-3.5">Role Authorization</th>
                <th className="p-3.5">Joined Date</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(userItem => (
                <tr key={userItem.id} className="border-b border-slate-150 hover:bg-slate-50/40">
                  <td className="p-3.5 font-bold text-slate-800 flex items-center gap-2.5">
                    <img 
                      src={userItem.photo || 'https://api.dicebear.com/7.x/adventurer/svg?seed=Default'} 
                      alt="" 
                      className="w-8 h-8 rounded-full border bg-slate-50"
                    />
                    <span>{userItem.name}</span>
                  </td>
                  <td className="p-3.5 font-medium text-slate-500">{userItem.email}</td>
                  <td className="p-3.5">
                    <span className={`
                      px-2 py-0.5 rounded-md font-bold uppercase text-[0.625rem] border
                      ${userItem.role === 'admin' ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-slate-100 border-slate-200 text-slate-600'}
                    `}>
                      {userItem.role}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-400 font-medium">
                    {new Date(userItem.createdAt || Date.now()).toLocaleDateString()}
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => handleToggleRole(userItem.id, userItem.role)}
                      className={`
                        font-bold px-3 py-1.5 rounded-lg border text-[0.675rem] transition focus:outline-none
                        ${userItem.role === 'admin' ? 'border-rose-200 hover:bg-rose-50 text-rose-600 bg-white' : 'border-purple-200 hover:bg-purple-50 text-purple-600 bg-white'}
                      `}
                    >
                      {userItem.role === 'admin' ? 'Demote to User' : 'Promote to Admin'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
