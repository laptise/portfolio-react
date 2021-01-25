import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faCoffee } from "@fortawesome/free-solid-svg-icons";
import * as Logo from "../components/svgLogos";

function ProfileSection() {
  return (
    <div className="profile-section">
      <div className="img-block">
        <img />
      </div>
      <ProfileBadge />
    </div>
  );
}

function ProfileBadge() {
  return (
    <div className="profile-badge">
      <h3 style={{ margin: 0 }}>Yoonsoo Kim</h3>
      <small>フロントエンドエンジニア</small>
    </div>
  );
}

class Skill {
  name: string;
  svg: any;
  constructor(name: string, svg: any) {
    this.name = name;
    this.svg = svg;
  }
}

const skills = [
  new Skill("React", Logo.React),
  new Skill("TypeScript", Logo.TypeScript),
  new Skill("Vue", Logo.Vue),
  new Skill("HTML5", Logo.Html5),
  new Skill("CSS3", Logo.Css3),
  new Skill("Firebase", Logo.Firebase),
  new Skill("Photoshop", Logo.Photoshop),
  new Skill("Illustrator", Logo.Illustrator),
];

function SkillStack() {
  return (
    <div className="skill-stack">
      {skills.map((skill) => (
        <div className="single-skill">
          <div className="svg" title={skill.name}>
            {skill.svg}
          </div>
          <span className="skill-name">{skill.name}</span>
        </div>
      ))}
    </div>
  );
}

class BiographyParagraph {
  title: string;
  body: string;
  subTitle: string;
  height?: number;
  constructor(title: string, subTitle: string, body: string) {
    this.title = title;
    this.body = body;
    this.subTitle = subTitle;
  }
}
const biographyParagraphs = [
  new BiographyParagraph(
    "WordPress時代",
    "初めてWordpressでWebに入門",
    `自身のバンド活動のホームページを作ろうと思いWordpressのことを知る。<br/>ありきたりなサイトは嫌だったため、HTML, CSSを勉強し少しカスタマイズをし始める。しかし、ワードプレス上からは触れない部分が多く、限界を感じる。`
  ),
  new BiographyParagraph(
    "HTML時代",
    "HTMLテンプレートで深いところまで修正",
    `HTML5サイトソースコードをパッケージで売っているところこら購入し、修正をし始める。
大体のことが修正できるようになるが、今度はWordpressに比べると、静的なサイトしかできなかった。`
  ),
  new BiographyParagraph(
    "PHP時代",
    "動的サイト、サーバー、Linuxとの遭遇",
    `PHPの書き方が直感的(当時の私はそう思いました)かつWordpressのベースだということでPHPを勉強し、導入し始める。やりたいことができたため、自分だけのサーバーにあげようとレンタルサーバーを借りるが、ワードプレスみたいになんだか自分で修正できないところが多く、AWS利用を決定、何もないLinuxサーバーを借りる。
　Linuxの操作から、LAMP環境の構築など、当時はとても難しかったが、インターネットで情報を収集しなんとか解決。
　しかし、フォームを送信したり、何か通信をするたびに画面が再読み込みされることに不満を感じる。`
  ),
  new BiographyParagraph(
    "JS入門生時代",
    "フロントエンドの始まり",
    "アニメーション的な描写や非同期通信をするため、jsを始める。当初はjqueryのajaxを利用していたが、機能一つのためにjqueryという大きいライブラリ全体を入れることに違和感を感じた。ピュア jsでできることを知り、jqueryとは決別し、今後もjqueryを自ら入れることはなかった。ここNode.jsなども使ってみてjsが好きになり、しばらく満足していた。"
  ),
  new BiographyParagraph(
    "モダンフロントエンド時代",
    "現在",
    `ある案件がきっかけでVue.js + Next.jsを体験する。当初は初歩的な使い方しかできず案件が終わる。その次の別案件でリーダーを説得しes6と typescriptと導入してみると、Vue.jsの理解が深まり、噂に聞いていたReactに挑戦することになる。
自分のサイドプロジェクトで Reactを使ったWebアプリを制作途中に段々とReactとjsについて理解が深まり、React Nativeに環境を移し、スマホアプリを制作している。`
  ),
];
function BiographySection() {
  const [currentBio, setCurrentBio] = useState(biographyParagraphs[0]);
  const currentIndex = biographyParagraphs.findIndex((bio) => bio === currentBio);
  const scrollBody = useRef(null);
  const scrollEvent = (e: any) => {
    const eTarget = e.target as HTMLDivElement;
    const scrollPosition = eTarget.scrollTop;
    const isOver = (index: number) => {
      const height = biographyParagraphs[index]?.height;
      return height && height >= scrollPosition;
    };
    setCurrentBio(biographyParagraphs[0]);
    if (!isOver(0) && isOver(1)) {
      setCurrentBio(biographyParagraphs[1]);
    }
    if (!isOver(1) && isOver(2)) {
      setCurrentBio(biographyParagraphs[2]);
    }
    if (!isOver(2) && isOver(3)) {
      setCurrentBio(biographyParagraphs[3]);
    }
  };
  const clickControl = (index: number) => {
    const target = document.querySelector(".body-section")?.querySelector(".body");
    const top = biographyParagraphs[index]?.height;
    const first = biographyParagraphs[0]?.height;
    if (target && top != undefined && first != undefined) target.scrollTop = top;
  };
  useEffect(() => {
    const paragraphNodes = document.querySelector(".bio-section")?.querySelectorAll(".paragraph");
    const paragraphDivs = paragraphNodes && Array.from(paragraphNodes);
    let value = 0;
    paragraphDivs?.forEach((div, index) => {
      value += div.clientHeight;
      biographyParagraphs[index].height = value;
    });
  });
  return (
    <div className="bio-section">
      <div className="header">
        {biographyParagraphs.map((bio, index) => (
          <div
            key={index}
            onClick={() => clickControl(index)}
            className={`single-title ${currentBio === bio ? "current" : ""}`}
          >
            {bio.title}
          </div>
        ))}
      </div>
      <div className="body-section">
        <div ref={scrollBody} className="body" onScroll={scrollEvent}>
          {biographyParagraphs.map((bio, index) => (
            <div key={index} className="paragraph">
              <span className="title">{bio.subTitle}</span>
              <span className="body">{bio.body}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SkillStackSection() {
  return (
    <div className="skill-stack-section">
      <span className="desc">幅広い対応幅</span>
      <span className="title">スキルスタック</span>
      <div style={{ width: 200, height: 1, backgroundColor: "black", margin: 7.5 }}></div>
      <SkillStack />
    </div>
  );
}
export default function Main() {
  const container = useRef((null as unknown) as HTMLDivElement);

  return (
    <div ref={container} className="single-page index">
      <div className="container">
        <ProfileSection />
        <SkillStackSection />
        <BiographySection />
      </div>
    </div>
  );
}
