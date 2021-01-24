import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faCoffee } from "@fortawesome/free-solid-svg-icons";

export default function Contact() {
  const container = useRef((null as unknown) as HTMLDivElement);

  return (
    <div ref={container} className="single-page index">
      <div className="container">
        <h2>問い合わせ</h2>
      </div>
    </div>
  );
}
