const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col fixed top-0 left-0">
      <div className="text-2xl text-black">Loading..</div>
      <span className="border-4 border-gray-400 rounded-full border-t-blue-800 h-[100px] w-[100px] animate-spin"></span>
    </div>
  );
};

export default Loading;
