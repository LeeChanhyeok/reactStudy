import { useParams } from 'react-router-dom';
import ReadComponent from '../../components/products/ReadComponent';

const ReadPage = () => {
  const { pno } = useParams();

  return (
    <div className="font-extrabold w-full bg-white mt-6">
      Products Read Page Component {pno}
      <ReadComponent pno={pno}></ReadComponent>
    </div>
  );
};

export default ReadPage;
