'use client'

import { Users, Target, Eye, Award } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            About SkinSync
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionizing skincare through the power of machine learning and data science
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              To empower people to make smarter skincare choices by using intelligent, data-driven insights 
              that ensure safety, compatibility, and visible results, helping everyone achieve healthy and 
              radiant skin without fear of harmful reactions.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Vision</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              To become the leading skincare technology company that redefines beauty through personalization, 
              making healthy and glowing skin achievable for everyone, everywhere.
            </p>
          </div>
        </div>

        {/* Company Story */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Story</h2>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              SkinSync was born from a simple yet powerful observation: millions of people struggle to find 
              skincare products that truly work for their unique skin. Traditional product recommendations 
              often rely on general categories like "oily" or "dry" skin, ignoring the complex, individual 
              nature of each person's skin profile.
            </p>
            <p>
              We recognized that machine learning could solve this problem by analyzing patterns across 
              thousands of user profiles and product formulations. By leveraging six powerful ML algorithms, 
              we can predict with remarkable accuracy which products will work best for each individual, 
              preventing costly mistakes and harmful reactions.
            </p>
            <p>
              Our platform combines Linear Regression for hydration prediction, Naive Bayes for skin type 
              classification, K-Nearest Neighbors for personalized recommendations, Support Vector Machines 
              for allergen detection, Decision Trees for suitability analysis, and Artificial Neural Networks 
              for advanced satisfaction prediction.
            </p>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Technology</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Frontend</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Next.js 14</li>
                <li>• React 18</li>
                <li>• TailwindCSS</li>
                <li>• TypeScript</li>
              </ul>
            </div>
            <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Backend</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• FastAPI</li>
                <li>• Python</li>
                <li>• Scikit-learn</li>
                <li>• TensorFlow</li>
              </ul>
            </div>
            <div className="p-6 bg-gradient-to-br from-pink-50 to-blue-50 rounded-xl">
              <h3 className="text-xl font-bold mb-3 text-gray-900">ML Algorithms</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Linear Regression</li>
                <li>• Naive Bayes</li>
                <li>• KNN</li>
                <li>• SVM</li>
                <li>• Decision Trees</li>
                <li>• Neural Networks</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose SkinSync?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="font-bold mb-2">Data-Driven</h3>
              <p className="text-sm opacity-90">Recommendations based on real data patterns</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="font-bold mb-2">Personalized</h3>
              <p className="text-sm opacity-90">Tailored to your unique skin profile</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="font-bold mb-2">Safe</h3>
              <p className="text-sm opacity-90">Allergen detection prevents reactions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8" />
              </div>
              <h3 className="font-bold mb-2">Transparent</h3>
              <p className="text-sm opacity-90">Clear explanations of every prediction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
