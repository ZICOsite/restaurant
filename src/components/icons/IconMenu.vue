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
    <g
      fill="none"
      :stroke="color"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <g stroke-width="2">
        <path
          stroke-dasharray="66"
          stroke-dashoffset="66"
          d="M12 3H19V21H5V3H12Z"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.6s"
            values="66;0"
          />
        </path>
        <path stroke-dasharray="5" stroke-dashoffset="5" d="M9 10H12">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="1s"
            dur="0.2s"
            values="5;0"
          />
        </path>
        <path stroke-dasharray="6" stroke-dashoffset="6" d="M9 13H14">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="1.2s"
            dur="0.2s"
            values="6;0"
          />
        </path>
        <path stroke-dasharray="7" stroke-dashoffset="7" d="M9 16H15">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="1.4s"
            dur="0.2s"
            values="7;0"
          />
        </path>
      </g>
      <path
        stroke-dasharray="12"
        stroke-dashoffset="12"
        d="M14.5 3.5V6.5H9.5V3.5"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="0.7s"
          dur="0.2s"
          values="12;0"
        />
      </path>
    </g>
  </svg>
</template>
