import Header from "../common/header"

const LoadingEmployee = () => {
  return (
         <div className="min-h-screen bg-[#0a0a0a] font-quicksand">
            <Header />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-gray-800/50 p-8 animate-pulse">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-gray-700"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-700 rounded w-1/3 mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-20 bg-gray-700/30 rounded-xl"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
  )
}

export default LoadingEmployee
