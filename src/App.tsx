import {RouterProvider} from "react-router-dom";
import router from "./router.tsx";
import ServiceWorkerWrapper from "./serviceworker/ServiceWorkerWrapper.tsx";
import React from "react";



function App() {

  return (
      <ServiceWorkerWrapper>
        <RouterProvider router={router}/>
      </ServiceWorkerWrapper>
  )
}

export default App
