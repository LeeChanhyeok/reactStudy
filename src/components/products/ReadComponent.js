import { useEffect, useState } from 'react';
import { getOne } from '../../api/productsApi';
import useCustomMove from '../../hooks/useCustomMove';
import FetchingModal from '../common/FetchingModal';
import { API_SERVER_HOST } from '../../api/todoApi';
const initState = {
  pno: 0,
  pname: '',
  pdesc: '',
  price: 0,
  uploadFileNames: []
}

const ReadComponent = ({ pno }) => {
  const [product, setProduct] = useState(initState)

  const { moveToList, moveToModify } = useCustomMove()

  const [fetching, setFetching] = useState(false)

  const host = API_SERVER_HOST
  useEffect(() => {
    setFetching(true)
    getOne(pno).then((data) => {
      console.log(data)
      setProduct(data)
      setFetching(false)
      //setTodo(data);
    });
  }, [pno]);

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
        {fetching? <FetchingModal/> :<></>}

    <div className='flex justify-center mt-10'>
        <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
        <div className='w-1/5 p-6 text-right font-bold'>Pno</div>
        <div className='w-4/5 p-6 rounded-r border border-solid shadow-md'>
            {product.pno}
        </div>
        </div>
    </div>

      {makeDiv('Pname', product.pname)}
      {makeDiv('Pdesc', product.pdesc)}
      {makeDiv('Price', product.price)}
      <div className="w-full justify-center flex flex-col m-auto items-center">
                {product.uploadFileNames.map((imgFile, i) =>
                <img alt="product"
                key={i}
                className='p-4 w-1/2'
                src={`${host}/api/products/view/${imgFile}`}/>
                )}
        </div>

      <div className="flex justify-end p-4">
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={() => moveToList()}
        >
          List
        </button>
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={() => moveToModify(pno)}
        >
          Modify
        </button>
      </div>
    </div>
  );
};
const makeDiv = (title, value) => (
  <div className="flex justify-center">
    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
      <div className="w-1/5 p-6 text text-right font-bold">{title}</div>
      <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
        {value}
      </div>
    </div>
  </div>
);

export default ReadComponent
