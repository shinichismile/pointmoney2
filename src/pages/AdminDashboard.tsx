import React, { useState } from 'react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Wallet, TrendingUp, Clock, Plus } from 'lucide-react';
import { toast } from 'sonner';
import type { Worker, WithdrawalRequest } from '../types';

const mockWorkers: Worker[] = [
  { id: '1', name: '山田 太郎', email: 'yamada@example.com', points: 1500, totalEarned: 5000, joinedAt: '2024-01-15', status: 'active' },
  { id: '2', name: '佐藤 花子', email: 'sato@example.com', points: 2300, totalEarned: 7500, joinedAt: '2024-02-01', status: 'active' },
  { id: '3', name: '鈴木 一郎', email: 'suzuki@example.com', points: 800, totalEarned: 3000, joinedAt: '2024-02-15', status: 'active' },
];

const mockWithdrawals: WithdrawalRequest[] = [
  {
    id: '1',
    userId: '1',
    amount: 5000,
    status: 'pending',
    timestamp: '2024-03-10T09:00:00',
    paymentMethod: { type: 'bank', details: { bank: '○○銀行', branch: '××支店', account: '1234567' } }
  },
  {
    id: '2',
    userId: '2',
    amount: 3000,
    status: 'pending',
    timestamp: '2024-03-09T15:30:00',
    paymentMethod: { type: 'paypal', details: { email: 'sato@example.com' } }
  }
];

const chartData = [
  { name: '3/4', total: 15000 },
  { name: '3/5', total: 18000 },
  { name: '3/6', total: 12000 },
  { name: '3/7', total: 21000 },
  { name: '3/8', total: 16000 },
  { name: '3/9', total: 19000 },
  { name: '3/10', total: 23000 }
];

export default function AdminDashboard() {
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [pointAmount, setPointAmount] = useState<string>('');
  const [reason, setReason] = useState<string>('');

  const handleAssignPoints = () => {
    if (!selectedWorker || !pointAmount || !reason) {
      toast.error('すべての項目を入力してください');
      return;
    }

    const amount = parseInt(pointAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('有効なポイント数を入力してください');
      return;
    }

    // ここで実際のポイント付与APIを呼び出す
    toast.success(`${selectedWorker.name}さんに${amount.toLocaleString()}ポイントを付与しました`);
    setSelectedWorker(null);
    setPointAmount('');
    setReason('');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-indigo-50 rounded-lg">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">アクティブユーザー</p>
              <p className="text-2xl font-bold text-gray-900">{mockWorkers.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <Wallet className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">総発行ポイント</p>
              <p className="text-2xl font-bold text-gray-900">124,500</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-amber-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-amber-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">今月の発行</p>
              <p className="text-2xl font-bold text-gray-900">45,800</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">保留中の申請</p>
              <p className="text-2xl font-bold text-gray-900">{mockWithdrawals.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">ポイント付与</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ワーカー
            </label>
            <select
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedWorker?.id || ''}
              onChange={(e) => {
                const worker = mockWorkers.find(w => w.id === e.target.value);
                setSelectedWorker(worker || null);
              }}
            >
              <option value="">選択してください</option>
              {mockWorkers.map((worker) => (
                <option key={worker.id} value={worker.id}>
                  {worker.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ポイント数
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                step="1"
                value={pointAmount}
                onChange={(e) => setPointAmount(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="100"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">P</span>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              付与理由
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="タスク完了ボーナス"
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={handleAssignPoints}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            ポイントを付与
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">ポイント発行推移</h2>
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
                <Bar dataKey="total" fill="#4F46E5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">アクティブワーカー</h2>
          <div className="space-y-3">
            {mockWorkers.map((worker) => (
              <div key={worker.id} 
                className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-indigo-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${worker.email}`}
                    alt={worker.name}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{worker.name}</p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(worker.joinedAt), 'yyyy年M月d日から', { locale: ja })}
                    </p>
                  </div>
                </div>
                <div className="text-sm font-bold text-indigo-600">
                  {worker.points.toLocaleString()} P
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}