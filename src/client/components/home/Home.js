import React, { useState } from 'react';
import { useFormik } from 'formik';
import TermsAndConditions from './TermsAndConditions';
import FirstPage from './FirstPage';
import SecondPage from './SecondPage';

const Content = [FirstPage, SecondPage];

export default function Home() {
  //   const formik = useFormik();
  const [accepted, setAccepted] = useState(false);
  const [page, setPage] = useState(0);

  function handleSellingSoul() {
    setAccepted(true);
  }

  function handleNextPage() {
    setPage(page + 1);
  }

  function handlePrevPage() {
    setPage(page - 1);
  }

  if (!accepted) return <TermsAndConditions onClick={handleSellingSoul} />;
  const FormPage = Content[page];
  return <FormPage {...{ handleNextPage, handlePrevPage }} />;
}
// Testing
// https://script.google.com/a/correounivalle.edu.co/macros/s/AKfycbwoj14LEASjFWXfQOUbpOjgDnf7MftMK5_VLhLdB22COk1i1_lve1AWgCDd0UE2N5UM/exec
