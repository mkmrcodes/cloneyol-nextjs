import { Dialog } from '@headlessui/react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useEffect, useRef, useState } from 'react';

export default function MyDialog({ isOpen, setIsOpen, tabIdx, setTabIdx }) {
  const [tabIndex, setTabIndex] = useState(tabIdx);
  useEffect(() => {
    setTabIndex(tabIdx);
  }, [tabIdx]);

  let completeButtonRef = useRef();
  return (
    <Dialog
      open={isOpen}
      onClose={setIsOpen}
      as='div'
      initialFocus={completeButtonRef}
      className={'fixed inset-0 z-10 overflow-y-auto '}
    >
      <div className='flex items-center justify-center min-h-screen'>
        <Dialog.Overlay className={'fixed inset-0 bg-black opacity-30'} />
        <div className={'z-50 bg-white rounded max-w-lg mx-auto border'}>
          <div className={'flex justify-end p-2'}>
            <button ref={completeButtonRef} onClick={() => setIsOpen(false)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
          <Tabs
            selectedIndex={tabIndex}
            onSelect={(index) => {
              setTabIndex(index);
              setTabIdx(index);
            }}
          >
            <TabList
              className={'flex justify-evenly border-b border-gray-300 text-sm'}
            >
              <Tab>
                <Dialog.Title
                  className={
                    'mb-2 cursor-pointer ' +
                    (tabIndex === 0 ? 'text-primary' : '')
                  }
                >
                  <span className={'sr-only'}>Üyelik Sözleşmesi</span>
                  Üyelik Sözleşmesi
                </Dialog.Title>
              </Tab>
              <Tab>
                <Dialog.Title
                  className={
                    'mb-2 cursor-pointer ' +
                    (tabIndex === 1 ? 'text-primary' : '')
                  }
                >
                  Kişisel Veri Rıza Metni
                </Dialog.Title>
              </Tab>
            </TabList>

            <TabPanel className={'mt-2 overflow-y-scroll mb-2'}>
              <Dialog.Description className='h-72 text-sm text-justify px-4 py-2 mb-2'>
                <span className={'block mb-2 text-center '}>
                  ÜYELİK SÖZLEŞMESİ
                </span>
                <span>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum. Lorem
                  Ipsum is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the industry's standard dummy
                  text ever since the 1500s, when an unknown printer took a
                  galley of type and scrambled it to make a type specimen book.
                  It has survived not only five centuries, but also the leap
                  into electronic typesetting, remaining essentially unchanged.
                  It was popularised in the 1960s with the release of Letraset
                  sheets containing Lorem Ipsum passages, and more recently with
                  desktop publishing software like Aldus PageMaker including
                  versions of Lorem Ipsum.
                </span>
              </Dialog.Description>
            </TabPanel>
            <TabPanel className={'overflow-y-scroll mb-2'}>
              <Dialog.Description className='h-72 text-sm text-justify px-4'>
                <span className={'block mb-2 text-center cursor-pointer'}>
                  KİŞİSEL VERİ RIZA METNİ
                </span>
                <span>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum. Lorem
                  Ipsum is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the industry's standard dummy
                  text ever since the 1500s, when an unknown printer took a
                  galley of type and scrambled it to make a type specimen book.
                  It has survived not only five centuries, but also the leap
                  into electronic typesetting, remaining essentially unchanged.
                  It was popularised in the 1960s with the release of Letraset
                  sheets containing Lorem Ipsum passages, and more recently with
                  desktop publishing software like Aldus PageMaker including
                  versions of Lorem Ipsum.
                </span>
              </Dialog.Description>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </Dialog>
  );
}
