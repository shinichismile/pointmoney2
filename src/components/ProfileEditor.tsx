import React, { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { Edit2, Check, X } from 'lucide-react';
import { toast } from 'sonner';

export default function ProfileEditor() {
  const { user, updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [avatarSeed, setAvatarSeed] = useState(user?.email || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('名前を入力してください');
      return;
    }

    updateProfile({ name, avatarSeed });
    setIsEditing(false);
    toast.success('プロフィールを更新しました');
  };

  const handleRandomAvatar = () => {
    setAvatarSeed(Math.random().toString(36).substring(7));
  };

  if (!isEditing) {
    return (
      <div className="flex items-center space-x-3">
        <img
          className="h-9 w-9 rounded-full ring-2 ring-indigo-600/20"
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.avatarSeed || user?.email}`}
          alt="プロフィール"
        />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">{user?.name}</span>
          <span className="text-xs text-gray-500">
            {user?.role === 'admin' ? '管理者' : 'ワーカー'}
          </span>
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
        >
          <Edit2 className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-3">
      <div className="relative group">
        <img
          className="h-9 w-9 rounded-full ring-2 ring-indigo-600/20 cursor-pointer"
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`}
          alt="プロフィール"
          onClick={handleRandomAvatar}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Edit2 className="h-4 w-4 text-white" />
        </div>
      </div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="block w-32 px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="名前"
      />
      <div className="flex space-x-1">
        <button
          type="submit"
          className="p-1 text-green-600 hover:text-green-700 transition-colors"
        >
          <Check className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="p-1 text-red-600 hover:text-red-700 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}