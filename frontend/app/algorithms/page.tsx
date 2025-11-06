'use client'

import Link from 'next/link'
import { TrendingUp, Target, Network, Shield, Brain, Sparkles, ArrowRight } from 'lucide-react'

export default function Algorithms() {
  const algorithms = [
    {
      id: 'linear-regression',
      name: 'Linear Regression',
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500',
      purpose: 'Predict Skin Hydration Levels',
      description: 'Linear Regression is a statistical method that models the relationship between input variables and a continuous output. In SkinSync, it predicts skin hydration levels based on age, oil production, sensitivity, and pore size.',
      businessValue: 'Helps users understand their skin\'s moisture needs and select appropriate hydration products.',
      howItWorks: [
        'Analyzes relationships between user characteristics and hydration',
        'Creates a mathematical model to predict hydration scores',
        'Provides numerical predictions on a 1-10 scale',
        'Recommends product intensity based on predicted levels'
      ],
      dataUsed: 'Age, oil production, sensitivity level, pore size',
      output: 'Predicted hydration level (1-10) with product recommendations'
    },
    {
      id: 'naive-bayes',
      name: 'Naive Bayes',
      icon: Target,
      color: 'from-purple-500 to-pink-500',
      purpose: 'Classify Skin Type',
      description: 'Naive Bayes is a probabilistic classifier based on Bayes\' theorem. It calculates the probability of each skin type given the user\'s characteristics and selects the most likely classification.',
      businessValue: 'Accurately identifies skin type (Oily, Dry, Combination, Sensitive, Normal) for targeted product selection.',
      howItWorks: [
        'Calculates probability of each skin type given user features',
        'Uses historical data patterns for classification',
        'Provides confidence scores for predictions',
        'Enables targeted product filtering by skin type'
      ],
      dataUsed: 'Age, oil production, hydration level, sensitivity level, pore size',
      output: 'Skin type classification with confidence percentage and specific recommendations'
    },
    {
      id: 'knn',
      name: 'K-Nearest Neighbors',
      icon: Network,
      color: 'from-green-500 to-emerald-500',
      purpose: 'Product Recommendation',
      description: 'KNN finds users with similar skin profiles and recommends products based on what similar users liked. It\'s a collaborative filtering approach that leverages the wisdom of crowds.',
      businessValue: 'Provides personalized recommendations based on real user experiences from similar profiles.',
      howItWorks: [
        'Finds the 5 most similar users in the database',
        'Analyzes what products those users liked',
        'Recommends products with high satisfaction from similar users',
        'Updates recommendations as new user data arrives'
      ],
      dataUsed: 'Age, oil production, hydration level, sensitivity level, pore size, wrinkle score',
      output: 'Product recommendation (Yes/No) with confidence based on similar users\' experiences'
    },
    {
      id: 'svm',
      name: 'Support Vector Machine',
      icon: Shield,
      color: 'from-red-500 to-orange-500',
      purpose: 'Allergen Risk Detection',
      description: 'SVM is a powerful classification algorithm that finds the optimal boundary between safe and risky products. It\'s particularly effective for binary classification like allergen detection.',
      businessValue: 'Prevents allergic reactions and skin irritation by identifying potentially harmful product combinations.',
      howItWorks: [
        'Analyzes product ingredients against sensitivity profiles',
        'Creates decision boundaries between safe and risky products',
        'Considers fragrance, alcohol, and hypoallergenic properties',
        'Provides risk probability and safety warnings'
      ],
      dataUsed: 'Sensitivity level, has fragrance, has alcohol, is hypoallergenic',
      output: 'Risk level (High/Low), probability of reaction, and safety advice'
    },
    {
      id: 'decision-tree',
      name: 'Decision Tree',
      icon: Brain,
      color: 'from-yellow-500 to-amber-500',
      purpose: 'Product Suitability Classification',
      description: 'Decision Trees create a flowchart-like structure of questions to classify whether a product is suitable. Each branch represents a decision based on a feature, making the logic transparent and interpretable.',
      businessValue: 'Determines overall product suitability by analyzing multiple factors in a logical, explainable way.',
      howItWorks: [
        'Creates decision rules based on user and product features',
        'Evaluates skin type compatibility',
        'Checks ingredient safety for user profile',
        'Provides clear yes/no suitability verdict'
      ],
      dataUsed: 'Age, sensitivity level, oil production, hydration level, product suitability flags, fragrance, alcohol',
      output: 'Suitability classification (Suitable/Not Suitable) with confidence and expected satisfaction'
    },
    {
      id: 'ann',
      name: 'Artificial Neural Network',
      icon: Sparkles,
      color: 'from-indigo-500 to-purple-500',
      purpose: 'Advanced Satisfaction Prediction',
      description: 'Neural Networks mimic the human brain\'s structure to learn complex patterns. Our deep learning model analyzes intricate relationships between user profiles and product features to predict satisfaction scores.',
      businessValue: 'Provides the most accurate satisfaction predictions by learning from complex, non-linear patterns in the data.',
      howItWorks: [
        'Uses multiple layers of artificial neurons',
        'Learns complex patterns through training on 3000+ interactions',
        'Identifies non-obvious relationships between features',
        'Continuously improves with more data'
      ],
      dataUsed: 'All user profile features + all product features (12 inputs total)',
      output: 'Predicted satisfaction score (1-10) with rating and detailed recommendation'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Our ML Algorithms
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Six powerful machine learning algorithms working together to personalize your skincare journey
          </p>
        </div>

        <div className="space-y-8">
          {algorithms.map((algo, index) => {
            const Icon = algo.icon
            return (
              <div key={algo.id} id={algo.id} className="bg-white rounded-2xl shadow-xl overflow-hidden scroll-mt-24">
                <div className={`h-2 bg-gradient-to-r ${algo.color}`}></div>
                <div className="p-8">
                  <div className="flex items-start gap-6">
                    <div className={`flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br ${algo.color} flex items-center justify-center`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h2 className="text-3xl font-bold text-gray-900 mb-2">{algo.name}</h2>
                          <p className="text-lg font-semibold text-purple-600">{algo.purpose}</p>
                        </div>
                        <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                          Algorithm #{index + 1}
                        </span>
                      </div>

                      <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                        {algo.description}
                      </p>

                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="p-4 bg-blue-50 rounded-xl">
                          <h3 className="font-bold text-gray-900 mb-3">💼 Business Value</h3>
                          <p className="text-gray-700">{algo.businessValue}</p>
                        </div>

                        <div className="p-4 bg-green-50 rounded-xl">
                          <h3 className="font-bold text-gray-900 mb-3">📊 Data Used</h3>
                          <p className="text-gray-700">{algo.dataUsed}</p>
                        </div>
                      </div>

                      <div className="p-4 bg-purple-50 rounded-xl mb-6">
                        <h3 className="font-bold text-gray-900 mb-3">⚙️ How It Works</h3>
                        <ul className="space-y-2">
                          {algo.howItWorks.map((step, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-700">
                              <span className="text-purple-600 font-bold">•</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                        <h3 className="font-bold text-gray-900 mb-2">📤 Output</h3>
                        <p className="text-gray-700">{algo.output}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience the Power of ML?</h2>
          <p className="text-xl mb-6 opacity-90">
            Test all 6 algorithms with your own skin profile
          </p>
          <Link 
            href="/try-now"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:shadow-2xl transition-all"
          >
            Try Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
