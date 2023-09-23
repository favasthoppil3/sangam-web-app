import React from 'react';
import FooterIconTabs from '@/features/Home/FooterTab';
import ListCategories from '@/features/Home/ListCategories';
import Navbar from '@/features/mainlayout/Navbar';
import Page from '@/components/shared/Page';

function Home() {
  return (
    <Page title="Home">
      <Navbar />
      <FooterIconTabs />
    </Page>
  );
}

export default Home;
