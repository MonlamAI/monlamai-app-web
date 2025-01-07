import { ClientOnly } from "remix-utils/client-only";
import Policy from "../component/Policy.client";



export default function PrivacyPolicy() {
   return <div>
   <ClientOnly fallback={<div />}>{() => <Policy productName={'Germen Tibetan Dictionary'} />}</ClientOnly>
   </div>
}