import { Triangle } from 'react-loader-spinner'

const Loader = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
        <Triangle
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            />
    </div>
  )
}

export default Loader