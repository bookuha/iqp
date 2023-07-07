import WelcomeCard from "@/app/components/WelcomeCard";
import { CategoriesList } from "@/app/components/CategoriesList";

const StartingPage = () => {
  return (
    <main className="main">
      <div>
        <h2>Hello 🌊</h2>
        <p>
          The IQP is a web portal where developers can prepare to their
          interviews by viewing the questions & tasks prepared by volunteers.
        </p>
        <p>
          The website is currently under construction, feel free to help! -
          04.07.2023
        </p>
      </div>
      <WelcomeCard />
      <CategoriesList />
    </main>
  );
};

export default StartingPage;
