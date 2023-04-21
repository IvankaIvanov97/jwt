import React, { useEffect } from "react";
import api, { apiSetHeader } from "../services/api";

function Page() {
  async function checkToken() {
    try {
      apiSetHeader("Auth", `${localStorage.getItem("access")}`);
      await api.get("chech");
    } catch (error) {
      console.log(error);
    }
  }
  function logout() {
    localStorage.clear();
  }

  return (
    <>
      <div>Страница авторизации</div>
      <button onClick={() => checkToken()}>Проверить</button>
      <button onClick={() => logout()}>Выйти</button>
    </>
  );
}

export default Page;
