<template>
  <svg
    width="106"
    height="106"
    viewBox="0 0 106 106"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="icons--pokeball"
    class="icons--pokeball"
  >
    <title id="icons--pokeball">Pokeball Icon</title>
    <circle
      cx="53"
      cy="53"
      r="51"
      fill="white"
      stroke="#333333"
      stroke-width="4"
    />
    <mask
      id="mask0_12_49"
      style="mask-type: alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="106"
      height="53"
    >
      <rect
        width="106"
        height="53"
        fill="#C4C4C4"
      />
    </mask>
    <g mask="url(#mask0_12_49)">
      <circle
        cx="53"
        cy="53"
        r="51"
        fill="#F22539"
        stroke="#333333"
        stroke-width="4"
      />
    </g>
    <path
      d="M0.392578 53H105.607"
      stroke="#333333"
      stroke-width="4"
    />
    <circle
      cx="53"
      cy="52.9998"
      r="20.8074"
      fill="white"
    />
    <circle
      cx="53"
      cy="52.9998"
      r="18.8074"
      stroke="#333333"
      stroke-width="4"
    />
    <path
      d="M91.731 36.7077C86.9398 25.3318 77.283 16.5081 65.3667 12.8428"
      stroke="white"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <circle
      cx="53"
      cy="53.0004"
      r="10.3852"
      stroke="#808080"
      stroke-width="2"
    />
  </svg>
</template>

<style lang="scss">
.icons--pokeball {
  animation: catchAnimation 1s cubic-bezier(0.36, 0.07, 0.19, 0.97) 0.4s
    infinite;
}

@keyframes catchAnimation {
  0% {
    transform: translateX(0) rotate(0);
  }
  20% {
    transform: translateX(-10px) rotate(-20deg);
  }
  30% {
    transform: translateX(10px) rotate(20deg);
  }
  50% {
    transform: translateX(-10px) rotate(-10deg);
  }
  60% {
    transform: translateX(10px) rotate(10deg);
  }
  100% {
    transform: translateX(0) rotate(0);
  }
}
</style>
