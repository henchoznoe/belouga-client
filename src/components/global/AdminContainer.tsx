import { PropsWithChildren } from "react";

type AdminContainerProps = {
  title?: string;
}

const AdminContainer = (props: PropsWithChildren<AdminContainerProps>) => {
  return (
    <>
      <div className="p-4 bg-zinc-700 rounded-lg shadow-md">
        {props.title && <h1 className="text-2xl font-paladinsgrad mb-4">{props.title}</h1>}
        {props.children}
      </div>
    </>
  );
}

export default AdminContainer;
