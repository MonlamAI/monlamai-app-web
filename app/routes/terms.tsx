import TermsAndConditions from "~/routes/steps/component/TermsAndConditions";

export default function Index() {
  return (
    <main className="min-h-screen flex flex-col justify-center  sm:px-6 lg:px-8">
      <div className="w-full lg:max-w-screen-md mx-auto my-10 bg-white  text-slate-900">
        <TermsAndConditions />
      </div>
    </main>
  );
}
