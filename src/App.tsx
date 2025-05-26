import './App.css'
import { Calendar } from './components/Calendar'
import { QuickActions } from './components/QuickActions'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header>
          <h1 className="text-4xl font-bold text-blue-600">FruitAddict</h1>
          <p className="mt-2 text-lg text-gray-600">Track your daily fruit consumption</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Calendar />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
