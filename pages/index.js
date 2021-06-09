import SlickBar from '../components/brand-bar/SlickBar';
import Campaigns from '../components/mainpage/campaigns';
import SideSliders from '../components/mainpage/SideSliders';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import axios from 'axios';
import { nestApiUrl } from '../utils/constants';

export default function HomePage() {
  const [cookie, setCookie] = useCookies(['_ym_uid']);
  useEffect(async () => {
    if (localStorage._ym_uid === undefined) {
      const basket = await axios.post(`${nestApiUrl}/basket`, {});
      console.log(basket.data);
      const _ym_uid = basket.data.id;
      localStorage.setItem('_ym_uid', _ym_uid);
      setCookie('_ym_uid', _ym_uid, {
        path: '/',
        sameSite: true,
      });
    }
  }, []);

  return (
    <div>
      <div className={'w-full md:w-10/12 max-w-screen-xl mx-auto bg-white'}>
        <div className={'mt-4'}>
          <SlickBar />
        </div>

        <div className={'grid grid-cols-12 gap-6 mt-4'}>
          <div className={'col-span-8 h-screen bg-white'}>
            <Campaigns />
          </div>
          <div className={'col-span-4 h-screen bg-white'}>
            <SideSliders />
          </div>
        </div>
      </div>
    </div>
  );
}
