import TermsAndConditions from "~/component/TermsAndConditions";

export default function Index() {
  return (
    <main className="min-h-screen flex flex-col justify-center md:py-12 sm:px-6 lg:px-8">
      <div className="w-full lg:max-w-screen-md m-auto p-6 bg-white  text-slate-900">
        <TermsAndConditions />
      </div>
    </main>
  );
}
