import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faCoffee } from "@fortawesome/free-solid-svg-icons";

class Work {
  from: Date;
  to: Date;
  title: string;
  contenct: string;
  constructor(from: Date, to: Date, title: string, contenct: string) {
    this.from = from;
    this.to = to;
    this.title = title;
    this.contenct = contenct;
  }
}

const worksList = [
  new Work(new Date(2016, 8), new Date(2016, 11), "ホームページ", "dada"),
  new Work(new Date(2016, 8), new Date(2016, 11), "ホームページ", "dada"),
  new Work(new Date(2016, 8), new Date(2016, 11), "ホームページ", "dada"),
  new Work(new Date(2016, 8), new Date(2016, 11), "ホームページ", "dada"),
  new Work(new Date(2016, 8), new Date(2016, 11), "ホームページ", "dada"),
];

export default function Portfolio() {
  const container = useRef(null);
  const test = () => {
    console.log(118388);
  };
  return (
    <div ref={container} className="single-page portfolio">
      <div className="container">
        職務経験
        <div className="works-thumbs">
          {worksList.map((work) => (
            <div className="single-thumbnail">{work.title}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
