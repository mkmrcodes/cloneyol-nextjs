import { useContext, useState } from 'react';
import Modal from 'react-modal';
import { BsExclamationCircleFill } from 'react-icons/bs';
import { TiShoppingCart } from 'react-icons/ti';
import { BasketContext } from '../../store/BasketContext';

Modal.setAppElement('#__next');
const customStyles = {
  content: {
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '550px',
    height: '300px',
    padding: '0px',
  },
};

const DeleteModal = ({ modalIsOpen, setIsOpen, item, pb }) => {
  const { removeBasket } = useContext(BasketContext);
  function closeModal() {
    setIsOpen(false);
  }
  async function handleRemove() {
    if (pb) {
      await removeBasket(item, pb.id);
    } else {
      await removeBasket(item, localStorage._ym_uid);
    }
    setIsOpen(false);
  }
  return (
    <div>
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Example Modal'
        overlayClassName={'fixed top-0 left-0 right-0 bottom-0 bg-smoke z-50'}
      >
        <div className={'h-full'}>
          <div
            className={'text-gray-400 text-right cursor-pointer mr-2 '}
            onClick={() => setIsOpen(false)}
          >
            X
          </div>
          <div className={'flex justify-center mt-4'}>
            <div
              className={
                'w-20 h-20 rounded-full border-2 border-gray-600 relative'
              }
            >
              <TiShoppingCart
                className={
                  'absolute top-[21%] left-[18%] w-12 h-12 text-gray-600'
                }
              />
              <div className={'absolute top-[10%] left-[80%] w-7 h-7 bg-white'}>
                <BsExclamationCircleFill
                  className={'absolute top-[5%] left-[1%] w-6 h-6 text-primary'}
                />
              </div>
            </div>
          </div>
          <div className={'h-16 text-base text-gray-500 px-4 text-center mt-4'}>
            <strong>{item.product.name} </strong>
            adlı ürünü sepetinizden çıkarmak istediğinize emin misiniz?
          </div>
          <div>
            <div className={'border-b mt-6'}></div>

            <div className={'flex mt-4 px-4'}>
              <button
                className={
                  'w-[50%] font-bold text-sm border border-gray-300 mr-4 p-2 hover:bg-gray-200'
                }
                onClick={() => setIsOpen(false)}
              >
                Vazgeç
              </button>
              <button
                className={
                  'w-[50%] font-bold text-sm border border-gray-300 p-2 hover:bg-gray-200'
                }
                onClick={() => handleRemove()}
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteModal;
