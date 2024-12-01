type HeadingProps = {
  title: string;
}

const Heading = (props: HeadingProps) => {

  const { title } = props;

  return (
    <>
      <div className="flex justify-center my-8 md:my-10">
        <h1 className="font-paladinsgrad text-xl sm:text-2xl md:text-4xl">{title}</h1>
      </div>
    </>
  );
}

export default Heading;
