import Heading from "@components/global/Heading.tsx";
import SignUpForm from "@components/public/SignUpForm.tsx";

const SignUp = () => {
  return (
    <>
      <Heading title="Inscriptions"/>
      <p>Le tournoi se déroule, comme mentionné, par équipe de 5 personnes. Suite du texte ici</p>
      <SignUpForm/>
    </>
  );
}

export default SignUp;
