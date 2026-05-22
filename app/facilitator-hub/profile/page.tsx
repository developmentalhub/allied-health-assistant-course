import { redirect } from "next/navigation";

export default function FacilitatorProfileRedirect() {
  redirect("/facilitator/profile/edit");
}