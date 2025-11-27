import { useEffect, useState } from "react";

export function useApplicationType(purposeOfApplication) {
  const [degreeId, setDegreeId] = useState("1");

  useEffect(() => {
    const initialSelectedDegree =
      purposeOfApplication === "abituryent"
        ? "1"
        : purposeOfApplication === "master"
        ? "2"
        : "1";

    const directionTypes =
      purposeOfApplication === "transfer"
        ? "transfer_student"
        : purposeOfApplication === "secondSpecialty"
        ? "second_specialty"
        : "admission";

    setDegreeId(initialSelectedDegree);
    localStorage.setItem("direction_type", directionTypes);
  }, [purposeOfApplication]);

  return { degreeId };
}
