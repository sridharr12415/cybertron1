import { useNavigate } from "react-router-dom";
import IntroVideo from "./IntroVideo";
import LogoReveal from "./LogoReveal";

export default function IntroPage() {
  const navigate = useNavigate();

  return (
    <IntroVideo
      onFinish={() => {
        navigate("/logo", { replace: true });
      }}
    />
  );
}
