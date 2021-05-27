import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel, resetIdCounter } from 'react-tabs';
import ProductNavPanel from './ProductNavPanel';

const ProductNavBar = () => {
  const [tabIndex, setTabIndex] = useState(0);
  resetIdCounter();

  const CustomTab = (props) => {
    return (
      <Tab
        className={
          'w-full px-4 py-1.5 text-center justify-evenly' +
          (props.tabKey === tabIndex
            ? 'text-primary border-b-2 border-primary'
            : '')
        }
      >
        <div>{props.children}</div>
      </Tab>
    );
  };

  CustomTab.tabsRole = 'Tab';

  return (
    <div className={'z-50'}>
      <Tabs
        selectedIndex={tabIndex}
        onSelect={(index) => {
          setTabIndex(index);
        }}
      >
        <TabList
          className={'flex justify-around text-sm font-bold whitespace-nowrap'}
        >
          <Tab className={'hidden'}></Tab>
          <CustomTab tabKey={1}>
            SÜPERMARKET
            <ProductNavPanel
              onMouseEnter={() => setTabIndex(1)}
              setTabIndex={setTabIndex}
            />
          </CustomTab>
          <CustomTab tabKey={2}>SÜPERMARKET</CustomTab>
          <CustomTab tabKey={3}>SÜPERMARKET</CustomTab>
          <CustomTab tabKey={4}>SÜPERMARKET</CustomTab>
          <CustomTab tabKey={5}>SÜPERMARKET</CustomTab>
          <CustomTab tabKey={6}>SÜPERMARKET</CustomTab>
          <CustomTab tabKey={7}>SÜPERMARKET</CustomTab>
          <CustomTab tabKey={8}>SÜPERMARKET</CustomTab>
          <CustomTab tabKey={9}>SÜPERMARKET</CustomTab>
        </TabList>

        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
      </Tabs>
    </div>
  );
};

export default ProductNavBar;
