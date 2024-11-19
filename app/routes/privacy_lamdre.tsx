import { ClientOnly } from "remix-utils/client-only";
import Privacy_lamdre from "../component/Privacy_lamdre.client";



export default function PrivacyPolicy() {
   return <div>
   <ClientOnly fallback={<div />}>{() => <Privacy_lamdre />}</ClientOnly>
   </div>
}