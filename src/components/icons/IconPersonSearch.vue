<script setup>
const props = defineProps({
  color: {
    type: String,
    default: "currentColor",
  },
  size: {
    type: Number,
    default: 32,
  },
});
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
  >
    <mask id="lineMdPersonSearch0">
      <g stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
        <g fill="none" :stroke="color">
          <path
            stroke-dasharray="20"
            stroke-dashoffset="20"
            d="M10 5C11.66 5 13 6.34 13 8C13 9.65685 11.6569 11 10 11C8.3431 11 7 9.65685 7 8C7 6.34315 8.3431 5 10 5z"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="0.4s"
              values="20;0"
            />
          </path>
          <path
            stroke-dasharray="36"
            stroke-dashoffset="36"
            d="M10 15C14 15 17 17 17 18V19H3V18C3 17 6 15 10 15z"
            opacity="0"
          >
            <set attributeName="opacity" begin="0.5s" to="1" />
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="0.5s"
              dur="0.4s"
              values="36;0"
            />
          </path>
        </g>
        <circle cx="16" cy="16" r="6" fill-opacity="0">
          <animate
            fill="freeze"
            attributeName="fill-opacity"
            begin="0.9s"
            dur="0.15s"
            values="0;1"
          />
        </circle>
        <path
          fill="none"
          :stroke="color"
          stroke-dasharray="26"
          stroke-dashoffset="26"
          d="M16 19C14.34 19 13 17.66 13 16C13 14.34 14.34 13 16 13C 17.66 13 19 14.34 19 16C19 17.66 17.66 19 16 19v4"
          transform="rotate(-45 16 16)"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.9s"
            dur="0.4s"
            values="26;0"
          />
        </path>
      </g>
    </mask>
    <rect
      width="24"
      height="24"
      :fill="color"
      mask="url(#lineMdPersonSearch0)"
    />
  </svg>
</template>
