import React from 'react'
import Header from '../common/header'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const ErrorHandler = () => {
  return (
          <div className="min-h-screen bg-[#0a0a0a] font-quicksand">
              <Header />
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-red-500/20 p-12 text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-red-400 text-xl font-semibold mb-2">Employee Not Found</h3>
                  <p className="text-gray-400">The employee you're looking for doesn't exist or has been removed</p>
                  <Link 
                    href="/admin-dashboard" 
                    className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                  </Link>
                </div>
              </div>
            </div>

  )
}

export default  React.memo(ErrorHandler) 
