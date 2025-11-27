import { getLocalStorageItem } from "@/shared/lib/getLocalStorageItem";
// import receipt from "@/assets/sidebar/receipt.svg";

export const ProgressBarData = [
  {
    id: 1,
    title: "layoutRoute.personalInfo",
    description: "layoutRoute.personalInfoDesc",
    path: "/profile/personal-information",
    icon: "/assets/personal-info.svg",
  },
  {
    id: 2,
    title: "layoutRoute.educationInfo",
    description: "layoutRoute.educationInfoDesc",
    path: "/profile/educational-information",
    icon: "/assets/education-info.svg",
  },
  {
    id: 3,
    title: "layoutRoute.selectDirection",
    description: "layoutRoute.selectDirectionDesc",
    path: "/profile/select-direction",
    icon: "/assets/direction-info.svg",
  },
];
export const SiderMenuData = [
  {
    id: 1,
    title: "layoutRoute.personalInfo",
    path: "/profile/personal-information",
    // icon: "/assets/sidebar/personal-info.svg",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
      >
        <path
          d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.5901 22C20.5901 18.13 16.7402 15 12.0002 15C7.26015 15 3.41016 18.13 3.41016 22"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "layoutRoute.educationInfo",
    path: "/profile/educational-information",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
      >
        <path
          d="M10.0495 2.52979L4.02953 6.45979C2.09953 7.71979 2.09953 10.5398 4.02953 11.7998L10.0495 15.7298C11.1295 16.4398 12.9095 16.4398 13.9895 15.7298L19.9795 11.7998C21.8995 10.5398 21.8995 7.72979 19.9795 6.46979L13.9895 2.53979C12.9095 1.81979 11.1295 1.81979 10.0495 2.52979Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.63109 13.0801L5.62109 17.7701C5.62109 19.0401 6.60109 20.4001 7.80109 20.8001L10.9911 21.8601C11.5411 22.0401 12.4511 22.0401 13.0111 21.8601L16.2011 20.8001C17.4011 20.4001 18.3811 19.0401 18.3811 17.7701V13.1301"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21.4004 15V9"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "layoutRoute.applications",
    path: "/profile/application-status",
    // icon: "/assets/sidebar/my-application.svg",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
      >
        <path
          d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 13H13"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 17H11"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "layoutRoute.examResult",
    path: "/profile/exam-result",
    // icon: "/assets/sidebar/exam-result.svg",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.67 14H4C2.9 14 2 14.9 2 16V22H8.67V14Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.3302 10H10.6602C9.56016 10 8.66016 10.9 8.66016 12V22H15.3302V12C15.3302 10.9 14.4402 10 13.3302 10Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.0001 17H15.3301V22H22.0001V19C22.0001 17.9 21.1001 17 20.0001 17Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.5202 2.06982L13.0502 3.12982C13.1202 3.27982 13.3102 3.41982 13.4702 3.43982L14.4302 3.59982C15.0402 3.69982 15.1902 4.1498 14.7502 4.5798L14.0002 5.3298C13.8702 5.4598 13.8002 5.69981 13.8402 5.86981L14.0502 6.78982C14.2202 7.51982 13.8302 7.79983 13.1902 7.41983L12.2902 6.88983C12.1302 6.78983 11.8602 6.78983 11.7002 6.88983L10.8002 7.41983C10.1602 7.79983 9.77023 7.51982 9.94023 6.78982L10.1502 5.86981C10.1902 5.69981 10.1202 5.4498 9.99023 5.3298L9.25023 4.58981C8.81023 4.14981 8.95023 3.7098 9.57023 3.6098L10.5302 3.44983C10.6902 3.41983 10.8802 3.27983 10.9502 3.13983L11.4802 2.0798C11.7702 1.4998 12.2302 1.49982 12.5202 2.06982Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },

  {
    id: 5,
    title: "Shartnoma",
    path: "/profile/contract",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 22.75C11.22 22.75 10.46 22.35 9.94 21.65L8.93 20.3C8.72 20.02 8.44 19.86 8.14 19.84C7.84 19.83 7.54 19.96 7.3 20.21L6.73 19.7L7.28 20.21C5.84 21.75 4.73 21.63 4.2 21.42C3.66 21.21 2.75 20.52 2.75 18.3V7.04C2.75 2.6 4.03 1.25 8.22 1.25H15.78C19.97 1.25 21.25 2.6 21.25 7.04V18.3C21.25 20.51 20.34 21.2 19.8 21.42C19.27 21.63 18.17 21.75 16.72 20.21C16.48 19.95 16.19 19.81 15.87 19.84C15.57 19.86 15.28 20.02 15.07 20.3L14.06 21.65C13.54 22.35 12.78 22.75 12 22.75ZM8.08 18.33C8.12 18.33 8.17 18.33 8.21 18.33C8.95 18.37 9.65 18.76 10.12 19.39L11.13 20.74C11.62 21.39 12.37 21.39 12.86 20.74L13.87 19.39C14.35 18.76 15.04 18.37 15.79 18.33C16.53 18.29 17.27 18.6 17.81 19.18C18.57 19.99 19.07 20.09 19.24 20.02C19.48 19.92 19.74 19.34 19.74 18.3V7.04C19.74 3.43 19.11 2.75 15.77 2.75H8.22C4.88 2.75 4.25 3.43 4.25 7.04V18.3C4.25 19.35 4.51 19.93 4.75 20.02C4.92 20.09 5.42 19.99 6.18 19.18C6.72 18.63 7.39 18.33 8.08 18.33Z"
          fill="currentColor"
        />
        <path
          d="M16 7.75H8C7.59 7.75 7.25 7.41 7.25 7C7.25 6.59 7.59 6.25 8 6.25H16C16.41 6.25 16.75 6.59 16.75 7C16.75 7.41 16.41 7.75 16 7.75Z"
          fill="currentColor"
        />
        <path
          d="M15 11.75H9C8.59 11.75 8.25 11.41 8.25 11C8.25 10.59 8.59 10.25 9 10.25H15C15.41 10.25 15.75 10.59 15.75 11C15.75 11.41 15.41 11.75 15 11.75Z"
          fill="currentColor"
        />
      </svg>
    ),

    // icon: "/assets/sidebar/receipt.svg",
    // icon: (
    //   <svg
    //     width="24"
    //     height="24"
    //     viewBox="0 0 24 24"
    //     fill="none"
    //     xmlns="http://www.w3.org/2000/svg"
    //   >
    //     <path
    //       d="M8.67 14H4C2.9 14 2 14.9 2 16V22H8.67V14Z"
    //       stroke="currentColor"
    //       strokeWidth="1.5"
    //       strokeMiterlimit="10"
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //     />
    //     <path
    //       d="M13.3302 10H10.6602C9.56016 10 8.66016 10.9 8.66016 12V22H15.3302V12C15.3302 10.9 14.4402 10 13.3302 10Z"
    //       stroke="currentColor"
    //       strokeWidth="1.5"
    //       strokeMiterlimit="10"
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //     />
    //     <path
    //       d="M20.0001 17H15.3301V22H22.0001V19C22.0001 17.9 21.1001 17 20.0001 17Z"
    //       stroke="currentColor"
    //       strokeWidth="1.5"
    //       strokeMiterlimit="10"
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //     />
    //     <path
    //       d="M12.5202 2.06982L13.0502 3.12982C13.1202 3.27982 13.3102 3.41982 13.4702 3.43982L14.4302 3.59982C15.0402 3.69982 15.1902 4.1498 14.7502 4.5798L14.0002 5.3298C13.8702 5.4598 13.8002 5.69981 13.8402 5.86981L14.0502 6.78982C14.2202 7.51982 13.8302 7.79983 13.1902 7.41983L12.2902 6.88983C12.1302 6.78983 11.8602 6.78983 11.7002 6.88983L10.8002 7.41983C10.1602 7.79983 9.77023 7.51982 9.94023 6.78982L10.1502 5.86981C10.1902 5.69981 10.1202 5.4498 9.99023 5.3298L9.25023 4.58981C8.81023 4.14981 8.95023 3.7098 9.57023 3.6098L10.5302 3.44983C10.6902 3.41983 10.8802 3.27983 10.9502 3.13983L11.4802 2.0798C11.7702 1.4998 12.2302 1.49982 12.5202 2.06982Z"
    //       stroke="currentColor"
    //       strokeWidth="1.2"
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //     />
    //   </svg>
    // ),
  },

  {
    id: 6,
    title: "To'lov",
    path: "/profile/payment-history",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.3009 7.91949V13.0695C19.3009 16.1495 17.5409 17.4695 14.9009 17.4695H6.11093C5.66093 17.4695 5.23093 17.4295 4.83093 17.3395C4.58093 17.2995 4.34094 17.2295 4.12094 17.1495C2.62094 16.5895 1.71094 15.2895 1.71094 13.0695V7.91949C1.71094 4.83949 3.47093 3.51953 6.11093 3.51953H14.9009C17.1409 3.51953 18.7509 4.46953 19.1809 6.63953C19.2509 7.03953 19.3009 7.44949 19.3009 7.91949Z"
          stroke="#001018"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M22.302 10.9196V16.0696C22.302 19.1496 20.542 20.4696 17.902 20.4696H9.11203C8.37203 20.4696 7.70204 20.3697 7.12204 20.1497C5.93204 19.7097 5.12203 18.7997 4.83203 17.3397C5.23203 17.4297 5.66203 17.4696 6.11203 17.4696H14.902C17.542 17.4696 19.302 16.1496 19.302 13.0696V7.91962C19.302 7.44962 19.262 7.02965 19.182 6.63965C21.082 7.03965 22.302 8.37962 22.302 10.9196Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10.4994 13.1394C11.9574 13.1394 13.1394 11.9574 13.1394 10.4994C13.1394 9.04136 11.9574 7.85938 10.4994 7.85938C9.04136 7.85938 7.85938 9.04136 7.85938 10.4994C7.85938 11.9574 9.04136 13.1394 10.4994 13.1394Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4.78125 8.2998V12.6998"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16.2227 8.2998V12.6998"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),

    // icon: "/assets/sidebar/receipt.svg",
    // icon: (
    //   <svg
    //     width="24"
    //     height="24"
    //     viewBox="0 0 24 24"
    //     fill="none"
    //     xmlns="http://www.w3.org/2000/svg"
    //   >
    //     <path
    //       d="M8.67 14H4C2.9 14 2 14.9 2 16V22H8.67V14Z"
    //       stroke="currentColor"
    //       strokeWidth="1.5"
    //       strokeMiterlimit="10"
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //     />
    //     <path
    //       d="M13.3302 10H10.6602C9.56016 10 8.66016 10.9 8.66016 12V22H15.3302V12C15.3302 10.9 14.4402 10 13.3302 10Z"
    //       stroke="currentColor"
    //       strokeWidth="1.5"
    //       strokeMiterlimit="10"
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //     />
    //     <path
    //       d="M20.0001 17H15.3301V22H22.0001V19C22.0001 17.9 21.1001 17 20.0001 17Z"
    //       stroke="currentColor"
    //       strokeWidth="1.5"
    //       strokeMiterlimit="10"
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //     />
    //     <path
    //       d="M12.5202 2.06982L13.0502 3.12982C13.1202 3.27982 13.3102 3.41982 13.4702 3.43982L14.4302 3.59982C15.0402 3.69982 15.1902 4.1498 14.7502 4.5798L14.0002 5.3298C13.8702 5.4598 13.8002 5.69981 13.8402 5.86981L14.0502 6.78982C14.2202 7.51982 13.8302 7.79983 13.1902 7.41983L12.2902 6.88983C12.1302 6.78983 11.8602 6.78983 11.7002 6.88983L10.8002 7.41983C10.1602 7.79983 9.77023 7.51982 9.94023 6.78982L10.1502 5.86981C10.1902 5.69981 10.1202 5.4498 9.99023 5.3298L9.25023 4.58981C8.81023 4.14981 8.95023 3.7098 9.57023 3.6098L10.5302 3.44983C10.6902 3.41983 10.8802 3.27983 10.9502 3.13983L11.4802 2.0798C11.7702 1.4998 12.2302 1.49982 12.5202 2.06982Z"
    //       stroke="currentColor"
    //       strokeWidth="1.2"
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //     />
    //   </svg>
    // ),
  },
  // {
  //   id: 5,
  //   title: "layoutRoute.contract",
  //   path: "/profile/select-direction",
  //   icon: (
  //     <svg
  //       width="24"
  //       height="24"
  //       viewBox="0 0 24 24"
  //       fill="none"
  //       xmlns="http://www.w3.org/2000/svg"
  //     >
  //       <path
  //         d="M12 22.75C11.22 22.75 10.46 22.35 9.94 21.65L8.93 20.3C8.72 20.02 8.44 19.86 8.14 19.84C7.84 19.83 7.54 19.96 7.3 20.21L6.73 19.7L7.28 20.21C5.84 21.75 4.73 21.63 4.2 21.42C3.66 21.21 2.75 20.52 2.75 18.3V7.04C2.75 2.6 4.03 1.25 8.22 1.25H15.78C19.97 1.25 21.25 2.6 21.25 7.04V18.3C21.25 20.51 20.34 21.2 19.8 21.42C19.27 21.63 18.17 21.75 16.72 20.21C16.48 19.95 16.19 19.81 15.87 19.84C15.57 19.86 15.28 20.02 15.07 20.3L14.06 21.65C13.54 22.35 12.78 22.75 12 22.75ZM8.08 18.33C8.12 18.33 8.17 18.33 8.21 18.33C8.95 18.37 9.65 18.76 10.12 19.39L11.13 20.74C11.62 21.39 12.37 21.39 12.86 20.74L13.87 19.39C14.35 18.76 15.04 18.37 15.79 18.33C16.53 18.29 17.27 18.6 17.81 19.18C18.57 19.99 19.07 20.09 19.24 20.02C19.48 19.92 19.74 19.34 19.74 18.3V7.04C19.74 3.43 19.11 2.75 15.77 2.75H8.22C4.88 2.75 4.25 3.43 4.25 7.04V18.3C4.25 19.35 4.51 19.93 4.75 20.02C4.92 20.09 5.42 19.99 6.18 19.18C6.72 18.63 7.39 18.33 8.08 18.33Z"
  //         fill="#23272E"
  //       />
  //       <path
  //         d="M16 7.75H8C7.59 7.75 7.25 7.41 7.25 7C7.25 6.59 7.59 6.25 8 6.25H16C16.41 6.25 16.75 6.59 16.75 7C16.75 7.41 16.41 7.75 16 7.75Z"
  //         fill="#23272E"
  //       />
  //       <path
  //         d="M15 11.75H9C8.59 11.75 8.25 11.41 8.25 11C8.25 10.59 8.59 10.25 9 10.25H15C15.41 10.25 15.75 10.59 15.75 11C15.75 11.41 15.41 11.75 15 11.75Z"
  //         fill="#23272E"
  //       />
  //     </svg>
  //   ),
  // },
];
