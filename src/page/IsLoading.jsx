
function IsLoading() {
    return (
        <div className="absolute flex justify-center items-center w-full h-full z-50 bg-black/50 backdrop-blur-md">

            <div className="w-20 h-20  flex flex-col items-center justify-center">
                <div className="w-12 h-12 my-5 border-4 border-white  rounded-full animate-spin"></div>
                <p className="font-poppins font-bold text-2xl text-white">Loading</p>
            </div>

        </div>
    )
}

export default IsLoading;