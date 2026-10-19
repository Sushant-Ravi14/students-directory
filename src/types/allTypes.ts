export type StudentStatus = "Active" | "On Leave" | "Probation" | "Graduated";

export interface Subject {
  code: string;
  name: string;
  credits: number;
}

export interface Student {
  id: string;
  name: string;
  department: string;
  departmentSlug: string;
  year: number;
  email: string;
  enrolled: string;
  specialization: string;
  status: StudentStatus;
  about: string;
  subjects: Subject[];
}

export interface Department {
  name: string;
  slug: string;
  description: string;
  specializations: number;
  enrolledStudents: number;
}

export type Specialization = {
  slug: string
  name: string
  departmentSlug: string
  code: string
  description: string
  lead: string
  lab: string
  cycle: string
}