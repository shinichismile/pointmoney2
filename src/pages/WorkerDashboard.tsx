import React from 'react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Wallet, TrendingUp, ArrowUpRight, Trophy } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import type { PointTransaction } from '../types';

const mockTransactions: PointTransaction[] = [
  { id: '1', userId: '1', amount: 500, type: 'earned', status: 'approved', timestamp: '2024-03-10T10:00:00', description: 'タスク完了ボーナス' },
  { id: '2', userId: '1', amount: 300, type: 'earned', status: 'approved', timestamp: '2024-03-09T15:30:00', description: 'プロジェクトマイルストーン達成' },
  { id: '3', userId: '1', amount: 200, type: 'withdrawn', status: 'pending', timestamp: '2024-03-08T09:15:00', description: '出金リクエスト' }
];

const chartData = [
  { name: '月', points: 300 },
  { name: '火', points: 450 },
  { name: '水', points: 200 },
  { name: '木', points: 600 },
  { name: '金', points: 350 },
  { name: '土', points: 400 },
  { name: '日', points: 500 }
];

export default function WorkerDashboard() {
  const user = useAuthStore(state => state.user);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-indigo-50 rounded-lg">
              <Wallet className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">保有ポイント</p>
              <p className="text-2xl font-bold text-gray-900">{user?.points?.toLocaleString() ?? 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">今週の獲得</p>
              <p className="text-2xl font-bold text-gray-900">2,800</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-amber-50 rounded-lg">
              <ArrowUpRight className="h-6 w-6 text-amber-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">先週比</p>
              <p className="text-2xl font-bold text-green-600">+15%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Trophy className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">ランキング</p>
              <p className="text-2xl font-bold text-gray-900">3位</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">週間獲得ポイント</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Bar dataKey="points" fill="#4F46E5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">最近の取引</h2>
          <div className="space-y-3">
            {mockTransactions.map((transaction) => (
              <div key={transaction.id} 
                className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-indigo-100 transition-colors">
                <div>
                  <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                  <p className="text-xs text-gray-500">
                    {format(new Date(transaction.timestamp), 'M月d日 HH:mm', { locale: ja })}
                  </p>
                </div>
                <div className={`text-sm font-bold ${
                  transaction.type === 'earned' 
                    ? 'text-green-600 bg-green-50' 
                    : 'text-red-600 bg-red-50'
                } px-3 py-1 rounded-full`}>
                  {transaction.type === 'earned' ? '+' : '-'}{transaction.amount.toLocaleString()} P
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}