import { useParams } from 'react-router-dom';
import ReadComponent from '../../components/todo/ReadComponent';

const ReadPage = () => {
  const { tno } = useParams();

  return (
    <div className="font-extrabold w-full bg-white mt-6">
      Todo Read Page Component {tno}
      <ReadComponent tno={tno}></ReadComponent>
    </div>
  );
};

export default ReadPage;
