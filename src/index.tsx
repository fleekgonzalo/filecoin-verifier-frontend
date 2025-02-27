import React from "react";
import ReactDOM from 'react-dom/client';
import "./index.scss";
import { config } from "./config";
import App from "./App";
import WalletProvider from "./context/Wallet/WalletProvider";
import GithubProvider from "./context/Github/GithubProvider";
import DataProvider from "./context/Data/DataProvider";
import { Wallet } from "./context/Wallet/Index";
import { Github } from "./context/Github/Index";
import { createBrowserHistory } from 'history';
import { HashRouter as Router, Route, Switch, useHistory } from "react-router-dom";
// @ts-ignore
import { GlobalNotification, GlobalModal } from "slate-react-system";
import "./fonts/SuisseIntl-Regular.woff";
import Layout from "../src/Layout/layout";
import LdnApplication from "./pages/LdnApplication";

import * as serviceWorker from './serviceWorker';
import Preonboarding from './pages/Preonboarding';
import Onboarding from './pages/Onboarding';
import Landing from './pages/Landing';
import LogExplorer from './pages/LogExplorer';
import SecretTestPage from './pages/SecretTestPage';
import './fonts/SuisseIntl-Regular.woff'
import ClientDetails from './pages/ClientDetails'
import { CookiesProvider } from 'react-cookie';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import Verifiers from "./pages/Verifiers";
import Miners from "./pages/Miners";
import StatusPage from "./pages/StatusPage";


// redirect to domain if user access fleek url
if (window.location.host.includes("fleek") && config.willRedirect) {
  window.location.href = config.domain;
}

Sentry.init({
  dsn: "https://488b3be98a124c008cd88fce8b8abe1c@o933704.ingest.sentry.io/5882860",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const history = createBrowserHistory();

root.render(
  <React.StrictMode>
    <CookiesProvider>
      <WalletProvider>
        <GithubProvider>
          <Wallet.Consumer>
            {(wallet) => (
              <Github.Consumer>
                {(github) => (
                  <DataProvider wallet={wallet} github={github}>
                  <Router history={history as useHistory}>
                      <Layout>
                        <Switch>
                          <Route exact path={"/"} component={Onboarding}></Route>
                          <Route path={"/app"} component={App}></Route>
                          <Route
                            path={"/wallet"}
                            component={Preonboarding}
                          ></Route>
                          <Route path={"/landing"} component={Landing}></Route>
                          <Route
                            path={"/verifiers"}
                            component={Verifiers}
                          ></Route>
                          <Route
                            path={"/ldn-application"}
                            component={LdnApplication}
                          ></Route>
                          <Route path={"/miners"} component={Miners}></Route>
                          <Route
                            path={"/client"}
                            component={ClientDetails}
                          ></Route>
                          <Route path={"/logs"} component={LogExplorer}></Route>
                          <Route path={"/status"} component={StatusPage}></Route>
                        </Switch>
                      </Layout >
                    </Router>
                    
                    <GlobalNotification style={{ bottom: 0, right: 0 }} />
                    <GlobalModal style={{ maxWidth: "none" }} />
                  </DataProvider>
                )}
              </Github.Consumer>
            )}
          </Wallet.Consumer>
        </GithubProvider>
      </WalletProvider>
    </CookiesProvider>
  </React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
