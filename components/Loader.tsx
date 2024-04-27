import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'
interface LoaderProps {
  style?: string;
}
const Loader:React.FC<LoaderProps> = ({style}) => {
  return (
    <div className={`w-full flex justify-center ${style}`}>
        <InfinitySpin
  // visible={true}
  width="200"
  color="#008F89"
  // ariaLabel="infinity-spin-loading"
  />
    </div>
  )
}

export default Loader