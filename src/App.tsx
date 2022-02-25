import React from "react";
import { useEffect } from "react";

import { DappUI, DappProvider } from "@elrondnetwork/dapp-core";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Layout from "components/Layout";

import { generateTokenPayload } from "helpers/asyncRequests";
import PageNotFound from "pages/PageNotFound";

import routes from "routes";
import { setItem, getItem } from "storage/session";
import "@elrondnetwork/dapp-core/build/index.css";

const environment = "devnet";

const { TransactionsToastList, SignTransactionsModals, NotificationModal } =
  DappUI;

const App = () => {
  const getTokenToSign = async () => {
    const tokenToSign = await generateTokenPayload();

    if (!getItem("loginToken")) {
      setItem("loginToken", tokenToSign);
    }
  };

  useEffect(() => {
    getTokenToSign();
  }, []);

  return (
    <Router>
      <DappProvider
        environment={environment}
        customNetworkConfig={{ name: "customConfig", apiTimeout: 6000 }}
        completedTransactionsDelay={200}
      >
        <Layout>
          <TransactionsToastList />
          <NotificationModal />
          <SignTransactionsModals className="custom-class-for-modals" />
          <Routes>
            {routes.map((route: any, index: number) => (
              <Route
                path={route.path}
                key={"route-key-" + index}
                element={<route.component />}
              />
            ))}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Layout>
      </DappProvider>
    </Router>
  );
};

export default App;
