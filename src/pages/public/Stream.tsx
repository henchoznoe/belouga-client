import Heading from "@components/global/Heading.tsx";
import { TwitchEmbed } from "react-twitch-embed";

const Stream = () => {
  return (
    <>
      <Heading title="Stream"/>
      <div className="flex flex-col gap-3 items-center">
        <p>Texte ici, description, images, etc.</p>
        <TwitchEmbed channel="quentadoulive"/>
      </div>
    </>
  );
};

export default Stream;
