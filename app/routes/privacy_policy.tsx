import { ClientOnly } from "remix-utils/client-only";
import Privacy_policy from "../component/Privacy_policy.client";



export default function PrivacyPolicy() {
   return <div>
   <ClientOnly fallback={<div />}>{() => <Privacy_policy />}</ClientOnly>
   </div>
}