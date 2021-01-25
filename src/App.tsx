import "./style/styles.scss";
import React, { createContext, createRef, useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faCoffee } from "@fortawesome/free-solid-svg-icons";
import Index from "./pages";
import Biography from "./pages/biography";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Contact from "./pages/contact";
import Portfolio from "./pages/portfolio";

interface Props {
  authenticated?: Auth;
  visitor?: Auth;
  children?: JSX.Element;
  callBack?: () => void;
  onClick?: () => void;
  currentView?: View;
}

function Header({ visitor, menuViewState }: MenuProps) {
  const [menuState, setMenuState] = menuViewState;
  const setBlackOut = useContext(ControllBlackOut);

  const viewMenu = () => {
    const currentDiv = document.querySelector(".single-page");
    if (menuState) {
      // off=>on
      setBlackOut(false);
      const menuDiv = document.querySelector<HTMLElement>("#badge-menu");
      currentDiv?.classList.remove("blur");
      menuDiv?.setAttribute("style", "animation:fadeout 0.3s ease");
      setTimeout(() => {
        setMenuState(false);
      }, 300);
    } else {
      setMenuState(true);
      setBlackOut(true);
      currentDiv?.classList.add("blur");
    }
  };
  return (
    <header>
      <nav>
        <div>{visitor && visitor.name}様</div>
        <button onClick={viewMenu}>menu</button>
      </nav>
    </header>
  );
}
function SingleBadge({ children, onClick, currentView }: Props) {
  const move = () => {
    console.log(currentView);
  };

  return (
    <div onClick={onClick} className="single-badge">
      {children}
    </div>
  );
}

interface MenuProps extends Props {
  menuViewState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  viewState: [number, (index: number) => void];
}
function BadgeMenu({ menuViewState, viewState }: MenuProps) {
  const [menuState, setMenuState] = menuViewState;
  const setBlackOut = useContext(ControllBlackOut);

  const changeMenu = (index: number) => {
    if (index === currentIndex) return false;
    const from = currentIndex;
    const to = index;
    let toAnim = "toLeft";
    let fromAnim = "";
    if (from === 0) {
      switch (to) {
        case 1:
          fromAnim = "fromLeftTop";
          break;
      }
    } else if (from === 1) {
      switch (to) {
        case 0:
          fromAnim = "fromRightBottom";
          break;
      }
    }
    const viewingView = document.getElementById("app-body")?.querySelector(".single-page");
    viewingView?.setAttribute("style", `animation:fadeout 0.3s`);
    setMenuState(false);
    setBlackOut(false);
    setTimeout(() => {
      setCurrentView(index);
      const newView = document.getElementById("app-body")?.querySelector(".single-page");
      newView?.setAttribute("style", `animation:fadeup 0.3s`);
    }, 300);
  };
  const [currentIndex, setCurrentView] = viewState;
  return (
    <>
      {menuState && (
        <div id="badge-menu">
          <div style={{ display: "flex" }}>
            <SingleBadge onClick={() => changeMenu(1)}>
              <h3>Biography</h3>
            </SingleBadge>
            <SingleBadge onClick={() => changeMenu(3)}>
              <h3>Portfolio</h3>
            </SingleBadge>
            <SingleBadge>
              <h3>dadad</h3>
            </SingleBadge>
          </div>
          <div style={{ display: "flex" }}>
            <SingleBadge>
              <h3>dadad</h3>
            </SingleBadge>
            <SingleBadge onClick={() => changeMenu(0)}>
              <h3>HOME</h3>
            </SingleBadge>
            <SingleBadge>
              <h3>dadad</h3>
            </SingleBadge>
          </div>
          <div style={{ display: "flex" }}>
            <SingleBadge>
              <h3>dadad</h3>
            </SingleBadge>
            <SingleBadge>
              <h3>dadad</h3>
            </SingleBadge>
            <SingleBadge onClick={() => changeMenu(2)}>
              <h3>CONTACT</h3>
            </SingleBadge>
          </div>
        </div>
      )}
    </>
  );
}

interface BodyProps extends Props {
  viewState: [number, (index: number) => void];
}
function Body({ viewState }: BodyProps) {
  const [currentView, setCurrentView] = viewState;
  const Current = views[currentView].jsx;
  useEffect(() => {
    console.log(currentView);
  }, [currentView]);
  return (
    <div id="app-body">
      <Current />
    </div>
  );
}

function Main() {
  return <div>hello its main.</div>;
}

class View {
  jsx: () => JSX.Element;
  container: any;
  url: string;
  constructor(jsx: () => JSX.Element, url: string) {
    this.jsx = jsx;
    this.url = url;
  }
}
const views = [
  new View(Index, "/"),
  new View(Biography, "biography"),
  new View(Contact, "contact"),
  new View(Portfolio, "portfolio"),
];

class Auth {
  name: string;
  key: string;
  constructor(name: string, key: string) {
    this.name = name;
    this.key = key;
  }
}

const authList = [new Auth("訪問者", "9987")];

interface BlockerProps {
  setAuthenticated: React.Dispatch<React.SetStateAction<Auth>>;
  setVisitor: React.Dispatch<React.SetStateAction<Auth>>;
}

function Blocker({ setAuthenticated, setVisitor }: BlockerProps) {
  const [passwordInput, setPasswordInput] = useState("");
  const blockContainer = document.querySelector("div#blocker");
  const submit = () => {
    const foundAuth = authList.find((item) => item.key === passwordInput);
    if (!foundAuth) {
      window.alert("存在しない訪問者です。");
    } else {
      blockContainer && blockContainer.classList.add("fade-out");
      setVisitor(foundAuth);
      const fadeOut = function () {
        blockContainer && blockContainer.classList.remove("fade-out");
        setAuthenticated(foundAuth);
      };
      setTimeout(fadeOut, 1000);
    }
  };
  return (
    <div id="blocker">
      <div className="intro-badge"></div>
      <h1>ご訪問いただきありがとうございます。</h1>
      <div className="container">
        <div className="input-form">
          <input
            onChange={({ target }) => setPasswordInput(target.value)}
            placeholder="パスワードを入力してください。"
            type="password"
          />
          <span className="title">パスワード</span>
          <FontAwesomeIcon
            className={`fa-icon ${passwordInput && "exist"}`}
            onClick={submit}
            size={"lg"}
            icon={faChevronRight}
          />
        </div>
        <span className="decsription">
          当ポートフォリオには、プライバシー保護のため、限定公開とさせて頂いております。
          <br />
          お手数おかけしますが、よろしくお願いいたします。
        </span>
      </div>
    </div>
  );
}

const ControllBlackOut: React.Context<any> = createContext(null);
function App() {
  const [authenticated, setAuthenticated] = useState((null as unknown) as Auth);
  const [visitor, setVisitor] = useState((null as unknown) as Auth);
  const [menuView, setMenuView] = useState(false);
  const [currentView, setCurrentView] = useState(0);
  const [blackOutView, setBlackOutView] = useState(false);
  const setViewIndex = (index: number) => {
    setCurrentView(index);
  };
  const setBlackOut = (value: boolean) => {
    const blackOutDiv = document.querySelector<HTMLElement>("#black-out");
    if (value === true) {
      setBlackOutView(true);
    } else if (blackOutDiv) {
      blackOutDiv.style.cssText = "animation: fadeout 0.3s";
      setTimeout(() => setBlackOutView(false), 300);
    }
  };
  return (
    <ControllBlackOut.Provider value={setBlackOut}>
      {!authenticated && <Blocker setVisitor={setVisitor} setAuthenticated={setAuthenticated} />}
      {visitor && (
        <div className="App">
          <BadgeMenu
            viewState={[currentView, setViewIndex]}
            menuViewState={[menuView, setMenuView]}
          />
          <Header
            viewState={[currentView, setViewIndex]}
            visitor={visitor}
            menuViewState={[menuView, setMenuView]}
          />
          {blackOutView && <div id="black-out"></div>}
          <Body viewState={[currentView, setViewIndex]} />
        </div>
      )}
    </ControllBlackOut.Provider>
  );
}

export default App;
