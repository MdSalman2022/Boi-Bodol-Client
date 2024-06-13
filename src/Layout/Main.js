import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Shared/Footer/Footer";
import Header from "../components/Shared/Header/Header";
import { motion } from "framer-motion";
import Maintenance from "../components/Pages/Maintenance/Maintenance";

const Main = () => {
  return (
    <motion.div layout>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
      {/* <Maintenance/> */}
    </motion.div>
  );
};

export default Main;
