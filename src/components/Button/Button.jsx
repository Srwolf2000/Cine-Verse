export function PrimaryButton ({text}) {
    return(
        <button className=" w-fit bg-red-700  p-2 font-poppins font-semibold text-white  rounded-lg shadow-md transition duration-300 hover:rounded-lg  hover:bg-red-500  hover:shadow-red-500/50 hover:shadow-lg">
            {text}
        </button>
    )
}

export function SecondButton ({text}) {
    return(
        <button className="bg-gray-100  p-2  font-poppins font-semibold  text-black rounded-lg shadow-md transition duration-300 hover:rounded-lg   hover:bg-white hover:shadow-white hover:shadow-md">
            {text}
        </button>
    )
}

export function ThirdButton ({text}) {
    return(
        <button className="bg-black text-white p-1 rounded-lg shadow-md transition duration-300 hover:rounded-lg font-poppins font-semibold  hover:bg-black hover:shadow-white-500/50 hover:shadow-lg">
            {text}
        </button>
    )
}