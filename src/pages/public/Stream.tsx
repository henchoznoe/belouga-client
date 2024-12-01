import Heading from "@components/global/Heading.tsx";
import { TwitchEmbed } from "react-twitch-embed";

const Stream = () => {
  return (
    <>
      <Heading title="Stream"/>
      <TwitchEmbed channel="quentadoulive"/>
    </>
  );
};

export default Stream;
