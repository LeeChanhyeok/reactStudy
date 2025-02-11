import { useEffect, useState } from 'react';
import { getList } from '../../api/productsApi';
import useCustomMove from '../../hooks/useCustomMove';
import PageComponent from '../common/PageComponent';
import FetchingModal from '../common/FetchingModal';
import { API_SERVER_HOST } from '../../api/todoApi';

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const host = API_SERVER_HOST

const ListComponent = () => {
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();

  const [serverData, setServerData] = useState(initState)

  const [fetching, setFetching] = useState(false)

  useEffect(() => {

    setFetching(true)

    getList({ page, size }).then((data) => {
      console.log(data)
      setServerData(data)
      setFetching(false)
    });
  }, [page, size, refresh]);

  return (
    <div className="border-2 border-blue-100 mt-100 mr-2 ml-2">
        <h1>Product List Component</h1>

        {fetching? <FetchingModal/> :<>s</>}
      <div className="flex flex-wrap mx-auto justify-center p-6">
        {serverData.dtoList.map((product) => (
          <div
            key={product.pno}
            className="w-1/2 p-1 rounded shadow-md border-2"
            onClick={() => moveToRead(product.pno)}
          >
            <div className="flex flex-col h-full">
              <div className="font-extrabold text-2xl p-2 w-full">
                {product.pno}
              </div>
              <div className="w-full overflow-hidden">
                <img alt="product"
                className='m-auto rounded-md w-60'
                src={`${host}/api/products/view/s_${product.uploadFileNames[0]}`}/>
                </div>

              <div className="bottom-0 bg-white font-extrabold">
              <div className="text-center p-1"> 
                이름: {product.pname}
              </div>

              <div className="text-center p-1">
                가격: {product.price}
              </div>
              
              </div>
            </div>
          </div>
        ))}
      </div>

      <PageComponent
        serverData={serverData}
        movePage={moveToList}
      ></PageComponent>
    </div>
  );
};

export default ListComponent;
