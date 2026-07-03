import React from 'react'

const ErrorInterface = () => {
  return (
    
           <div className="min-h-screen bg-[#0a0a0a] font-quicksand flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 rounded-2xl p-8 max-w-md w-full text-center backdrop-blur-sm">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-red-400 text-xl font-semibold mb-2">Failed to Load Data</h3>
          <p className="text-gray-400 mb-6">We couldn't fetch your employee data. Please try again.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-colors  cursor-pointer"
          >
            Retry
          </button>
        </div>
      </div>

  )
}

export default ErrorInterface
