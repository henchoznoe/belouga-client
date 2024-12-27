import Heading from "@components/global/Heading.tsx";
import SignUpForm from "@components/public/SignUpForm.tsx";

const SignUp = () => {
  return (
    <>
      <Heading title="Inscriptions"/>
      <p className="italic">Formulaire d'inscriptions ici, affichages des équipes inscrites</p>
      <SignUpForm/>
    </>
  );
}

export default SignUp;
