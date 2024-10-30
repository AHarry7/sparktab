const AskGpt = () => {
  return (
    <div className="container mx-auto max-w-lg p-0">
      <div className="input-container flex gap-4">
        <input
          type="text"
          placeholder="Enter Your goal..."
          className="input input-bordered w-full bg-gray-800 text-white rounded-lg"
        />
        <button
          // onClick={handleButtonClick}
          className="btn btn-md  border-none bg-green-600 hover:bg-green-700 text-white rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AskGpt;
