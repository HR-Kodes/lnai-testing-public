import React, { Fragment } from "react";
import Header from "../components/Header";
import ContactPage from "../templates/Contact";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import LoginRegister from "../components/LoginRegister";
import MobileMenu from "../components/MobileMenu";
import GoogleMaps from "../components/Mapsection/map";
const PageContact = () => {
  return (
    <Fragment>
      <Header />
      <ContactPage />
      <CallToAction />
      <GoogleMaps />
      <Footer />
      <LoginRegister />
      <MobileMenu />
    </Fragment>
  );
};

export default PageContact;
