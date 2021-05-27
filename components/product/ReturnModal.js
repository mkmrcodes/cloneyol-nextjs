import { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#__next');
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    height: '600px',
  },
};

const ReturnModal = ({ modalIsOpen, setIsOpen }) => {
  function closeModal() {
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
        <div className={'h-full '}>
          <div className={'text-base text-black text-justify'}>
            <div className={'flex justify-between'}>
              <strong>İade Koşulları</strong>
              <button onClick={closeModal}>X</button>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              placerat metus tincidunt enim vestibulum commodo at nec tellus.
            </p>
          </div>
          <div className={'text-base text-black text-justify'}>
            <strong>Nasıl İade Ederim?</strong>
            <p>
              Nam convallis lacus in arcu varius vulputate. Mauris nunc nisl,
              tincidunt ut vulputate eu, vulputate non nunc. Donec pretium enim
              blandit arcu euismod, quis vulputate massa laoreet. Nam tristique
              euismod auctor. Nunc pharetra rhoncus ipsum et rhoncus. Fusce
              purus velit, vulputate in pharetra quis, auctor nec leo. Sed
              rutrum risus nunc, et tristique ligula feugiat et. Praesent quis
              ornare nunc. Praesent ullamcorper sapien semper consectetur
              pretium. Donec vitae varius sapien, et fermentum odio. Maecenas
              lacinia, ex nec auctor maximus, quam lacus luctus mauris, quis
              venenatis nisi nunc nec diam. Duis vehicula auctor purus at
              placerat. In tempor tristique vehicula. Sed et neque quis purus
              feugiat finibus. Sed pulvinar libero vel libero elementum, in
              congue ante cursus. Praesent sed hendrerit nibh. Pellentesque
              habitant morbi tristique senectus et netus et malesuada fames ac
              turpis egestas. Sed euismod dictum nibh vitae porta. Quisque
              interdum, eros eget tempus tristique, libero ex auctor ligula, at
              cursus felis arcu sed nibh. Nam efficitur a felis at porta.
              Phasellus interdum lorem diam, sit amet sodales dolor tristique
              sed. Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Quisque viverra porta eros, id
              iaculis elit sollicitudin a. Orci varius natoque penatibus et
              magnis dis parturient montes, nascetur ridiculus mus. Integer
              imperdiet in arcu vitae sagittis. Quisque mollis pulvinar libero,
              eget euismod nisi molestie ut. Maecenas consequat ex massa, a
              convallis mauris convallis in. Fusce molestie faucibus vestibulum.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ReturnModal;
