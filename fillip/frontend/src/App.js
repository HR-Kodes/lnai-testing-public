import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/*
 * @ All pages Import
 */
import HomeOne from "./pages/HomeOne";
import HomeTwo from "./pages/HomeTwo";
import Service from "./pages/Service";
import Servicedetails from "./pages/ServiceDetails";
// import ItemDetails from "./templates/ItemDetails";
import Team from "./pages/Team";
import TeamDetails from "./pages/TeamDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Error404 from "./pages/Error404";
import ScrollToTop from "./helpers/ScrollToTop";
import Gstcalculator from "./pages/gstcalculator";
import Sipcalculator from "./pages/sipcalculator";
import Bussinesscalculator from "./pages/bussinesscalculator";
import Salarycalculator from "./pages/Salarycalculator";
import Tdscalculator from "./pages/tdscalculator";
import Npscalculator from "./pages/npscalculator";
import PPfcalculator from "./pages/ppfcalculator";
import Retirementcalculator from "./pages/retirementcalculator";
import Hracalculator from "./pages/hracalculator";
import Epfcalculator from "./pages/epfcalculator";
import Incometaxcalculator from "./pages/incometaxcalculator";
import Rdcalculator from "./pages/rdcalculator";
import Gratuitycalculator from "./pages/gratuitycalculator";
import Simpleinterstcalcularor from "./pages/simpleinterstcalcularor";
import Form from "./pages/SpiceForm/spiceform";
import KeywordForm from "./pages/Keyword-Description-Form/description";
import FillipForm from "./pages/FillipForm.js/fillipform";
// import Fillip from "./pages/Fillit Form/fillip";
// import ServiceItemPage from "./templates/itemData/ItemPage";
// import PageServiceDetails from "./pages/ServiceDetails";
const App = () => {
  return (
    <Router>
      <ScrollToTop>
        <Switch>
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/services"}`}
            component={Service}
          />
          {/* <Route
            path={`${process.env.PUBLIC_URL + "/service/:serviceID"}`}
            component={Servicedetails}
          /> */}
          <Route
            path={`${process.env.PUBLIC_URL + "/service/:serviceId"}`}
            component={Servicedetails}
          />
          {/* <Route
            path={`${process.env.PUBLIC_URL + "/service/:serviceId/:itemId"}`}
            component={Gstcalculator}
          /> */}

          {/* <Route
            exact
            path={`${
              process.env.PUBLIC_URL + "/service/consultation?id=1&item=0"
            }`}
            component={Gstcalculator}
          /> */}

          {/* <Route
            path={`${
              process.env.PUBLIC_URL + "/service/:serviceId/:itemIndex"
            }`}
            component={ItemDetails}
          /> */}
          {/* <Route
            exact
            path={`${process.env.PUBLIC_URL + "/blog-grid-right-sidebar"}`}
            component={BlogGridRightSidebar}
          /> */}
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/gstcalculator"}`}
            component={Gstcalculator}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/sipcalculator"}`}
            component={Sipcalculator}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/bussinesscalculator"}`}
            component={Bussinesscalculator}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/gstcalculator"}`}
            component={Gstcalculator}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/Salarycalculator"}`}
            component={Salarycalculator}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/tdscalculator"}`}
            component={Tdscalculator}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/npscalculator"}`}
            component={Npscalculator}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/ppfcalculator"}`}
            component={PPfcalculator}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/retirementcalculator"}`}
            component={Retirementcalculator}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/hracalculator"}`}
            component={Hracalculator}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/epfcalculator"}`}
            component={Epfcalculator}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/incometaxcalculator"}`}
            component={Incometaxcalculator}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/rdcalculator"}`}
            component={Rdcalculator}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/gratuitycalculator"}`}
            component={Gratuitycalculator}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/simpleinterstcalcularor"}`}
            component={Simpleinterstcalcularor}
          />

          {/* <Route
            exact
            path={`${process.env.PUBLIC_URL + "/blog-grid-left-sidebar"}`}
            component={BlogGridLeftSidebar}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/blog-grid-without-sidebar"}`}
            component={BlogGridWithoutSidebar}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/blog-list-left-sidebar"}`}
            component={BlogListLeftSidebar}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/blog-list-right-sidebar"}`}
            component={BlogListRightSidebar}
          />
          <Route
            path={`${process.env.PUBLIC_URL + "/blog/:blogID"}`}
            component={BlogDetailsPage}
          /> */}
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/team"}`}
            component={Team}
          />
          <Route
            path={`${process.env.PUBLIC_URL + "/team-member/:teamID"}`}
            component={TeamDetails}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/about"}`}
            component={About}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/contact"}`}
            component={Contact}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/home-one"}`}
            component={HomeOne}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/home-two"}`}
            component={HomeTwo}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/"}`}
            component={HomeOne}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/spiceform"}`}
            component={Form}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/suggestyourname"}`}
            component={KeywordForm}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + "/fillipform"}`}
            component={FillipForm}
          />
          <Route exact component={Error404} />
        </Switch>
      </ScrollToTop>
    </Router>
  );
};

export default App;
