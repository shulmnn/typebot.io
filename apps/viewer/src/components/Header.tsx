"use client";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";
import { useEffect, useState } from "react";

export const Header = () => {
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.source !== window) {
        return;
      }

      if (event.data.type === "typing-event") {
        setIsTyping(event.data.value);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      // Cleanup the event listener
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className="user-bar">
      <div className="back">
        <i className="fa-solid fa-chevron-left"></i>
      </div>
      <div className="avatar">
        <Image
          width={36}
          height={36}
          src="https://s3.citasvirtualesenlinea.com/typebot/public/workspaces/clxeusdud000110u8f063zkdc/typebots/clxf6bnpp0005ew5834magn6q/hostAvatar?v=1718400515761"
          alt="Dr José Ordoñez"
        />
      </div>
      <div className="name">
        <span>Dr José Ordoñez</span>
        <span
          className="verificado"
          data-testid="psa-verified"
          data-icon="psa-verified"
        >
          <svg
            viewBox="0 0 18 18"
            height="18"
            width="18"
            preserveAspectRatio="xMidYMid meet"
            className=""
            version="1.1"
            x="0px"
            y="0px"
            enable-background="new 0 0 18 18"
            xmlSpace="preserve"
          >
            <polygon
              id="Star-2"
              fill="#00DA60"
              points="9,16 7.1,16.9 5.8,15.2 3.7,15.1 3.4,13 1.5,12 2.2,9.9 1.1,8.2 2.6,6.7 2.4,4.6 4.5,4 5.3,2 7.4,2.4 9,1.1 10.7,2.4 12.7,2 13.6,4 15.6,4.6 15.5,6.7 17,8.2 15.9,9.9 16.5,12 14.7,13 14.3,15.1 12.2,15.2 10.9,16.9 "
            ></polygon>
            <polygon
              id="Check-Icon"
              fill="#FFFFFF"
              points="13.1,7.3 12.2,6.5 8.1,10.6 5.9,8.5 5,9.4 8,12.4 "
            ></polygon>
          </svg>
        </span>
        <span className="status">
          {isTyping ? "escribiendo..." : "en linea"}
        </span>
      </div>
      <div className="actions more">
        <MoreVertIcon />
      </div>
    </div>
  );
};
