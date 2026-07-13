


const Stats = ({ stats,animateStats }: any) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
               <div className={`bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-gray-800/50 p-5 backdrop-blur-sm transition-all duration-700 transform ${animateStats ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                 <div className="flex items-center justify-between">
                   <div>
                     <p className="text-gray-400 text-sm font-medium">Total Employees</p>
                     <p className="text-2xl font-bold text-white mt-1">{stats.total}</p>
                   </div>
                 </div>
               </div>
   
               <div className={`bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-gray-800/50 p-5 backdrop-blur-sm transition-all duration-700 delay-100 transform ${animateStats ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                 <div className="flex items-center justify-between">
                   <div>
                     <p className="text-gray-400 text-sm font-medium">Departments</p>
                     <p className="text-2xl font-bold text-white mt-1">{stats.departments}</p>
                   </div>
                 </div>
                 
               </div>
   
               <div className={`bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-gray-800/50 p-5 backdrop-blur-sm transition-all duration-700 delay-200 transform ${animateStats ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                 <div className="flex items-center justify-between">
                   <div>
                     <p className="text-gray-400 text-sm font-medium">Avg. Salary</p>
                     <p className="text-2xl font-bold text-white mt-1">${stats.avgSalary.toLocaleString()}</p>
                   </div>
                  
                 </div>

               </div>
   
               <div className={`bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-gray-800/50 p-5 backdrop-blur-sm transition-all duration-700 delay-300 transform ${animateStats ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                 <div className="flex items-center justify-between">
                   <div>
                     <p className="text-gray-400 text-sm font-medium">Highest Salary</p>
                     <p className="text-2xl font-bold text-white mt-1">${stats.maxSalary.toLocaleString()}</p>
                   </div>
                 </div>
               </div>
             </div>
  );
};

export default Stats;
