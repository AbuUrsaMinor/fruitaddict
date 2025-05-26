import { PlusIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useFruitStore } from '../store/fruitStore';

export function QuickActions() {
    const [showAddForm, setShowAddForm] = useState(false);
    const [newFruitName, setNewFruitName] = useState('');
    const [newFruitIcon, setNewFruitIcon] = useState('');

    const fruits = useFruitStore((state) => state.fruits ?? []);
    const addFruit = useFruitStore((state) => state.addFruit);
    const addEntry = useFruitStore((state) => state.addEntry);

    const handleAddFruit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newFruitName && newFruitIcon) {
            addFruit(newFruitName, newFruitIcon);
            setNewFruitName('');
            setNewFruitIcon('');
            setShowAddForm(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-4 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>

            <div className="grid grid-cols-3 gap-2">
                {fruits?.map((fruit) => (
                    <button
                        key={fruit.id}
                        onClick={() => addEntry(fruit.id)}
                        className="flex items-center justify-center gap-2 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                        <span className="text-2xl">{fruit.icon}</span>
                        <span className="text-sm font-medium">{fruit.name}</span>
                    </button>
                ))}
            </div>

            {showAddForm ? (
                <form onSubmit={handleAddFruit} className="space-y-3">
                    <div>
                        <label htmlFor="fruitName" className="block text-sm font-medium text-gray-700">
                            Fruit Name
                        </label>
                        <input
                            type="text"
                            id="fruitName"
                            value={newFruitName}
                            onChange={(e) => setNewFruitName(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="fruitIcon" className="block text-sm font-medium text-gray-700">
                            Fruit Icon (emoji)
                        </label>
                        <input
                            type="text"
                            id="fruitIcon"
                            value={newFruitIcon}
                            onChange={(e) => setNewFruitIcon(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Add Fruit
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowAddForm(false)}
                            className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <button
                    onClick={() => setShowAddForm(true)}
                    className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                >
                    <PlusIcon className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600">Add New Fruit</span>
                </button>
            )}
        </div>
    );
}
