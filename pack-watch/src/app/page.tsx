import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    

  }


  return (
    <div>
     <input type="text" placeholder="username"/>
     <input type="text" placeholder="password"/>
     <button>Button</button>
    </div>
  );
}
