<script setup>

const props = defineProps({
    color: {
        type: String,
        default: "currentColor"
    },
    size: {
        type: Number,
        default: 32
    }
})

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
      stroke-width="2"
    >
      <path
        stroke-dasharray="46"
        stroke-dashoffset="46"
        d="M8 5V4C8 3.44772 8.44772 3 9 3H18C18.5523 3 19 3.44772 19 4V20C19 20.5523 18.5523 21 18 21H9C8.44771 21 8 20.5523 8 20V19"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.5s"
          values="46;0"
        />
      </path>
      <path
        stroke-dasharray="12"
        stroke-dashoffset="12"
        d="M4 12h11"
        opacity="0"
      >
        <set attributeName="opacity" begin="0.6s" to="1" />
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="0.6s"
          dur="0.2s"
          values="12;0"
        />
      </path>
      <path
        stroke-dasharray="6"
        stroke-dashoffset="6"
        d="M15 12l-3.5 -3.5M15 12l-3.5 3.5"
        opacity="0"
      >
        <set attributeName="opacity" begin="0.8s" to="1" />
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="0.8s"
          dur="0.2s"
          values="6;0"
        />
      </path>
    </g>
  </svg>
</template>
