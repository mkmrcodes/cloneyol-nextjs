import { getSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SignUp from '../components/auth/SignUp';
import SignIn from '../components/auth/SignIn';

const signUpPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tabIndex, setTabIndex] = useState(1);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace('/');
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div className={'bg-[#FAFAFA]'}>
        <div className={'w-2/6 mt-8 mx-auto bg-white'}>
          <div className={'my-4 bg-[#FAFAFA]'}>
            <h1 className={'mb-2 text-3xl text-[#333333] text-center'}>
              Merhaba,
            </h1>
            <p className={'text-base text-[#464646] text-center'}>
              ....'a giriş yap veya hesap oluştur, indirimleri kaçırma!
            </p>
          </div>
          <Tabs
            selectedIndex={tabIndex}
            onSelect={(index) => {
              setTabIndex(index);
            }}
          >
            <TabList className={'flex justify-evenly text-base'}>
              <Tab
                className={
                  'w-1/2  text-center cursor-pointer ' +
                  (tabIndex === 0
                    ? 'border-t border-l border-r rounded-tr-sm rounded-tl-sm'
                    : 'border-b')
                }
              >
                <div
                  className={
                    'mr-1 py-3 ' +
                    (tabIndex === 0 ? 'bg-white text-primary' : 'bg-[#F2F2F2]')
                  }
                >
                  Giriş Yap
                </div>
              </Tab>
              <Tab
                className={
                  'w-1/2 text-center cursor-pointer ' +
                  (tabIndex === 1
                    ? 'border-t border-l border-r rounded-tl-sm rounded-tr-sm'
                    : 'border-b')
                }
              >
                <div
                  className={
                    'ml-1 py-3 ' +
                    (tabIndex === 1 ? 'bg-white text-primary' : 'bg-[#F2F2F2]')
                  }
                >
                  Üye Ol
                </div>
              </Tab>
            </TabList>

            <TabPanel>
              <div>
                <SignIn />
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <SignUp />
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default signUpPage;
