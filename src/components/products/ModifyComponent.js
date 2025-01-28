import { useEffect, useState, useRef } from 'react';
import { getOne, deleteOne, putOne } from '../../api/productsApi';
import useCustomMove from '../../hooks/useCustomMove';
import ResultModal from '../common/ResultModal';
import FetchingModal from '../common/FetchingModal';
import { API_SERVER_HOST } from '../../api/todoApi';

const initState = {
  pno: 0,
  pname: '',
  pdesc: '',
  price: 0,
  uploadFileNames: []
}

const host = API_SERVER_HOST 

const ModifyComponent = ({ pno }) => {
  const [product, setProduct] = useState(initState)

  const [fetching, setFetching] = useState(false)

  const [result, setResult] = useState(null)

 const uploadRef = useRef()

  const { moveToList, moveToRead } = useCustomMove();

  useEffect(() => {
    setFetching(true)
    getOne(pno).then((data) => {
      console.log(data)
      setProduct(data)
      setFetching(false)
  })
  }, [pno])

  const handleClickModify = () => {

    const files = uploadRef.current.files
    const formData = new FormData()

    for(let i = 0;i<files.length; i++){
      formData.append("files", files[i])
    }

    formData.append("pname",product.pname)
    formData.append("pdesc",product.pdesc)
    formData.append("delFlag",product.delFlag)
    formData.append("price",product.price)
    
    for(let i = 0;i<product.uploadFileNames.length; i++){
      formData.append("uploadFileNames", product.uploadFileNames[i])
    }

    setFetching(true)

    putOne(pno, formData).then((data) => {
      console.log('modify result: ' + data);
      setResult('Modified');
      setFetching(false)
    })
  }

  const handleClickDelete = () => {
    setFetching(true)
    deleteOne(pno).then((data) => {
      console.log('delete result: ' + data);
      setResult('Deleted');
      setFetching(false)
    });
  };

  const closeModal = () => {
    if (result === 'Deleted') {
      moveToList({page:1});
    } else if(result === 'Modified') {
      moveToRead(pno);
    }

    setResult(null)
  };

  const handleChangeProduct = (e) => {
    product[e.target.name] = e.target.value;
    setProduct({ ...product });
  };

  const deleteOldImages = (imageName) => {
    const resultFileNames = product.uploadFileNames.filter(fileName => fileName !== imageName)
    product.uploadFileNames = resultFileNames

    setProduct({...product})
  }
  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      Product Modify Component
      {fetching? <FetchingModal/>:<></>}
      {result ? (
        <ResultModal
          title={'처리결과'}
          content={result}
          callbackFn={closeModal}
        ></ResultModal>
      ) : (
        <></>
      )}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Pname</div>
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
          <div className="w-1/5 p-6 text-right font-bold">Pdesc</div>
          <textarea
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="pdesc"
            rows="4"
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
          <div className="w-1/5 p-6 text-right font-bold">DELETE</div>
          <select
            name="delFlag"
            value={product.delFlag}
            onChange={handleChangeProduct}
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md">
              <option value={false}>사용</option>
              <option value={true}>삭제</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Files</div>
          <input ref={uploadRef}
            type={'file'} multiple={true}
             className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md">
          </input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
        <div className="w-1/5 p-6 text-right font-bold"> Images     </div>
         <div className="w-4/5 justify-center flex flex-wrap items-start">
        
              {product.uploadFileNames.map((imgFile, i) => 
                  <div
                  className="flex justify-center flex-col w-1/3 m-1 align-baseline" 
                  key = {i}>
                   <button className='bg-blue-500 text-3xl text-white' onClick={()=>deleteOldImages(imgFile)}>DELETE</button>
                   <img
                   alt="img"
                   src={`${host}/api/products/view/s_${imgFile}`}/>
               </div>
          )}
        </div>
      </div>
      </div>

      <div className='flex justify-end p-4'>
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32 bg-orange-500 text-white "
          onClick={handleClickModify}
        >
          Modify
        </button>
              
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 bg-blue-500 text-white "
          onClick={moveToList}
        >
          List
        </button>
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 bg-red-500 text-white "
          onClick={handleClickDelete}
        >
          Delete
        </button>
        </div>



    </div>
  );
}

export default ModifyComponent;
