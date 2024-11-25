import React from 'react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

const transactions = [
  { id: 1, date: new Date(), type: 'earned', amount: 500, description: 'タスク完了ボーナス', status: 'completed' },
  { id: 2, date: new Date(Date.now() - 24 * 60 * 60 * 1000), type: 'earned', amount: 300, description: 'プロジェクトマイルストーン達成', status: 'completed' },
  { id: 3, date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), type: 'withdrawn', amount: 1000, description: '出金申請', status: 'pending' },
  { id: 4, date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), type: 'earned', amount: 200, description: '日次ボーナス', status: 'completed' },
];

export default function PointHistory() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">ポイント履歴</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  日時
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  種類
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  説明
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ポイント
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ステータス
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {format(transaction.date, 'yyyy年M月d日 HH:mm', { locale: ja })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.type === 'earned'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {transaction.type === 'earned' ? '獲得' : '出金'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`font-medium ${
                        transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {transaction.type === 'earned' ? '+' : '-'}
                      {transaction.amount.toLocaleString()} P
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {transaction.status === 'completed' ? '完了' : '処理中'}
                    </span>
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