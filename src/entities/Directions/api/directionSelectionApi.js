import { rootApi } from "../../../../store";

export const { useGetDirectionSelectionQuery } = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getDirectionSelection: builder.query({
      query: ({
        type,
        degree_id,
        education_language_id,
        direction_id,
        admission_year,
        education_type_id,
        is_transfer_student,
      }) => {
        if (!type) throw new Error("type is required");

        const direction_type = localStorage.getItem("direction_type");
        const searchParams = new URLSearchParams();
        searchParams.append("admission_status", "active");
        searchParams.append("type", "admission");
        searchParams.append("process_type", "admission");
        searchParams.append("direction_type", direction_type);
        if (!education_language_id && is_transfer_student) {
          searchParams.append("is_transfer_student", is_transfer_student);
        }
        if (degree_id) {
          searchParams.append("degree_id", degree_id);
        }
        // searchParams.append("degree_id", 1);
        if (education_language_id)
          searchParams.append("education_language_id", education_language_id);
        if (direction_id) searchParams.append("direction_id", direction_id);
        if (education_type_id) {
          searchParams.append("education_type_id", education_type_id);
          // searchParams.append("admission_status", "active");
        }
        if (admission_year)
          searchParams.append("admission_year", admission_year);

        if (education_language_id && is_transfer_student) {
          searchParams.append("is_transfer_student", is_transfer_student);
        }
        return {
          url: `/v1/admissions/filter/select-box/${type}?${searchParams.toString()}`,
        };
      },
    }),
  }),
});
