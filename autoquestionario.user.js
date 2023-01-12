// ==UserScript==
// @name        UniWEB-AutoQuestionario
// @namespace   Violentmonkey Scripts
// @match       https://uniweb.unipd.it/questionari/*
// @version     1.0
// @author      Alecs
// @description 1/11/2023, 10:52:04 PM
// @grant GM_setValue
// @grant GM_getValue
// ==/UserScript==

const markAll = index => {
  const fields = document.querySelectorAll(".form-fieldset");
  fields.forEach(field => {
    const label = field.querySelector(`label:nth-child(${index + 1})`);
    label.click();
  });

  const nextBtn = document.getElementById("quest_sbmSuccessivo")
  nextBtn.click();
};

const get = param => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};

const timeout = 2000;

const mainPageIds = ["25962"];
const questionsIds = [
  "25968",
  "25973"
];
const marksIds = [
  "25978",
  "26315",
  "26049",
  "26108"
];

const id = get("p_pagina_id");

if (mainPageIds.includes(id)) {

  const mark = parseInt(prompt("Inserisci il voto da asseganre al prof da 1 a 10 (default 1)", "1"));
  GM_setValue("mark", mark);

  markAll(1);

} else if (questionsIds.includes(id)) {

  setTimeout(() => markAll(1), timeout);

} else if (marksIds.includes(id)) {

  const mark = GM_getValue("mark", 10);
  setTimeout(() => markAll(mark), timeout);

} else if (id !== null) {

  console.warn("Unkown id:", id);

}
