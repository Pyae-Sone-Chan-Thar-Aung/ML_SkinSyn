'use client'

import { useState } from 'react'
import axios from 'axios'
import { Sparkles, TrendingUp, Target, Network, Shield, Brain, Loader2 } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function TryNow() {
  const [loading, setLoading] = useState<{[key: string]: boolean}>({})
  const [results, setResults] = useState<{[key: string]: any}>({})
  
  // User profile state
  const [profile, setProfile] = useState({
    age: 25,
    oil_production: 5,
    sensitivity_level: 5,
    pore_size: 5,
    hydration_level: 5,
    wrinkle_score: 3
  })

  // Product features state
  const [product, setProduct] = useState({
    has_fragrance: 0,
    has_alcohol: 0,
    is_hypoallergenic: 1,
    suitable_for_oily: 1,
    suitable_for_dry: 0,
    suitable_for_sensitive: 1
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    const numValue = type === 'range' || type === 'number' ? parseInt(value) : value
    
    if (name in profile) {
      setProfile({ ...profile, [name]: numValue })
    } else {
      setProduct({ ...product, [name]: numValue })
    }
  }

  const predict = async (algorithmType: string) => {
    setLoading({ ...loading, [algorithmType]: true })
    
    try {
      let endpoint = ''
      let data = {}

      switch (algorithmType) {
        case 'linear-regression':
          endpoint = '/predict/linear-regression'
          data = profile
          break
        case 'naive-bayes':
          endpoint = '/predict/naive-bayes'
          data = profile
          break
        case 'knn':
          endpoint = '/predict/knn'
          data = profile
          break
        case 'svm':
          endpoint = '/predict/svm'
          data = { ...profile, ...product }
          break
        case 'decision-tree':
          endpoint = '/predict/decision-tree'
          data = { ...profile, ...product }
          break
        case 'ann':
          endpoint = '/predict/ann'
          data = { ...profile, ...product }
          break
      }

      const response = await axios.post(`${API_URL}${endpoint}`, data)
      setResults({ ...results, [algorithmType]: response.data })
    } catch (error: any) {
      console.error('Error:', error)
      setResults({ 
        ...results, 
        [algorithmType]: { 
          error: error.response?.data?.detail || 'Failed to connect to API. Make sure backend is running.'
        } 
      })
    } finally {
      setLoading({ ...loading, [algorithmType]: false })
    }
  }

  // Format display values for better readability
  const formatValue = (key: string, value: any): string => {
    if (typeof value === 'boolean') return value ? 'Yes' : 'No'
    if (typeof value === 'number') return value.toString()
    if (typeof value === 'string') return value
    if (typeof value === 'object' && value !== null) {
      // Format probability objects more nicely
      if (key === 'all_probabilities') {
        return Object.entries(value)
          .map(([k, v]) => `${k}: ${typeof v === 'number' ? (v as number).toFixed(1) : v}%`)
          .join(', ')
      }
      // For other objects, format as readable JSON
      return JSON.stringify(value)
    }
    return String(value)
  }

  const algorithms = [
    { 
      id: 'linear-regression', 
      name: 'Linear Regression', 
      icon: TrendingUp, 
      color: 'from-blue-500 to-cyan-500',
      description: 'Predict skin hydration level',
      buttonText: 'Predict Hydration',
      badge: 'Algorithm #1'
    },
    { 
      id: 'naive-bayes', 
      name: 'Naive Bayes', 
      icon: Target, 
      color: 'from-purple-500 to-pink-500',
      description: 'Classify skin type',
      buttonText: 'Classify Skin Type',
      badge: 'Algorithm #2'
    },
    { 
      id: 'knn', 
      name: 'K-Nearest Neighbors', 
      icon: Network, 
      color: 'from-green-500 to-emerald-500',
      description: 'Product recommendation',
      buttonText: 'Get Recommendations',
      badge: 'Algorithm #3'
    },
    { 
      id: 'svm', 
      name: 'Support Vector Machine', 
      icon: Shield, 
      color: 'from-red-500 to-orange-500',
      description: 'Allergen risk detection',
      buttonText: 'Check Allergen Risk',
      badge: 'Algorithm #4'
    },
    { 
      id: 'decision-tree', 
      name: 'Decision Tree', 
      icon: Brain, 
      color: 'from-yellow-500 to-amber-500',
      description: 'Product suitability',
      buttonText: 'Check Suitability',
      badge: 'Algorithm #5'
    },
    { 
      id: 'ann', 
      name: 'Neural Network', 
      icon: Sparkles, 
      color: 'from-indigo-500 to-purple-500',
      description: 'Satisfaction prediction',
      buttonText: 'Predict Satisfaction',
      badge: 'Algorithm #6'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Try Our ML Algorithms
          </h1>
          <p className="text-xl text-gray-600 mb-3">
            Enter your profile and test all 6 machine learning algorithms in real-time
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-purple-600">
            <span className="font-semibold">Step 1:</span> Adjust your skin profile sliders
            <span className="mx-2">→</span>
            <span className="font-semibold">Step 2:</span> Configure product features
            <span className="mx-2">→</span>
            <span className="font-semibold">Step 3:</span> Click any algorithm button below
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Resources Panel */}
          <div className="lg:col-span-2 mb-2">
            <div className="bg-white/70 backdrop-blur rounded-2xl p-4 border border-purple-100 flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-purple-700">Resources:</span>
              <a
                href={`${API_URL}/docs`}
                target="_blank"
                rel="noreferrer"
                className="text-sm px-3 py-1 rounded-full bg-purple-50 text-purple-700 hover:bg-purple-100"
              >API Docs</a>
              <a
                href={`${API_URL}/rubric`}
                target="_blank"
                rel="noreferrer"
                className="text-sm px-3 py-1 rounded-full bg-pink-50 text-pink-700 hover:bg-pink-100"
              >Rubric</a>
              <a
                href={`${API_URL}/models/metrics`}
                target="_blank"
                rel="noreferrer"
                className="text-sm px-3 py-1 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100"
              >Training Metrics</a>
            </div>
          </div>

          {/* User Profile Input */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Your Skin Profile</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Age: {profile.age} years
                </label>
                <input
                  type="range"
                  name="age"
                  min="18"
                  max="70"
                  value={profile.age}
                  onChange={handleInputChange}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Oil Production: {profile.oil_production}/10
                </label>
                <input
                  type="range"
                  name="oil_production"
                  min="1"
                  max="10"
                  value={profile.oil_production}
                  onChange={handleInputChange}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">1 = Very Dry, 10 = Very Oily</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sensitivity Level: {profile.sensitivity_level}/10
                </label>
                <input
                  type="range"
                  name="sensitivity_level"
                  min="1"
                  max="10"
                  value={profile.sensitivity_level}
                  onChange={handleInputChange}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">1 = Not Sensitive, 10 = Very Sensitive</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pore Size: {profile.pore_size}/10
                </label>
                <input
                  type="range"
                  name="pore_size"
                  min="1"
                  max="10"
                  value={profile.pore_size}
                  onChange={handleInputChange}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hydration Level: {profile.hydration_level}/10
                </label>
                <input
                  type="range"
                  name="hydration_level"
                  min="1"
                  max="10"
                  value={profile.hydration_level}
                  onChange={handleInputChange}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Wrinkle Score: {profile.wrinkle_score}/10
                </label>
                <input
                  type="range"
                  name="wrinkle_score"
                  min="1"
                  max="10"
                  value={profile.wrinkle_score}
                  onChange={handleInputChange}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Product Features Input */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Product Features</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Has Fragrance</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="has_fragrance"
                    checked={product.has_fragrance === 1}
                    onChange={(e) => setProduct({...product, has_fragrance: e.target.checked ? 1 : 0})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Has Alcohol</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="has_alcohol"
                    checked={product.has_alcohol === 1}
                    onChange={(e) => setProduct({...product, has_alcohol: e.target.checked ? 1 : 0})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Is Hypoallergenic</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_hypoallergenic"
                    checked={product.is_hypoallergenic === 1}
                    onChange={(e) => setProduct({...product, is_hypoallergenic: e.target.checked ? 1 : 0})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Suitable for Oily Skin</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="suitable_for_oily"
                    checked={product.suitable_for_oily === 1}
                    onChange={(e) => setProduct({...product, suitable_for_oily: e.target.checked ? 1 : 0})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Suitable for Dry Skin</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="suitable_for_dry"
                    checked={product.suitable_for_dry === 1}
                    onChange={(e) => setProduct({...product, suitable_for_dry: e.target.checked ? 1 : 0})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">Suitable for Sensitive Skin</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="suitable_for_sensitive"
                    checked={product.suitable_for_sensitive === 1}
                    onChange={(e) => setProduct({...product, suitable_for_sensitive: e.target.checked ? 1 : 0})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Algorithm Buttons and Results */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-3 text-gray-900">
            Test Machine Learning Algorithms
          </h2>
          <p className="text-gray-600">
            Click on any algorithm below to see predictions based on your profile
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {algorithms.map((algo) => {
            const Icon = algo.icon
            return (
              <div key={algo.id} className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${algo.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                    {algo.badge}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-gray-900">{algo.name}</h3>
                <p className="text-gray-600 text-sm mb-6 min-h-[40px]">{algo.description}</p>
                
                <button
                  onClick={() => predict(algo.id)}
                  disabled={loading[algo.id]}
                  className={`w-full py-3 rounded-xl font-semibold text-white transition-all transform hover:scale-105 ${
                    loading[algo.id]
                      ? 'bg-gray-400 cursor-not-allowed'
                      : `bg-gradient-to-r ${algo.color} hover:shadow-lg`
                  }`}
                >
                  {loading[algo.id] ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Analyzing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Icon className="w-5 h-5 mr-2" />
                      {algo.buttonText}
                    </span>
                  )}
                </button>

                {/* Results */}
                {results[algo.id] && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    {results[algo.id].error ? (
                      <p className="text-red-600 text-sm break-words">{results[algo.id].error}</p>
                    ) : (
                      <div className="space-y-2 text-sm">
                        {Object.entries(results[algo.id]).map(([key, value]: [string, any]) => {
                          if (key === 'algorithm' || key === 'input_features') return null
                          return (
                            <div key={key} className="break-words">
                              <span className="font-semibold text-gray-700 capitalize">
                                {key.replace(/_/g, ' ')}:
                              </span>
                              <span className="ml-2 text-gray-900">
                                {formatValue(key, value)}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
