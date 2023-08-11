import {createBrowserRouter, createRoutesFromElements, Outlet, Route} from "react-router-dom";
import AppLayout from "./layouts/AppLayout.tsx";
import IndexPage from "./pages/IndexPage.tsx";
import DataEntryPage from "./pages/DataEntryPage.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<AppLayout><Outlet/></AppLayout>}>
                <Route path={"/"} element={<IndexPage/>}/>
                <Route path={"/data-entry"} element={<DataEntryPage/>}/>
            </Route>
        </>
    )
)

export default router;
