import React, { Fragment } from "react";
import Header from "../components/Header";
import ServiceDetails from "../templates/ServiceDetails/Servicepage";
import Funfact from "../components/Funfact";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import LoginRegister from "../components/LoginRegister";
import MobileMenu from "../components/MobileMenu";
import BrandLogo from "../components/BrandLogo";
// import ServiceItemPage from "../templates/ServiceDetails/ItemPage";
const PageServiceDetails = () => {
  return (
    <Fragment>
      <Header />
      <ServiceDetails />
      {/* <ServiceItemPage /> */}
      <BrandLogo />
      <Funfact />
      <CallToAction />
      <Footer />
      <LoginRegister />
      <MobileMenu />
    </Fragment>
  );
};

export default PageServiceDetails;
