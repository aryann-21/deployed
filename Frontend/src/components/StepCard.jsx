const StepCard = ({ step, title, description }) => {
  return (
    <div className="bg-white shadow-lg p-4 sm:p-6 rounded-lg w-full sm:w-64 md:w-72 flex flex-col items-center">
      <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
        {step.split(" ")[1]}
      </div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm sm:text-base text-gray-600">{description}</p>
    </div>
  )
}

export default StepCard

