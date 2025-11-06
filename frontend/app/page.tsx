'use client'

import Link from 'next/link'
import { Sparkles, Brain, Shield, Target, TrendingUp, Network } from 'lucide-react'

export default function Home() {
  const algorithms = [
    {
      name: 'Linear Regression',
      icon: TrendingUp,
      description: 'Predict skin hydration levels based on user characteristics',
      use: 'Helps determine moisture needs and product intensity',
      color: 'from-blue-500 to-cyan-500',
      link: '/algorithms#linear-regression'
    },
    {
      name: 'Naive Bayes',
      icon: Target,
      description: 'Classify skin type (Oily, Dry, Combination, Sensitive, Normal)',
      use: 'Identifies your skin type for targeted recommendations',
      color: 'from-purple-500 to-pink-500',
      link: '/algorithms#naive-bayes'
    },
    {
      name: 'K-Nearest Neighbors',
      icon: Network,
      description: 'Recommend products based on similar users',
      use: 'Finds products that worked for people like you',
      color: 'from-green-500 to-emerald-500',
      link: '/algorithms#knn'
    },
    {
      name: 'Support Vector Machine',
      icon: Shield,
      description: 'Detect potential allergen risks and reactions',
      use: 'Prevents allergic reactions and skin irritation',
      color: 'from-red-500 to-orange-500',
      link: '/algorithms#svm'
    },
    {
      name: 'Decision Tree',
      icon: Brain,
      description: 'Classify product suitability for your profile',
      use: 'Determines if a product matches your skin needs',
      color: 'from-yellow-500 to-amber-500',
      link: '/algorithms#decision-tree'
    },
    {
      name: 'Artificial Neural Network',
      icon: Sparkles,
      description: 'Advanced satisfaction prediction using deep learning',
      use: 'Predicts how satisfied you\'ll be with a product',
      color: 'from-indigo-500 to-purple-500',
      link: '/algorithms#ann'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            SkinSync
          </h1>
          <p className="text-2xl text-gray-700 mb-4">
            Personalized Skincare Through Machine Learning
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Discover the perfect skincare products for your unique skin using advanced AI algorithms. 
            We analyze your skin profile to prevent reactions and ensure optimal results.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/try-now" className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition-all">
              Try Now
            </Link>
            <Link href="/about" className="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold hover:shadow-lg transition-all border border-purple-200">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100">
              <h2 className="text-3xl font-bold mb-4 text-purple-900">Our Mission</h2>
              <p className="text-gray-700 text-lg">
                To empower people to make smarter skincare choices by using intelligent, data-driven insights 
                that ensure safety, compatibility, and visible results, helping everyone achieve healthy and 
                radiant skin without fear of harmful reactions.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100">
              <h2 className="text-3xl font-bold mb-4 text-purple-900">Our Vision</h2>
              <p className="text-gray-700 text-lg">
                To become the leading skincare technology company that redefines beauty through personalization, 
                making healthy and glowing skin achievable for everyone, everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ML Algorithms Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Our Machine Learning Algorithms
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Six powerful algorithms working together to personalize your skincare journey
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {algorithms.map((algo, index) => {
              const Icon = algo.icon
              return (
                <Link 
                  href={algo.link}
                  key={index}
                  className="group p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-100"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${algo.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{algo.name}</h3>
                  <p className="text-gray-600 mb-3 text-sm">{algo.description}</p>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-xs font-semibold text-purple-600 mb-1">BUSINESS USE:</p>
                    <p className="text-sm text-gray-700">{algo.use}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            How SkinSync Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Share Your Profile</h3>
              <p className="text-gray-600">Tell us about your skin type, concerns, and preferences</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-pink-600">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">AI Analysis</h3>
              <p className="text-gray-600">Our 6 ML algorithms analyze your data and product compatibility</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Get Recommendations</h3>
              <p className="text-gray-600">Receive personalized product recommendations and insights</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Find Your Perfect Skincare Match?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who trust AI to guide their skincare journey
          </p>
          <Link href="/try-now" className="inline-block px-10 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:shadow-2xl transition-all">
            Start Your Journey
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 SkinSync. Powered by Machine Learning. Made with care for your skin.
          </p>
        </div>
      </footer>
    </div>
  )
}
