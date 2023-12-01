import { ModalType } from '../Types';
import Dialog from '../components/Dialog';
import AddorEditMovieForm from './AddorEditMovieModalForm';

interface Props {
  modalTitle: string;
  setIsMovieModalOpen: (open: boolean) => void;
  movie?: any;
  modalType: ModalType;
}

const AddorEditMovieModal = ({ modalTitle, setIsMovieModalOpen, movie, modalType }: Props) => {
  return (
    <div className="xs:p-6 mx-3 flex h-[80vh] flex-col gap-6 rounded-lg border border-zinc-900 bg-white p-4 shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_10px_10px_-5px_rgba(0,0,0,0.04)] sm:h-fit ">
      <Dialog.Title className="text-lg font-semibold leading-[24px] text-black">
        {modalTitle}
      </Dialog.Title>
      <AddorEditMovieForm
        setIsMovieModalOpen={setIsMovieModalOpen}
        movie={movie}
        modalType={modalType}
      />
    </div>
  );
};

export default AddorEditMovieModal;
