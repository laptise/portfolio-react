import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faCoffee } from "@fortawesome/free-solid-svg-icons";
import * as Logo from "../components/svgLogos";

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
    <div>
      {skills.map((skill) => (
        <div className="single-skill">
          <div className="svg">{skill.svg}</div>
          <span>{skill.name}</span>
        </div>
      ))}
    </div>
  );
}
export default function Main() {
  const container = useRef((null as unknown) as HTMLDivElement);

  return (
    <div ref={container} className="single-page index">
      <div className="container">
        <ProfileBadge />
        <SkillStack />
        <h3>サマリー</h3>
        <div>こんにちわははは</div>
      </div>
    </div>
  );
}
