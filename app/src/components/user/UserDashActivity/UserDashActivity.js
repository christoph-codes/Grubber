import React from "react";
import "./UserDashActivity.scss";
import grubs from "../../util/grubs";
import UserGrub from "../UserGrub/UserGrub";

export default function UserDashActivity(props) {
  const grublist = grubs.map((grub, index) => {
    return <UserGrub grub={grub} key={index} />;
  });
  return (
    <div className="UserDashActivity">
      {grublist}
    </div>
  );
}
