// lib/submit-application.ts

import { applyForScholarship } from "../actions/applyScholarship";

export async function submitApplication(data: any) {
  return applyForScholarship(data);
}
