import { useState, useRef } from 'react';
import { postAdd } from '../../api/productsApi';
import FetchingModal from '../common/FetchingModal';
import ResultModal from '../common/ResultModal';
import useCustomMove from '../../hooks/useCustomMove';

const initState = {
  pname: '',
  pdesc: '',
  price: 0,
  files: []
}

const AddComponent = () => {
  const [product, setProduct] = useState({ ...initState });

  const uploadRef = useRef()

  const [fetching, setFetching] = useState(false)
  const [result, setResult] = useState(null)

  const {moveToList} = useCustomMove()

  const handleChangeProduct = (e) => {
    product[e.target.name] = e.target.value;

    setProduct({ ...product });
  };

  const handleClickAdd = () => {
    console.log(product);
    const files = uploadRef.current.files

    const formData = new FormData()

    for (let i = 0; i< files.length; i++){
        formData.append("files", files[i]);
    }

    formData.append("pname", product.pname)
    formData.append("pdesc", product.pdesc)
    formData.append("price", product.price)
    
    setFetching(true)
    postAdd(formData).then(data => {
        setFetching(false)
        setResult(data.result)
    })
    
  }

  const closeModal = () => {
    setResult(null);
    moveToList();
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
        {fetching? <FetchingModal/> :<></>}

      {result ? (
        <ResultModal
          title={'Product Add Result'}
          content={`New ${result} Added`}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )
      }
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Product</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="pname"
            type={'text'}
            value={product.pname}
            onChange={handleChangeProduct}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Desc</div>
          <textarea
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
            name="pdesc"
            row="4"
            value={product.pdesc}
            onChange={handleChangeProduct}
          ></textarea>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Price</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="price"
            type={'number'}
            value={product.price}
            onChange={handleChangeProduct}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Files</div>
          <input ref={uploadRef}
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            type={'file'}
            multiple={true}
          ></input>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
          <button
            type="button"
            className="rounded p-4 w-36 bg-blue-500 text-xl text-white "
            onClick={handleClickAdd}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddComponent;
