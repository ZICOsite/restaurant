<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <g fill="none" stroke="#ffb836" stroke-width="2">
      <path
        stroke-dasharray="28"
        stroke-dashoffset="28"
        d="M12 10H18C19.1046 10 20 10.8954 20 12V21H12"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.4s"
          values="28;56"
        />
      </path>
      <path
        stroke-dasharray="28"
        stroke-dashoffset="28"
        d="M12 21H4V12C4 10.8954 4.89543 10 6 10H12"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.4s"
          values="28;0"
        />
      </path>
      <path
        stroke-dasharray="4"
        stroke-dashoffset="4"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 10V8"
        opacity="0"
      >
        <set attributeName="opacity" begin="0.4s" to="1" />
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="0.4s"
          dur="0.2s"
          values="4;0"
        />
      </path>
      <path
        stroke-dasharray="20"
        stroke-dashoffset="20"
        d="M4 16H5C7 16 8.5 14 8.5 14C8.5 14 10 16 12 16C14 16 15.5 14 15.5 14C15.5 14 17 16 19 16H20"
        opacity="0"
      >
        <set attributeName="opacity" begin="0.4s" to="1" />
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="0.5s"
          dur="0.4s"
          values="20;0"
        />
      </path>
    </g>
    <g fill="#ffb836">
      <path
        d="M14 4C14 5.10457 13.1046 6 12 6C10.8954 6 10 5.10457 10 4C10 2.89543 12 0 12 0C12 0 14 2.89543 14 4Z"
        opacity="0"
      >
        <set attributeName="opacity" begin="0.6s" to="1" />
        <animate
          fill="freeze"
          attributeName="d"
          begin="0.6s"
          dur="0.2s"
          values="M13 5C13 5.5 12.5 6 12 6C11.5 6 11 5.5 11 5C11 4.5 12 4 12 4C12 4 13 4.5 13 5Z;M14 4C14 5.10457 13.1046 6 12 6C10.8954 6 10 5.10457 10 4C10 2.89543 12 0 12 0C12 0 14 2.89543 14 4Z"
        />
      </path>
      <path
        d="M15.5 14C15.5 14 14 16 12 16C10 16 8.5 14 8.5 14C8.5 14 7 16 5 16H4V21H20V16H19C17 16 15.5 14 15.5 14Z"
        opacity="0"
      >
        <animate
          fill="freeze"
          attributeName="opacity"
          begin="0.9s"
          dur="0.15s"
          values="0;0.3"
        />
      </path>
    </g>
  </svg>
</template>
